import { connectApi } from "../instance"

export const getAllProducts = async () => {
  const res = await connectApi.get("data");
  return res;
}