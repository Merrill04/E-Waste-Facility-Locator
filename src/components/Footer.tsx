import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 sm:py-16 w-full">
      <div className="w-full px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h6 className="text-gray-300 font-medium mb-2">Resources</h6>
            <ul className="text-sm">
              <li className="mb-2"><Link href="#" className="hover:text-gray-300 transition duration-150">Documentation</Link></li>
              <li className="mb-2"><Link href="#" className="hover:text-gray-300 transition duration-150">Tutorials & Guides</Link></li>
              <li className="mb-2"><Link href="#" className="hover:text-gray-300 transition duration-150">Blog</Link></li>
              <li className="mb-2"><Link href="#" className="hover:text-gray-300 transition duration-150">Support Center</Link></li>
              <li className="mb-2"><Link href="#" className="hover:text-gray-300 transition duration-150">Partners</Link></li>
            </ul>
          </div>

          <div>
            <h6 className="text-gray-300 font-medium mb-2">Company</h6>
            <ul className="text-sm">
              <li className="mb-2"><Link href="#" className="hover:text-gray-300 transition duration-150">Home</Link></li>
              <li className="mb-2"><Link href="#" className="hover:text-gray-300 transition duration-150">About us</Link></li>
              <li className="mb-2"><Link href="#" className="hover:text-gray-300 transition duration-150">Company values</Link></li>
              <li className="mb-2"><Link href="#" className="hover:text-gray-300 transition duration-150">Pricing</Link></li>
              <li className="mb-2"><Link href="#" className="hover:text-gray-300 transition duration-150">Privacy Policy</Link></li>
            </ul>
          </div>

          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <h6 className="text-gray-300 font-medium mb-2">Subscribe</h6>
            <p className="mb-4">Get the latest news and articles to inbox every month.</p>
            <form className="relative">
              <input type="email" className="bg-gray-800 text-gray-400 placeholder-gray-500 px-3 py-2 pr-12 w-full focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-md" placeholder="Your email" required />
              <button type="submit" className="absolute inset-y-0 right-0 px-3 flex items-center text-blue-500 hover:text-blue-400 transition duration-150">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" fillRule="evenodd" />
                </svg>
              </button>
            </form>
            <p className="mt-2 text-green-500 text-sm">Thanks for subscribing!</p>
          </div>

          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <h6 className="text-gray-300 font-medium mb-2">Follow Us</h6>
            <ul className="flex space-x-4">
              <li>
                <Link href="#" className="text-gray-400 hover:text-gray-300 transition duration-150">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z" />
                  </svg>
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-gray-300 transition duration-150">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.789.717 1.459 1.384 2.126.667.667 1.337 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.789-.306 1.459-.717 2.126-1.384.667-.667 1.079-1.337 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.717-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                  </svg>
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-gray-300 transition duration-150">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 6.63 5.37 12 12 12 6.63 0 12-5.37 12-12 0-6.63-5.37-12-12-12zm3.16 6.38c.67 0 1.22.55 1.22 1.22 0 .67-.55 1.22-1.22 1.22-.67 0-1.22-.55-1.22-1.22 0-.67.54-1.22 1.22-1.22zM12 5.34c1.5 0 2.77 1.06 2.77 2.44v1.72c0 1.38-1.27 2.44-2.77 2.44s-2.77-1.06-2.77-2.44V7.78C9.23 6.4 10.5 5.34 12 5.34zm-3.15 7.4v3.14h2.11v6.6h3.64v-6.6h2.5l.21-2.51c0-.17.01-.33.03-.48h-2.74V9.5c0-.36.36-.66.72-.66h2.09V6.38H12.4c-2.84 0-4.55 1.61-4.55 4.36z" />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 mt-8 sm:mt-12">
        <div className="md:flex md:items-center md:justify-between">
          <p className="text-sm text-gray-500">&copy; All rights reserved.</p>
          <div className="flex space-x-4 text-sm text-gray-500">
            <Link href="#" className="hover:text-gray-400 transition duration-150">Terms</Link>
            <span>·</span>
            <Link href="#" className="hover:text-gray-400 transition duration-150">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;