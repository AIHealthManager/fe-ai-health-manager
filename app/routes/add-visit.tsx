import DoctorVisitPage from "~/components/doctor-visit";
import type { Route } from "./+types/add-visit";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Add visitation" },
        {
            name: "description",
            content:
                "AIHealthManager helps you track your health history, manage doctor visits, medications, lab results, and get AI-powered insights – all in one secure platform.",
        },
    ];
}

export default function AddVisitRoute() {
    return <DoctorVisitPage />
}