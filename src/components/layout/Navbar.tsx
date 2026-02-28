"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // TODO: Replace with auth state from context/store
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const username = typeof window !== "undefined" ? localStorage.getItem("username") : null;

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-gray-900">
              <svg className="w-8 h-8" viewBox="0 0 32 32" fill="currentColor">
                <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" fill="none" />
                <text x="16" y="21" textAnchor="middle" fontSize="14" fontWeight="bold">P</text>
              </svg>
              PhiloArt
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/discover" className="text-gray-600 hover:text-gray-900">
              Discover
            </Link>
            <Link href="/artists" className="text-gray-600 hover:text-gray-900">
              Artists
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900">
              About
            </Link>
            <Link href="/license" className="text-gray-600 hover:text-gray-900">
              License
            </Link>

            {!token ? (
              <>
                <Link href="/signin" className="text-gray-600 hover:text-gray-900">
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/create"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create
                </Link>
                <div className="relative group">
                  <button className="text-gray-600 hover:text-gray-900">
                    My Account
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                    <Link
                      href={`/${username}`}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <Link
                      href="/user/edit"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </Link>
                    <hr className="my-1" />
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link href="/discover" className="block py-2 text-gray-600">Discover</Link>
            <Link href="/artists" className="block py-2 text-gray-600">Artists</Link>
            <Link href="/about" className="block py-2 text-gray-600">About</Link>
            <Link href="/license" className="block py-2 text-gray-600">License</Link>
            {!token ? (
              <>
                <Link href="/signin" className="block py-2 text-gray-600">Login</Link>
                <Link href="/signup" className="block py-2 text-blue-600">Sign up</Link>
              </>
            ) : (
              <>
                <Link href="/create" className="block py-2 text-blue-600">Create</Link>
                <Link href={`/${username}`} className="block py-2 text-gray-600">Profile</Link>
                <Link href="/user/edit" className="block py-2 text-gray-600">Settings</Link>
                <button onClick={handleLogout} className="block py-2 text-gray-600">Logout</button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
