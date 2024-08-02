import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { PricingLocale, Pricings } from "../../locales/PricingInfo";

const PricingInfo = () => {
  const router = useRouter();
  const l = router.locale === 'en' ? '1' : router.locale === 'cn' ? '2' : '0';
  const pricingInfo = PricingLocale[l];
  const pricings = Pricings[l];
  const pricingTab = [
    pricingInfo.negtaldaa,
    pricingInfo.hoyurtaldaa,
    pricingInfo.udruur
  ];
  const [tab, setTab] = useState(0);

  const handleCardClick = (index) => {
    router.push({
      pathname: `/pricing/${index}`,
      query: { tab: tab.toString() }
    });
  };

  return (
    <div className='w-full py-5 cursor-default'>
      <div className='md:flex justify-center py-5'>
        {pricingTab.map((price, index) => (
          <div key={index} onClick={() => { setTab(index) }} className="group mb-3">
            <div className='px-5 flex items-center'>
              <div className={`transition-all duration-100 ease-in-out w-4 h-4 group border-2 mr-2 flex items-center justify-center rounded-full group-hover:border-[#3385ff] ${tab === index ? 'border-[#3385ff] ' : 'border-gray-300'}`}>
                <div className={`h-2 w-2 group-hover:bg-[#3385ff] rounded-full ${tab === index ? 'bg-[#3385ff] ' : ''}`}>
                </div>
              </div>
              <p className='font-light text-sm uppercase transition-all duration-300 ease-in-out'>{price}</p>
            </div>
          </div>
        ))}
      </div>
      <div className='w-full flex justify-center items-center '>
        <p className='uppercase text-lg font-light'>
          {pricingInfo.total}
        </p>
        <p className='uppercase rounded-full mx-1.5 text-xl font-bold'>
          {tab === 0 ? pricingInfo.hours_month : tab === 1 ? pricingInfo.hours_season : tab === 2 ? pricingInfo.hours_half : pricingInfo.hours_annual}
        </p>
        <p className='uppercase text-lg font-light'>
          {pricingInfo.total_text}
        </p>
      </div>
      <div className='text-gray-800 h-full grid lg:grid-cols-3 grid-cols-2 gap-2'>
        {pricings.types.map((pricing, index) => (
          <div key={index} onClick={() => handleCardClick(index)} className='relative group transition-all overflow-hidden duration-300 ease-in-out bg-[#fff] border border-[#f2f2f2] rounded-2xl p-5 h-full hover:border-gray-300 cursor-pointer'>
            <div className='w-full flex items-center flex-col '>
              <p className='uppercase font-semibold text-gray-500 text-xs text-center'>{pricing.mark}</p>
              <img className="" src={pricing.image} width={200} alt="" />
              <p className='font-extrabold text-[#4ad782] uppercase md:text-xl text-lg my-2'>
                {tab === 0 ? pricing.price_negtaldaa : tab === 1 ? pricing.price_hoyurtaldaa : tab === 2 ? pricing.price_udruur : pricing.price_annual}₮
              </p>
              <div className='w-12 h-1 mb-3 rounded-full opacity-90 bg-[#3385ff]'></div>
              <p className='text-xs text-gray-400'>{pricing.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingInfo;
