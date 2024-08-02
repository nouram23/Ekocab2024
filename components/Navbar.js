import React from "react";
import { useRouter } from "next/router";
import { NavbarLocale } from "../locales/Navbar";
import EkocabLogo from "../Assets/ekocablogoicon.png";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const router = useRouter();
  const l = router.locale === "en" ? "1" : router.locale === "cn" ? "2" : "0";
  const t = NavbarLocale[l];
  return (

      <nav className="justify-between rounded-b-xl py-3 items-center flex-wrap p-3 w-full bg-white  text-sm lg:flex hidden fixed top-0 shadow-sm z-30">
              <div className="flex items-center">
              <Link href="/">
          <div className="inline-flex items-center">
            <div className="relative h-12 w-12">
              <Image src={EkocabLogo} layout="fill" alt="Ekocab Logo" />
            </div>
          </div>
        </Link>
        <Link href="/driver">
          <div
            className={`transition-all font-medium duration-500 ease-in-out m-1 p-2 py-2 pt-2 border-b-2 text-md hover:text-black hover:border-blue-500 ${
              router.pathname == "/driver"
                ? "text-black border-blue-500"
                : "border-transparent"
            }`}
          >
            {t.driver}
          </div>
        </Link>
        <Link href="/about">
          <div
            className={`transition-all font-medium duration-500 ease-in-out m-1 p-2 py-2 pt-2 border-b-2 text-md hover:text-black hover:border-blue-500 ${
              router.pathname == "/about"
                ? "text-black border-blue-500"
                : "border-transparent"
            }`}
          >
            {t.about}
          </div>
              </Link>
       </div>
              <div className="border border-blue-300 py-1 px-3 rounded-full">
                  <h1 className="font-medium text-md text-[#336CFF]">7244-0102</h1>
              </div>
      </nav>
  );
};

export default Navbar;
