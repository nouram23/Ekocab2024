import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import EkocabLogo from "../Assets/mainlogo.png";

const Footer = () => {
  const router = useRouter();

  // Check if current route is /admin
  const isAdminRoute = router.pathname === "/admin";

  // Render null if the current route is /admin
  if (isAdminRoute) {
    return null;
  }

  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 text-center md:text-left mb-4 md:mb-0">
            <p className="font-light text-sm">
              &copy; 2024 EkoCab Service. All Rights Reserved.
            </p>
          </div>
          <div className="w-full md:w-1/3 text-center md:text-right">
            <Link href="/about">
              <p className="text-blue-400 hover:text-blue-300 text-sm font-normal transition-colors duration-300">
                Бидний тухай
              </p>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
