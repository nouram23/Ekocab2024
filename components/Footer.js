import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Footer = () => {
  const router = useRouter();

  // Check if current route is /admin
  const isAdminRoute = router.pathname === "/dashboard/admin";

  // Render null if the current route is /admin
  if (isAdminRoute) {
    return null;
  }

  return (
    <footer className="bg-[#131418] text-white p-4">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 text-center md:text-left mb-2 md:mb-0">
            <p className="font-light md:text-xs text-xs text-[#7b7c89]">
              &copy; 2024 Erh LLC.
            </p>
          </div>
          <div className="w-full md:w-2/3 text-center md:text-right flex justify-center md:justify-end space-x-4 ">
          <Link href="/">
              <p className="text-[#cacad2] hover:text-blue-400 text-sm font-normal transition-[colors] duration-300">
                Home
              </p>
            </Link>
            <Link href="/about">
              <p className="text-[#cacad2] hover:text-blue-400 text-sm font-normal transition-colors duration-300">
                About
              </p>
            </Link>
            <Link href="/questions/payment">
              <p className="text-[#cacad2] hover:text-blue-400 text-sm font-normal transition-colors duration-300">
                Payment
              </p>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
