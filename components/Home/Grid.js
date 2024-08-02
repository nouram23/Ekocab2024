import React from 'react'
import { useRouter } from 'next/router';
import CountUp from 'react-countup';

import { StatsLocale } from "../../locales/Stats";
import { useState } from 'react';

const GridSection = () => {
  const router = useRouter()
  const l = router.locale === 'en' ? '1' : router.locale === 'cn' ?  '2'  : '0'
  const t = StatsLocale[`${l}`]
  const [show, setShow] = useState(false)
  return (
   <div className="grid md:grid-cols-3 grid-cols-2 gap-5 py-2">
      {StatsLocale[l].items.map((stats, index) => (
        <div key={index}>
              <div className='transition-all duration-500 ease-in-out w-full flex text-center items-center h-full flex-col rounded-2xl
              hover:border-gray-300 relative group py-10 border border-gray-200' onClick={() =>{setShow(!show)}}>
            
                <p className='md:font-black font-black uppercase md:text-xl text-base text-[#26282c]'>
                    {stats.title}
                </p>
                  <p className='text-gray-700 mt-2 scale-75 '>{stats.icon}</p>
                  <div className={`w-12 h-1${stats.class1}`}></div>
                {!show ?    
                <>
                  <p className='md:text-5xl text-3xl font-black text-[#0775ff]'><CountUp end={stats.count} /></p>
                  <p className='font-light text-[#26282c]'>{stats.text1}</p>
                </>
              :
              <div className='flex flex-col items-center text-center'>
                <p className='text-xs w-4/5 text-center'>{stats.text2}</p>
              </div>
            }
              </div>
        </div>
      ))}
    </div>
  )
}

export default GridSection