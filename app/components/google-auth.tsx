import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { CircleUserRound } from "lucide-react";

import { fetchUser } from "~/api/user";
import { useAuth } from "~/context/auth-provider";

function GoogleCallback() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) return;
    (async () => {
      const user = await fetchUser(token);
      login(user, token);
    })();
  }, [location, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col items-center p-8 rounded-lg shadow-lg bg-white dark:bg-gray-800">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <CircleUserRound className="w-12 h-12 mb-4 text-blue-500" />
        <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Processing Google Login...
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Please wait while we verify your credentials.
        </p>
      </div>
    </div>
  );
}

export default GoogleCallback;