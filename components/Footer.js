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
    <footer className="bg-[#292929] text-white py-5">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 text-center md:text-left">
            {/* <Image src={EkocabLogo} width={150} alt="Ekocab Logo" /> */}
            <p className="font-light text-sm text-white">
              &copy; 2024 EkoCab Service. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
