import ProfilePage from "~/components/profile";
import type { Route } from "../+types/profile";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Profile" },
        {
            name: "description",
            content:
                "AIHealthManager helps you track your health history, manage doctor visits, medications, lab results, and get AI-powered insights – all in one secure platform.",
        },
    ]
}

export default function ProfileRoute() {
    return <ProfilePage />
}