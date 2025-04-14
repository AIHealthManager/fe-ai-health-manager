import type { User } from "~/lib/types";
import { USER_URL } from "~/lib/urls";

export const fetchUser = async (token: string): Promise<User> => {
  const resp = await fetch(USER_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data: User = await resp.json();
  return data;
};