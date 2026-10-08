"use server";

import { redirect } from "next/navigation";
import { submitOrder, cancelOrderForSession, updateOrderStatusForKitchen } from "./lib/orders";
import { createSession, destroySession } from "./lib/session";

function sanitizeNext(next) {
  if (!next || typeof next !== "string") return "/";
  if (!next.startsWith("/") || next.startsWith("//") || next.includes("://")) {
    return "/";
  }
  return next;
}

export async function placeOrder(_prevState, formData) {
  const values = {
    name: String(formData.get("name") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    address: String(formData.get("address") ?? ""),
    note: String(formData.get("note") ?? ""),
  };

  let items = [];
  try {
    items = JSON.parse(String(formData.get("items") ?? "[]"));
  } catch {
    items = [];
  }

  const result = await submitOrder({ ...values, note: values.note || undefined, items });

  if (!result.ok) {
    return { ok: false, message: result.message, fieldErrors: result.fieldErrors, values };
  }
  return { ok: true, orderId: result.order.id, values: null };
}

export async function cancelOrder(arg1, arg2) {
  let orderId;
  if (typeof arg1 === "string") {
    orderId = arg1;
  } else if (arg2 && typeof arg2.get === "function") {
    orderId = arg2.get("orderId");
  } else if (arg1 && typeof arg1.get === "function") {
    orderId = arg1.get("orderId");
  }

  const result = await cancelOrderForSession(orderId);
  return result.ok
    ? { ok: true, status: 200, message: "Order cancelled." }
    : { ok: false, status: result.status, message: result.message };
}

export async function signInAction(_prevState, formData) {
  const role = String(formData.get("role") || "customer");
  const name = String(formData.get("name") || (role === "kitchen" ? "Kitchen Staff" : "Customer")).trim();
  const email = String(formData.get("email") || (role === "kitchen" ? "kitchen@addiseats.com" : "customer@addiseats.com")).trim();
  const rawNext = String(formData.get("next") || "/");
  const next = sanitizeNext(rawNext);

  const userId = role === "kitchen" ? "usr_kitchen" : `usr_${Date.now()}`;
  await createSession({ userId, role, name, email });

  redirect(next);
}

export async function signOutAction() {
  await destroySession();
  redirect("/");
}

export async function updateOrderStatusAction(formData) {
  const orderId = String(formData.get("orderId") || "");
  const nextStatus = String(formData.get("nextStatus") || "");
  const result = await updateOrderStatusForKitchen(orderId, nextStatus);
  return result.ok
    ? { ok: true, message: "Status updated." }
    : { ok: false, message: result.message };
}
