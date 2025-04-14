import type { Visit, VisitCreate } from "~/lib/types";
import { VISIT_URL } from "~/lib/urls";

export const postVisit = async (token: string, visitData: VisitCreate): Promise<Visit> => {
  const resp = await fetch(VISIT_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(visitData),
  });
  const data: Visit = await resp.json();
  return data;
};

export const getUserVisits = async (token: string): Promise<Visit[]> => {
  const URL = `${VISIT_URL}user-visits`;
  const resp = await fetch(URL, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data: Visit[] = await resp.json();
  return data;
};
