import React from "react";
import { useRouter } from "next/router";
import { TeamLocale } from "../locales/Members";

const About = () => {
  const router = useRouter();
  const l = router.locale === "en" ? "1" : router.locale === "cn" ? "2" : "0";
  const t = TeamLocale[`${l}`];

  return (
    <div className="lg:px-36 lg:py-10 p-4 bg-gradient-to-r from-[#1B2430] to-black text-white">
      <h2 className="text-center md:text-5xl text-3xl font-bold text-white mb-5">
        Бидний тухай
      </h2>
      <p className="text-white mb-5 text-center font-extralight opacity-90">
        Экокаб ХХК нь 2023 оны 2-р сараас эхлэн нисэх онгоцны буудал хүргэх,
        тосох үйлчилгээг явуулж буй хамт олон юм.
        <br />
        <br />
        Бид 2023 оны 3-р сараас үйлчилгээгээ үзүүлж эхэлсэн. Өдгөө давтагдаагүй
        байдлаар <span className="font-bold text-base text-blue-500 opacity-100">
          +70
        </span>{" "}
        гаруй хэрэглэгчидэд хүргэх, тосох үйлчилгээгээ хүргэжээ.
      </p>
      <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-6">
        {t.members.map((member, index) => (
          <div
            key={index}
            className="text-center"
          >
            <img
              className="mx-auto rounded-2xl opacity-100 transition-opacity duration-300 shadow-lg"
              src={member.image}
              alt={member.name}
            />
            <h3 className="md:text-base text-sm font-bold tracking-tight text-white mt-2">
              {member.name}
            </h3>
            <p className="md:text-sm text-xs text-gray-400">{member.role}</p>
            <a href={member.instagram} className="md:text-sm text-xs text-gray-400">
              <img src={member.icon} alt="" className="w-5 mx-auto mt-1"/>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
