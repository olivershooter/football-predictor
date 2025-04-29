import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalizeString = (val: string) => {
  return `${val.slice(0, 1).toUpperCase()}${val.slice(1)}`;
};

interface ApiErrorResponse {
  errors?: {
    requests?: string;
  };
}

export const handleApiErrors = (
  data: ApiErrorResponse
): string | string[] | null => {
  if (data.errors?.requests?.includes("exceeded")) {
    return "Too many API calls";
  }
  return data.errors?.requests || null;
};
