"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "../ThemeSwitcher/themetoggle";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const publicLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Resources", href: "/resources" },
    { name: "Products", href: "/products" },
    { name: "Contact", href: "/contacts" },
  ];

  // Top half of menu (shown in navbar on mobile)
  const privateLinksTop = [
    { name: "Profile", href: "/profile" },
    { name: "Billing", href: "/billing" },
  ];

  // Bottom half of menu (shown in sidebar on mobile)
  const privateLinksBottom = [
    { name: "Team Meet", href: "/team" },
    { name: "Stats", href: "/stats" },
  ];

  const privateLinks = [...privateLinksTop, ...privateLinksBottom];

  const linksToShow = user ? privateLinks : publicLinks;

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: logo + site name */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/webster_dark.png"
                width={32}
                height={32}
                alt="Websterwork logo"
                className="block dark:hidden rounded"
              />
              <Image
                src="/webster_white.png"
                width={32}
                height={32}
                alt="Websterwork logo"
                className="hidden dark:block rounded"
              />
              <span className="hidden sm:inline-block text-lg font-semibold text-gray-800 dark:text-gray-100">
                Websterwork
              </span>
            </Link>
          </div>

          {/* Center: search (GitHub-like) */}
          <div className="flex-1 hidden md:flex justify-center px-4">
            <div className="w-full max-w-xl">
              <label htmlFor="nav-search" className="sr-only">
                Search
              </label>
              <div className="relative text-gray-400 focus-within:text-gray-600">
                <svg
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1112.5 3a7.5 7.5 0 014.15 13.65z"
                  />
                </svg>
                <input
                  id="nav-search"
                  type="search"
                  placeholder="Search"
                  className="block w-full bg-gray-100 dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-100 rounded-lg pl-10 pr-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
            </div>
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-2">
            <nav className="hidden md:flex md:items-center md:space-x-3">
              {linksToShow.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-2">
              {!user ? (
                <>
                  <Link
                    href="/login"
                    className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="inline-flex items-center px-3 py-2 bg-purple-600 text-white rounded-md text-sm font-medium hover:bg-purple-700"
                  >
                    Sign up
                  </Link>
                  <ThemeToggle />
                </>
              ) : (
                <>
                  <Link
                    href="/chat"
                    className="inline-flex items-center px-3 py-2 bg-gradient-to-br from-purple-600 to-purple-500 text-white rounded-md text-sm font-medium hover:from-purple-700 hover:to-purple-600"
                  >
                    Chat
                  </Link>
                  <ThemeToggle />

                  <div className="relative">
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      aria-expanded={userMenuOpen}
                      aria-haspopup="true"
                      className="ml-2 h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-200 hover:ring-2 hover:ring-purple-400 focus:outline-none"
                    >
                      {user && user.avatar ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={user.avatar}
                          alt="User avatar"
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      ) : (
                        <span>{(user && user.name && user.name[0]) || "U"}</span>
                      )}
                    </button>

                    {userMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-md shadow-lg py-1 z-50">
                        <Link
                          href="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          Profile
                        </Link>
                        <Link
                          href="/billing"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          Billing
                        </Link>
                        <Link
                          href="/team"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          Team Meet
                        </Link>
                        <Link
                          href="/stats"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          Stats
                        </Link>
                        <button
                          onClick={logout}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          Sign out
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Mobile: menu button */}
            <div className="md:hidden flex items-center">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
                className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-400"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        aria-hidden={!isOpen}
        className={`md:hidden ${isOpen ? "block" : "hidden"}`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
          <div className="px-2">
            <label htmlFor="mobile-search" className="sr-only">
              Search
            </label>
            <div className="relative text-gray-400 focus-within:text-gray-600">
              <svg
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1112.5 3a7.5 7.5 0 014.15 13.65z"
                />
              </svg>
              <input
                id="mobile-search"
                type="search"
                placeholder="Search"
                className="block w-full bg-gray-100 dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-100 rounded-lg pl-10 pr-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
          </div>

          {linksToShow.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-purple-600"
            >
              {link.name}
            </Link>
          ))}

          {!user ? (
            <div className="px-3">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200"
              >
                Login
              </Link>
              <Link
                href="/signup"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center mt-1 px-3 py-2 rounded-md text-base font-medium text-white bg-purple-600 hover:bg-purple-700"
              >
                Sign up
              </Link>
            </div>
          ) : (
            <div className="px-3">
              <Link
                href="/chat"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center px-3 py-2 rounded-md text-base font-medium text-white bg-purple-600 hover:bg-purple-700 mb-2"
              >
                Chat
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Sidebar - Second Half of Menu */}
        {user && (
          <div className="md:hidden px-2 pt-2 pb-3 space-y-1 bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
            <h3 className="px-3 py-2 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              Menu
            </h3>
            {privateLinksBottom.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-purple-600"
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;