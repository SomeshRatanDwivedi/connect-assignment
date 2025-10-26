import { closetApi } from "../instance"

export const getAllProducts = async () => {
  const res = await closetApi.get("data");
  return res.data;
}