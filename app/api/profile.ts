import type { Profile } from "~/lib/types";
import { PROFILES_URL } from "~/lib/urls";

export const getUserProfile = async (token: string): Promise<Profile> => {
  const resp = await fetch(PROFILES_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (resp.status === 404) {
    throw Error("No profile found!")
  }
  const data: Profile = await resp.json();
  return data;
};

