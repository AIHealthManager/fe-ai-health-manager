import { Link } from "react-router"

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">AIHealthManager</h3>
            <p className="text-slate-400 mb-4">Your personal health assistant powered by artificial intelligence.</p>
          </div>

          <div>
            <h4 className="text-white text-md font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-slate-400 hover:text-teal-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <a href="/#how-it-works" className="text-slate-400 hover:text-teal-400 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-teal-400 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-teal-400 transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-md font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-400 hover:text-teal-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-teal-400 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-teal-400 transition-colors">
                  HIPAA Compliance
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-teal-400 transition-colors">
                  Data Security
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-md font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-slate-400">Email: support@aihealthmanager.com</li>
              <li className="text-slate-400">Phone: (555) 123-4567</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-500">
          <p>&copy; {new Date().getFullYear()} AIHealthManager. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
