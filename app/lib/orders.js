import "server-only";
import { revalidatePath } from "next/cache";
import { parseOrder } from "./schemas";
import { findDish, insertOrder, findOrder, toOwnerOrder, updateOrderStatusInDb } from "./store";
import { getSession, createSession } from "./session";

export async function submitOrder(input) {
  const parsed = parseOrder(input);
  if (!parsed.ok) {
    return {
      ok: false,
      status: 422,
      code: "VALIDATION_ERROR",
      message: "Some fields are invalid.",
      fieldErrors: parsed.fieldErrors,
    };
  }

  const unknown = parsed.data.items.filter((i) => !findDish(i.dishId));
  if (unknown.length > 0) {
    return {
      ok: false,
      status: 422,
      code: "VALIDATION_ERROR",
      message: "Some fields are invalid.",
      fieldErrors: { items: [`Unknown dish id: ${unknown.map((i) => i.dishId).join(", ")}`] },
    };
  }

  const session = (await getSession()) ?? (await createSession());
  const order = insertOrder({ ...parsed.data, userId: session.userId });

  revalidatePath("/orders");
  revalidatePath("/kitchen");
  return { ok: true, status: 201, order: toOwnerOrder(order) };
}

export async function cancelOrderForSession(orderId) {
  const session = await getSession();
  if (!session) {
    return { ok: false, status: 401, code: "UNAUTHENTICATED", message: "Please sign in first." };
  }

  const order = typeof orderId === "string" ? findOrder(orderId) : undefined;
  if (!order) {
    return { ok: false, status: 404, code: "NOT_FOUND", message: "Order not found." };
  }

  if (order.userId !== session.userId) {
    return { ok: false, status: 403, code: "FORBIDDEN", message: "You can only cancel your own orders." };
  }

  if (order.status !== "pending") {
    return { ok: false, status: 409, code: "CONFLICT", message: `This order is already ${order.status}.` };
  }

  order.status = "cancelled";
  revalidatePath("/orders");
  revalidatePath("/kitchen");
  return { ok: true, status: 200, order: toOwnerOrder(order) };
}

export async function updateOrderStatusForKitchen(orderId, nextStatus) {
  const session = await getSession();
  if (!session || session.role !== "kitchen") {
    return { ok: false, status: 403, code: "FORBIDDEN", message: "Forbidden: Kitchen role required." };
  }

  const order = typeof orderId === "string" ? findOrder(orderId) : undefined;
  if (!order) {
    return { ok: false, status: 404, code: "NOT_FOUND", message: "Order not found." };
  }

  updateOrderStatusInDb(orderId, nextStatus);
  revalidatePath("/kitchen");
  revalidatePath("/orders");
  return { ok: true, status: 200, order };
}