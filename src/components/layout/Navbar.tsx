"use client";

import { FormEvent, MouseEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const router = useRouter();

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const username = typeof window !== "undefined" ? localStorage.getItem("username") : null;

  const [keyword, setKeyword] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const profileHref = useMemo(() => (username ? `/${username}` : "/signin"), [username]);

  const handleSearch = (event: FormEvent) => {
    event.preventDefault();
    const q = keyword.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/discover");
    setMenuOpen(false);
  };

  const handleLogout = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    localStorage.clear();
    router.push("/");
    router.refresh();
  };

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-gray-100">
      <div className="max-w-[1400px] mx-auto px-4 h-14 flex items-center gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <img src="/img/logo/logo2.svg" width="28" height="28" alt="PhiloArt" />
          <span className="font-semibold text-gray-900 text-[15px] hidden sm:inline">PhiloArt</span>
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md">
          <div className="relative">
            <i className="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search photos..."
              className="w-full pl-9 pr-3 py-2 text-sm bg-gray-100 rounded-full border-none outline-none focus:bg-white focus:ring-1 focus:ring-gray-300 transition-colors placeholder-gray-400"
            />
          </div>
        </form>

        {/* Nav Links — desktop */}
        <div className="hidden md:flex items-center gap-1">
          <NavLink href="/discover">Discover</NavLink>
          <NavLink href="/artists">Artists</NavLink>
          <NavLink href="/blog">Blog</NavLink>
          <NavLink href="/license">License</NavLink>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 ml-auto md:ml-0">
          {!token && (
            <>
              <Link href="/signin" className="text-sm text-gray-600 hover:text-gray-900 transition-colors hidden sm:block">
                Log in
              </Link>
              <Link
                href="/signup"
                className="text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 px-4 py-1.5 rounded-md transition-colors"
              >
                Sign up
              </Link>
            </>
          )}

          {token && (
            <div className="relative">
              <button
                onClick={() => setAccountOpen(!accountOpen)}
                className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <i className="bi bi-person-circle text-lg" />
              </button>
              {accountOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setAccountOpen(false)} />
                  <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <Link href={profileHref} onClick={() => setAccountOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Profile
                    </Link>
                    <Link href="/user/edit" onClick={() => setAccountOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Settings
                    </Link>
                    <Link href="/create" onClick={() => setAccountOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Create
                    </Link>
                    <div className="border-t border-gray-100 my-1" />
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Log out
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-1.5 text-gray-600 hover:text-gray-900"
          >
            <i className={`bi ${menuOpen ? "bi-x-lg" : "bi-list"} text-xl`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1">
          <MobileNavLink href="/discover" onClick={() => setMenuOpen(false)}>Discover</MobileNavLink>
          <MobileNavLink href="/artists" onClick={() => setMenuOpen(false)}>Artists</MobileNavLink>
          <MobileNavLink href="/blog" onClick={() => setMenuOpen(false)}>Blog</MobileNavLink>
          <MobileNavLink href="/license" onClick={() => setMenuOpen(false)}>License</MobileNavLink>
          {!token && (
            <>
              <MobileNavLink href="/signin" onClick={() => setMenuOpen(false)}>Log in</MobileNavLink>
              <MobileNavLink href="/signup" onClick={() => setMenuOpen(false)}>Sign up</MobileNavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors rounded-md">
      {children}
    </Link>
  );
}

function MobileNavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) {
  return (
    <Link href={href} onClick={onClick} className="block py-2 text-sm text-gray-700 hover:text-gray-900">
      {children}
    </Link>
  );
}
