import React from "react";
import { useRouter } from "next/router";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { SlideImagesText } from "../../locales/SlideImagesText";
//photos
import image1 from "../../Assets/bg1.png";
import image2 from "../../Assets/bg2.png";

const ImageSlider = () => {
  const router = useRouter();
  const l = router.locale === "en" ? "1" : router.locale === "cn" ? "2" : "0";
  const t = SlideImagesText[`${l}`];
  const slideImages = [
    {
      bgImage: `${image1.src}`,
      url: "../services/airport",
      class1:
        "bg-gradient-to-l from-transparent lg:to-black/40 to-black/20 items-end",
      class2: "text-center",
      class3: "border-gray-600 text-gray-800",
      class4: "text-gray-200 text-center",
      class5: "font-medium text-gray-800",
      text0: `${t.text0.slide2}`,
      text2: `${t.text2.slide2}`,
      text3: `${t.text3.slide2}`,
      text4: `${t.text4}`,
    },
    {
      bgImage: `${image2.src}`,
      url: "../services/guide",
      class1:
        "bg-gradient-to-l from-transparent lg:to-black/40 to-black/20 items-end",
      class2: "text-center",
      class3: "border-gray-600 text-gray-800",
      class4: "text-gray-200 text-center",
      class5: "font-medium text-gray-800",
      text0: `${t.text0.slide3}`,
      text2: `${t.text2.slide3}`,
      text3: `${t.text3.slide3}`,
      text4: `${t.text4}`,
    },
  ];
  const SlideProperties = {
    duration: 10000,
    transitionDuration: 1000,
    canSwipe: false,
  };

  return (
    <div className="relative">
      <div className="slide-container">
        <Slide {...SlideProperties} easing="ease">
          {slideImages.map((slideImage, index) => (
            <div
              className="each-slide w-screen"
              style={{ height: 500 }}
              key={index}
            >
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${slideImage.bgImage})` }}
              >
                <div
                  className={`w-full h-full flex flex-col justify-center items-center p-6 md:p-12 lg:p-20 ${slideImage.class1}`}
                >
                  <div className={`font-bold ${slideImage.class2}`}>
                    <p className="lg:text-7xl md:text-6xl text-4xl font-black text-[#ffff] leading-tight">
                      {slideImage.text0}
                    </p>
                  </div>
                  <div
                    className={`tracking-wide md:text-lg pt-5 text-sm font-extralight ${slideImage.class4}`}
                  >
                    <p className="text-[#ffff]">{slideImage.text2}</p>
                  </div>
                  <div
                    className={`transition-transform duration-300 ease-in-out mt-5 w-64 p-3 flex items-center justify-center rounded-full cursor-pointer ${slideImage.class3} transform hover:scale-105 active:scale-95 active:bg-gray-200`}
                    onClick={() => router.push(slideImage.url)}
                  >
                    <p className="text-sm font-semibold text-white">
                      {slideImage.text4}
                    </p>
                    <svg
                      className="h-4 w-4 ml-2 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 5l7 7-7 7M5 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slide>
      </div>
    </div>
  );
};

export default ImageSlider;
