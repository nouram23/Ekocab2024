import React from "react"
import { Inter } from "next/font/google";
import Head from "next/head";
//components
import ImageSlider from "../components/Home/ImageSlider";
import GridSection from "@/components/Home/Grid";
import PricingInfo from "@/components/Home/PricingInfo";
import News from "@/components/Home/News";
import Instruction from "@/components/Home/Instruction";
import Moment from "@/components/Home/Moment";

const inter = Inter({ subsets: ["latin"] });

function Home() {
  return (
    <div className="cursor-default">
      <Head>
        <meta name="description" content="Ekocab LLC" />
        <meta name="keywords" content="Ekocab, ekocab, taxi, airport, Airport, cab, Cab, Service, service" />
        <meta charSet="utf-8" />
        <meta property="og:description" content="Нисэх онгоцны буудал хүргэх,тосох үйлчилгээ." />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Ekocab LLC" />
        <meta property="og:description" content="Ekocab LLC Service Website" />
        <meta property="og:url" content="https://ekocab.mn" />
      </Head>
      <ImageSlider />
      <div className="md:px-8 px-4 bg-[#f8f8f8]">
        <PricingInfo />
        <div className="mt-5">
        <h1 className="text-xl lg:text-4xl font-bold text-[#555555]">Бидний гүйцэтгэсэн ажилууд</h1>
        <span className="text-[#bababa] text-xs lg:text-base">Нислэгтээ хүрэх хүртлэхээ бидэнд таатга.</span>
          <GridSection />
          {/* <GuideCenter/> */}
        </div>
        <div className="mt-5">
          <h1 className="text-xl lg:text-4xl font-bold text-[#555555]">Дурсамжит зурагууд</h1>
          <span className="text-[#bababa] text-xs lg:text-base">Дурсамж бол өнгөрсөн үеийн зүйлсийг санах, сэтгэхүйд хадгалагдан үлдэх юм.</span>
          <Moment/>
        </div>
        <div className="mt-5">
          <Instruction />
        </div>
        {/* <div className="mt-5">
        <h1 className="text-xl lg:text-4xl font-bold text-[#555555]">Мэдээ мэдээлэл</h1> */}
        {/* <span className="text-[#959595] text-base lg:text-lg sm:mt-1">Нислэгтээ хүрэх хүртлэхээ бидэнд таатга.</span> */}
          {/* <News />
        </div> */}
      </div>
    </div>
  );
}
export default Home;
