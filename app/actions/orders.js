"use server";

import { placeOrder as doPlaceOrder, cancelOrder as doCancelOrder } from "../actions";

export async function placeOrder(prevState, formData) {
  return doPlaceOrder(prevState, formData);
}

export async function cancelOrder(arg1, arg2) {
  return doCancelOrder(arg1, arg2);
}