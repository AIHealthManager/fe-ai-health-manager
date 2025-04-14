import GoogleCallback from "~/components/google-auth";
import type { Route } from "./+types/google-auth";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "AIHealthManager Google Auth" },
        {
            name: "description",
            content:
                "AIHealthManager helps you track your health history, manage doctor visits, medications, lab results, and get AI-powered insights – all in one secure platform.",
        },
    ];
}

export default function LoginRoute() {
    return <GoogleCallback />;
}
