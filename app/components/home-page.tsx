import { Link } from "react-router"
import { Button } from "~/components/ui/button"
import { ArrowRight, Calendar, ClipboardList, Brain, Lock, Clock, BarChart3 } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-500 to-blue-600 py-20 px-4 text-white">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">AIHealthManager</h1>
            <p className="text-xl md:text-2xl mb-6">Your Health History. Smarter.</p>
            <p className="text-lg mb-8 opacity-90">
              Track your medical history, doctor visits, and get AI-powered insights tailored to your health journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                <Link to="/login">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <a href="#how-it-works">Learn More</a>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/project-image.png?height=400&width=400"
              alt="AI Health Management Illustration"
              className="max-w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-slate-800">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center">
              <div className="bg-teal-100 p-5 rounded-full mb-6">
                <ClipboardList className="h-10 w-10 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">Track Your Health History</h3>
              <p className="text-slate-600">
                Easily record and access your complete medical history in one secure place.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 p-5 rounded-full mb-6">
                <Calendar className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">Log Doctor Visits & Results</h3>
              <p className="text-slate-600">
                Upload doctor visits, medications, and lab results to keep everything organized.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-indigo-100 p-5 rounded-full mb-6">
                <Brain className="h-10 w-10 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">Get AI-Powered Insights</h3>
              <p className="text-slate-600">
                Receive personalized health insights and recommendations based on your data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-slate-800">Why Choose Us</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="bg-teal-50 p-3 rounded-lg inline-block mb-4">
                <Lock className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">Private & Secure</h3>
              <p className="text-slate-600">
                Your health data is encrypted and protected with the highest security standards.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="bg-blue-50 p-3 rounded-lg inline-block mb-4">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">Save Time</h3>
              <p className="text-slate-600">
                Quickly access your complete health history without searching through paperwork.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="bg-indigo-50 p-3 rounded-lg inline-block mb-4">
                <BarChart3 className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">Data-Driven Insights</h3>
              <p className="text-slate-600">
                Make better health decisions with AI-powered analysis of your medical data.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700"
            >
              <Link to="/login" className="flex items-center gap-2">
                Join Now <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
