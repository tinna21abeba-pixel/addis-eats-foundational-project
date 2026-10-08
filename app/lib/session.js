import "server-only";
import { cookies } from "next/headers";
import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";

const COOKIE = "ae_session";

function secret() {
  const s = process.env.SESSION_SECRET;
  if (!s || s.length < 16) throw new Error("SESSION_SECRET is missing. Add it to .env.local");
  return s;
}

const sign = (value) => createHmac("sha256", secret()).update(value).digest("hex");

export async function getSession() {
  const raw = (await cookies()).get(COOKIE)?.value;
  if (!raw) return null;

  const dotIndex = raw.lastIndexOf(".");
  if (dotIndex === -1) return null;

  const payload = raw.slice(0, dotIndex);
  const signature = raw.slice(dotIndex + 1);
  if (!payload || !signature) return null;

  const expected = Buffer.from(sign(payload));
  const given = Buffer.from(signature);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;

  try {
    const jsonStr = Buffer.from(payload, "base64url").toString("utf8");
    const data = JSON.parse(jsonStr);
    return {
      userId: data.userId,
      id: data.userId,
      role: data.role || "customer",
      name: data.name || "Customer",
      email: data.email || "",
    };
  } catch {
    return {
      userId: payload,
      id: payload,
      role: "customer",
      name: "Customer",
      email: "",
    };
  }
}

export async function createSession(data = {}) {
  const userId = data.userId || randomUUID();
  const sessionData = {
    userId,
    role: data.role || "customer",
    name: data.name || (data.role === "kitchen" ? "Kitchen Staff" : "Customer"),
    email: data.email || (data.role === "kitchen" ? "kitchen@addiseats.com" : "customer@addiseats.com"),
  };

  const payload = Buffer.from(JSON.stringify(sessionData)).toString("base64url");
  const value = `${payload}.${sign(payload)}`;

  (await cookies()).set(COOKIE, value, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return { ...sessionData, id: userId };
}

export async function destroySession() {
  (await cookies()).delete(COOKIE);
}