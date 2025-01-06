import React from "react";
import { useRouter } from "next/router";
import { TeamLocale } from "../locales/Members";


const About = () => {
  const router = useRouter();
  const l = router.locale === "en" ? "1" : router.locale === "cn" ? "2" : "0";
  const t = TeamLocale[`${l}`];
  const facebookLinkStyle = {
    background: 'linear-gradient(to right, #fff, #0064e0, #0082fb)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textDecoration: 'underline', // Add underline for visibility
  };

  //Facebook link gradient style
  const instagramLinkStyle = {
    background: 'linear-gradient(to right, #f58529, #dd2a7b, #8134af, #515bd4, #ffff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textDecoration: 'underline', // Add underline for visibility
  };

  return (
    <div className="lg:px-36 lg:py-10 p-4 bg-gradient-to-b from-[#344980] to-black text-white">
      <h2 className="text-center md:text-5xl text-3xl font-bold text-white mb-5">
      Management
      </h2>
      {/* <p className="text-white  text-center font-extralight opacity-90">
        Экокаб ХХК нь 2023 оны 2-р сараас эхлэн нисэх онгоцны буудал хүргэх,
        тосох үйлчилгээг явуулж буй хамт олон юм.
        <br />
        <br />
        Бид 2023 оны 3-р сараас үйлчилгээгээ үзүүлж эхэлсэн. Өдгөө давтагдаагүй
        байдлаар <span className="font-bold text-base text-blue-500 opacity-100">
          +70
        </span>{" "}
        гаруй хэрэглэгчидэд хүргэх, тосох үйлчилгээгээ хүргэжээ.
      </p> */}

      {/* CEO's Message Section */}
      <div className="flex flex-col md:flex-row items-center rounded-lg md:py-10 py-5">
      <img src="https://i.ibb.co/Bf7YGmP/ceo1.jpg" alt="ceo" className="md:w-72 md:h-72 w-44 rounded-2xl md:mr-6 mb-4 md:mb-0" />

        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold text-white mb-2">Bilguun-Erkh Myagmardorj</h3>
          <p className="text-white opacity-90 font-thin">
            {/* "Bilguun-Erkh Myagmardorj has been the CEO of Erh Holding LLC since 2023. He began his career as a Software Engineer Intern at Ard Financial Group and later worked as a Front-End Developer at Nomin Holding LLC, where he spent two years. Subsequently, he founded Erh Holding LLC. Bilguun-Erkh completed his high school education at Nest Education IT School and graduated from Pinecone Academy as a Full Stack Developer. He is currently furthering his studies in Sydney, Australia." */}
            

            Мягмардоржын Билгүүн-Эрх нь 2023 оноос хойш "Эрх Холдинг" ХХК-ийг чиглүүлэн ажиллаж байна. Тэрээр ажлын гараагаа "Ард Санхүүгийн Нэгдэл"-д программ хангамжийн инженерийн дадлагажигчаар эхэлж, дараа нь "Номин Холдинг" ХХК-д хоёр жилийн турш Front-End Developer-оор ажилласан туршлагатай. Үүний дараа өөрийн компани болох "Эрх Холдинг" ХХК-ийг үүсгэн байгуулж, амжилттай удирдаж байна.

Билгүүн-Эрх ахлах сургуулийн боловсролоо "Nest Education IT School"-д амжилттай эзэмшиж, дараа нь "Pinecone Academy"-г дүүргэн MERN Stack хөгжүүлэгчээр мэргэшсэн. Одоогоор тэрээр Австралийн Сидней хотод хэлний мэдлэгээ сайжруулан, цаашдын боловсролын чиглэлд өөрийгөө хөгжүүлэхээр суралцаж байна.
          </p>
          <div className="flex gap-3 mt-1 justify-center md:justify-start text-center">
  <p className="">
    <a
      href="https://www.facebook.com/myagmardorj.bilguunerkh/"
      style={facebookLinkStyle}
      target="_blank"
      rel="noopener noreferrer"
    >
      Facebook
    </a>
  </p>
  <p className="">
    <a
      href="https://www.instagram.com/21.05.25/"
      style={instagramLinkStyle}
      target="_blank"
      rel="noopener noreferrer"
    >
      Instagram
    </a>
  </p>
</div>

        </div>
      </div>

      {/* Team Members Section */}
      <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-6">
        {t.members.map((member, index) => (
          <div key={index} className="text-center">
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
