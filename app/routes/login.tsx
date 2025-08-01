import LoginPage from "~/components/login-page";
import type { Route } from "./+types/login";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "AIHealthManager Login" },
        {
            name: "description",
            content:
                "AIHealthManager helps you track your health history, manage doctor visits, medications, lab results, and get AI-powered insights – all in one secure platform.",
        },
    ];
}

export default function LoginRoute() {
    return <LoginPage />;
}
