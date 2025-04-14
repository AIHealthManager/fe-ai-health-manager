import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { LogIn } from "lucide-react"
import { Link, useNavigate } from "react-router"

export default function LoginPage() {
  const navigate = useNavigate()

  const handleGoogleLogin = () => {
    // In a real app, this would redirect to your FastAPI backend auth endpoint
    console.log("Redirecting to Google login...")
    // Simulating successful login for demo purposes
    setTimeout(() => {
      navigate("/dashboard")
    }, 1000)
  }

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center p-4 bg-slate-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>Sign in to your AIHealthManager account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Button
              onClick={handleGoogleLogin}
              variant="outline"
              className="w-full flex items-center justify-center gap-2 py-6"
            >
              <LogIn className="h-5 w-5" />
              <span>Continue with Google</span>
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-500">Or</span>
            </div>
          </div>

          <div className="text-center text-sm text-slate-500">
            <p>
              Don&apos;t have an account?{" "}
              <Link to="#" className="font-medium text-teal-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <p className="text-xs text-center text-slate-500 mt-4">
            By continuing, you agree to our{" "}
            <Link to="#" className="text-teal-600 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="#" className="text-teal-600 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
