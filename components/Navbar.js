import React from "react";
import { useRouter } from "next/router";
import { NavbarLocale } from "../locales/Navbar";
import EkocabLogo from "../Assets/comingsoon.png";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const router = useRouter();
  const { pathname, locale } = router;

  const l = locale === "en" ? "1" : locale === "cn" ? "2" : "0";
  const t = NavbarLocale[l];

  return (
    <nav className="justify-between items-center flex-wrap w-full text-sm lg:flex hidden fixed top-0 z-30">
      <div className="inline-flex items-center">
        {pathname !== "/invoice" && (
          <div className="relative h-40 w-44">
            <Link href="/">
              <Image src={EkocabLogo} layout="fill" alt="Ekocab Logo" />
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
