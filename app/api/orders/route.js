import { submitOrder } from "../../lib/orders";
import { errorResponse } from "../../lib/api";
import { getSession } from "../../lib/session";
import { listOrdersByUser, toOwnerOrder } from "../../lib/store";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return errorResponse(401, "UNAUTHENTICATED", "Please sign in to view your orders.");
  }
  const orders = listOrdersByUser(session.userId).map(toOwnerOrder);
  return Response.json({ orders });
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return errorResponse(400, "INVALID_JSON", "Request body must be valid JSON.");
  }

  const result = await submitOrder(body);
  if (!result.ok) {
    return errorResponse(result.status, result.code, result.message, result.fieldErrors);
  }
  return Response.json({ order: result.order }, { status: result.status });
}