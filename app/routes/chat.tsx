import ChatPage from "~/components/chat-page";
import type { Route } from "./+types/chat";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "AIHealthManager Chat" },
        {
            name: "description",
            content:
                "AIHealthManager helps you track your health history, manage doctor visits, medications, lab results, and get AI-powered insights – all in one secure platform.",
        },
    ];
}

export default function LoginRoute() {
    return <ChatPage />;
}