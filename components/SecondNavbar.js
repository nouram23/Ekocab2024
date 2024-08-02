import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import EkocabLogo from "../Assets/mainlogo.png";
//locales
import { NavbarLocale } from "../locales/Navbar";
//photos
import EkoCabLogo from "../Assets/ekocablogoicon.png";

const SecondNavbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const router = useRouter();
  const l = router.locale === "en" ? "1" : router.locale === "cn" ? "2" : "0";
  const t = NavbarLocale[l];

  // Check if current route is /admin
  const isAdminRoute = router.pathname === "/admin";

  // Render null if the current route is /admin
  if (isAdminRoute) {
    return null;
  }

  return (
    <>
      <div className="md:hidden w-full flex justify-between items-center px-2 p-1 z-30 shadow-sm text-sm bg-white cursor-default">
        <div className="">
          <Link href="/">
            <div className="inline-flex items-center p-2 mr-4">
              <div className="h-14 w-14 relative ml-2">
                <Image src={EkoCabLogo} layout="fill" alt="Logo" />
              </div>
            </div>
          </Link>
        </div>
        <div className="flex items-center pr-5">
          <svg
            onClick={() => setShowSidebar(!showSidebar)}
            className={`lg:hidden h-6 w-6 z-50 flex items-center cursor-pointer right-10 top-6 ease-in-out duration-300 ${
              showSidebar ? "hidden" : "flex"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>
      </div>
      <div
        className={`top-0 right-0 left-0 bg-white p-8 text-black fixed h-full z-40 flex flex-col justify-start ease-in-out duration-300 shadow-2xl ${
          showSidebar ? "translate-x-0 " : "translate-x-full"
        }`}
      >
        <Image src={EkocabLogo} width={150} alt="Ekocab Logo" />
        <svg
          onClick={() => setShowSidebar(!showSidebar)}
          className={`lg:hidden h-6 w-6 z-50 flex items-center absolute right-10 mt-1 cursor-pointer ease-in-out duration-300 ${
            showSidebar ? "flex" : "hidden"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="black"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <div className="flex flex-col justify-around items-between text-gray-500 mt-20">
          <Link href="/">
            <div
              onClick={() => setShowSidebar(!showSidebar)}
              className={`rounded-lg text-lg font-semibold leading-7 p-2 hover:bg-gray-50 ${
                router.pathname == "/"
                  ? "text-blue-600"
                  : "text-black"
              }`}
            >
              {t.home}
            </div>
          </Link>
          <Link href="/about">
            <div
              onClick={() => setShowSidebar(!showSidebar)}
              className={`rounded-lg text-lg font-semibold leading-7 p-2 hover:bg-gray-50 ${
                router.pathname == "/about"
                  ? "text-blue-600"
                  : "text-black"
              }`}
            >
              {t.about}
            </div>
          </Link>
          <Link href="/admin">
            <div
              onClick={() => setShowSidebar(!showSidebar)}
              className={`rounded-lg text-lg font-semibold leading-7 p-2 hover:bg-gray-50 ${
                router.pathname == "/admin"
                  ? "text-blue-600"
                  : "text-black"
              }`}
            >
              {t.admin}
            </div>
          </Link>
          <a href="tel:+97672440102">
            <div
              onClick={() => setShowSidebar(!showSidebar)}
              className="rounded-lg text-2xl font-semibold leading-7 p-2 text-center mt-60 hover:bg-gray-50 text-black"
            >
              📞 7244-0102
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default SecondNavbar;
