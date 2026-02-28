import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* PhiloArt */}
          <div>
            <h5 className="text-white font-semibold mb-4">PhiloArt</h5>
            <div className="flex flex-col gap-2">
              <Link href="/about" className="hover:text-white">About</Link>
              <Link href="/signin" className="hover:text-white">Sign in</Link>
              <Link href="/signup" className="hover:text-white">Sign up</Link>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h5 className="text-white font-semibold mb-4">Tools</h5>
            <div className="flex flex-col gap-2">
              <Link href="/discover" className="hover:text-white">Discover</Link>
              <a href="https://picky.photos" className="hover:text-white" target="_blank" rel="noopener noreferrer">
                Picky
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h5 className="text-white font-semibold mb-4">Contact us</h5>
            <div className="flex flex-col gap-2">
              <Link href="/contact" className="hover:text-white">Suggestions</Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-white text-lg font-semibold mb-2">
            <svg className="w-8 h-8" viewBox="0 0 32 32" fill="currentColor">
              <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" fill="none" />
              <text x="16" y="21" textAnchor="middle" fontSize="14" fontWeight="bold">P</text>
            </svg>
            PhiloArt
          </Link>
          <p className="text-gray-400 mb-4">Share your artworks with the world.</p>

          <div className="flex items-center justify-center gap-2 text-sm">
            <span>Created by Philo</span>
            <a
              href="https://twitter.com/philo2022"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>

          <div className="mt-4">
            <Link href="/license" className="text-gray-400 hover:text-white text-sm">
              License
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
