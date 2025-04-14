import { useState } from "react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";

import { Button } from "~/components/ui/button";
import { useAuth } from "~/context/auth-provider";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const isLoggedIn = !!user;

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogOutClick = () => {
        logout()
    }

    return (
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
            <div className="container mx-auto max-w-6xl px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center">
                        <span className="text-xl font-bold bg-gradient-to-r from-teal-500 to-blue-600 text-transparent bg-clip-text">
                            AIHealthManager
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link to="/chat" className="text-slate-700 hover:text-teal-600 transition-colors">
                            AI Chat
                        </Link>
                        <Link to="/visits-list" className="text-slate-700 hover:text-teal-600 transition-colors">
                            Visits
                        </Link>
                        <a href="#" className="text-slate-700 hover:text-teal-600 transition-colors">
                            Features
                        </a>
                        <a href="#" className="text-slate-700 hover:text-teal-600 transition-colors">
                            About
                        </a>
                    </nav>

                    <div className="hidden md:flex items-center space-x-4">
                        {isLoggedIn ? (
                            <>
                                <Button asChild variant="outline">
                                    <Link to="/" onClick={handleLogOutClick}>Log Out</Link>
                                </Button>
                                <Button asChild className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700">
                                    <Link to="/profile">Profile</Link>
                                </Button>
                            </>
                            
                        ) : (
                            <>
                                <Button asChild variant="outline">
                                    <Link to="/login">Log In</Link>
                                </Button>
                                <Button asChild className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700">
                                    <Link to="/login">Sign Up</Link>
                                </Button>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden text-slate-700" onClick={toggleMenu} aria-label="Toggle menu">
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 pb-4">
                        <nav className="flex flex-col space-y-4">
                            <Link to="/chat" className="text-slate-700 hover:text-teal-600 transition-colors" onClick={() => setIsMenuOpen(false)}>
                                Chat
                            </Link>
                            <a
                                href="/#how-it-works"
                                className="text-slate-700 hover:text-teal-600 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                How It Works
                            </a>
                            <a href="#" className="text-slate-700 hover:text-teal-600 transition-colors" onClick={() => setIsMenuOpen(false)}>
                                Features
                            </a>
                            <a href="#" className="text-slate-700 hover:text-teal-600 transition-colors" onClick={() => setIsMenuOpen(false)}>
                                About
                            </a>
                            <div className="flex flex-col space-y-2 pt-2">
                                <Button asChild variant="outline" className="w-full">
                                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                                        Log In
                                    </Link>
                                </Button>
                                <Button asChild className="w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700">
                                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                                        Sign Up
                                    </Link>
                                </Button>
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
