import React from 'react'
import { useRouter } from 'next/router';
import { Moments } from '../../locales/Moment';

const Moment = () => {
    const router = useRouter();
    const l = router.locale === 'en' ? '1' : router.locale === 'cn' ? '2' : '0';
    const t = Moments[`${l}`];

    if (!t || !t.moments ) {
        return <div>Moments not available</div>;
      }
    
  
  return (
    <div className='w-full grid grid-cols-1 lg:grid-cols-3 gap-5 py-8'>
    <div className='col-span-1 flex flex-col gap-5 lg:mt-20'>
      {t.moments.map((moment, index) => (
        <div key={index}>
          <div className='w-full rounded-3xl flex flex-col'
              >
                  <img src={moment.image} className='rounded-2xl'/>
          </div>
        </div>
      ))}
    </div>
    <div className='col-span-1 flex flex-col gap-5'>
      {t.moments2.map((moment2, index) => (
        <div key={index}>
          <div
            className='w-full rounded-xl flex flex-col'
          >
                  <img src={moment2.image} className='rounded-2xl'/>
          </div>
        </div>
      ))}
          </div>
          <div className='col-span-1 flex flex-col gap-5 lg:mt-20'>
      {t.moments3.map((moment3, index) => (
        <div key={index}>
          <div
            className='w-full rounded-xl flex flex-col'
          >
                  <img src={moment3.image} className='rounded-2xl'/>
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default Moment