import HomePage from "~/components/home-page";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "AIHealthManager – Smarter Personal Health Tracking with AI" },
    { name: "description", content: "AIHealthManager helps you track your health history, manage doctor visits, medications, lab results, and get AI-powered insights – all in one secure platform." },
    { name: "keywords", content: "AI health app, personal health tracker, health history, health record manager, doctor visits log, medication tracking, lab results storage, health insights, AI for healthcare" },
    { name: "author", content: "AIHealthManager Team" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "robots", content: "index, follow" },
    { charSet: "utf-8" }
  ];
}


export default function Home() {
  return <HomePage />;
}
