import VisitsPage from "~/components/visits-list";
import type { Route } from "./+types/visits-list";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Visits List" },
        {
            name: "description",
            content:
                "AIHealthManager helps you track your health history, manage doctor visits, medications, lab results, and get AI-powered insights – all in one secure platform.",
        },
    ]
}

export default function VisitsListRoute() {
    return <VisitsPage />
}