import type { Visit, VisitCreate } from "~/lib/types";
import { VISIT_URL } from "~/lib/urls";

export const postVisit = async (token: string, visitData: VisitCreate): Promise<Visit> => {
    const resp = await fetch(VISIT_URL, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(visitData)
    });
    const data: Visit = await resp.json();
    return data;
};
