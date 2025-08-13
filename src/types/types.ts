export interface Debt {
  Id: string | number;
  Name: string;
  NIP: string;
  Value: number;
  Date: string;
}

export type SortKey = "Name" | "NIP" | "Value" | "Date";
export type SortOrder = "asc" | "desc";
