import { axiosInstance } from "./axiosConfig";
import type { Debt } from "../types/types";

export const getTopDebts = async (): Promise<Debt[]> => {
  const res = await axiosInstance.get<Debt[]>("/GetTopDebts");
  return res.data;
};

export const getTotalDebts = async (): Promise<number> => {
  const res = await axiosInstance.get<number>("/GetDebtsCount");
  return res.data;
};

export const getFilteredDebts = async (phrase: string): Promise<Debt[]> => {
  const res = await axiosInstance.post<Debt[]>("/GetFilteredDebts", {
    phrase: phrase.trim(),
  });
  return res.data;
};
