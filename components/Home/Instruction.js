import React from 'react';
import { useRouter } from 'next/router';
import { Instructions } from '../../locales/Instruction';

const Instruction = () => {
  const router = useRouter();
  const l = router.locale === 'en' ? '1' : router.locale === 'cn' ? '2' : '0';
  const t = Instructions[`${l}`];

  // Ensure Instructions[l] and its properties are defined
  if (!t || !t.instructions || !t.instructions2) {
    return <div>Instructions not available</div>;
  }

  return (
    <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-7 md:px-40 py-20'>
      <div className='col-span-1 flex flex-col gap-7'>
        <div>
          <div className='flex flex-col'>
            <p className='text-center lg:text-start text-3xl lg:text-4xl font-bold'>
              Нисэх буудал руу хүргүүлэх үү? 🚗
            </p>
            <p className='text-center lg:text-start text-base text-[#5f5f5f] mt-4'>
              Орон зай, цаг хугацаанаас үл хамааран бид нисэх онгоцны буудал хүргэх, тосох үйлчилгээг цаг алдалгүй үзүүлж байна.
            </p>
          </div>
        </div>
        {t.instructions.map((instruction, index) => (
          <div key={index}>
            <div
              style={{ backgroundColor: instruction.background }}
              className='w-full p-5 lg:p-12 rounded-3xl flex flex-col gap-4 lg:gap-8'
            >
              <div className='flex flex-col gap-3'>
                <span style={{ color: instruction.text}} className='text-xl lg:text-2xl font-semibold'>
                  {instruction.title}
                </span>
                <span style={{ color: instruction.text}} className='text-sm lg:text-base'>{instruction.desc}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='col-span-1 flex flex-col gap-7'>
        {t.instructions2.map((instruction2, index) => (
          <div key={index}>
            <div
              style={{ backgroundColor: instruction2.background }}
              className='w-full p-5 lg:p-12 rounded-3xl flex flex-col gap-4 lg:gap-8'
            >
              <div className='flex flex-col gap-3 text-[#fff]'>
                <span  className='text-xl lg:text-2xl font-semibold'>
                  {instruction2.title}
                </span>
                <p className='text-sm lg:text-base'>
                  {instruction2.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instruction;
