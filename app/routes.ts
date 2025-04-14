import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/login", "routes/login.tsx"),
    route("/add-visit", "routes/add-visit.tsx"),
    route("/chat", "routes/chat.tsx"),
] satisfies RouteConfig;
