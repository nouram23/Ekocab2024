import React, { useState, useEffect } from 'react';

const Payment = () => {
  const [date, setDate] = useState('');

  useEffect(() => {
    // Set the date on the client-side only
    const today = new Date();
    const formattedDate = formatDate(today);
    setDate(formattedDate);
  }, []);

  // Helper function to format the date
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('mn-MN', options); // Change 'mn-MN' to your preferred locale
  };

  // Gradient text style
  const gradientStyle = {
    background: 'linear-gradient(to right, #FFF8F3, #3FA2F6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  // Instagram link gradient style
  const instagramLinkStyle = {
    background: 'linear-gradient(to right, #f58529, #dd2a7b, #8134af, #515bd4, #ffff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textDecoration: 'underline', // Add underline for visibility
  };

  return (
    <div className="lg:px-72 lg:py-20 p-4 bg-black text-white">
      <div className='text-center px-10 py-5'>
        <p className='font-bold md:text-lg text-sm py-5' style={gradientStyle}>
          Төлбөр төлөх заавар • <span className='font-light italic'>{date}</span>
        </p>
        <h2 className="text-center md:text-5xl text-3xl font-bold mb-5">
          Төлбөрөө хэрхэн төлөх вэ?
        </h2>
        <p className='text-[#959499] md:text-lg text-base'>
          Та дансаар болон криптогоор төлбөрөө төлөх боломжтой.
        </p>
      </div>
      <div className='py-10'>
      <div>
        <h3 className='md:text-3xl text-xl'>Дансаар төлөх:</h3>
        <div className='mt-5 text-[#959499]'>
          <p>🏦 М Банк <span className='text-[#62caaa]'>8000441100</span> / М. Билгүүн-Эрх / тоот данс руу шилжүүлээрэй.</p>
          <p className='mt-2'>💁🏻‍♀️ Гүйлгээний утга: Өөрийн Утас болон Instagram Username бичээрэй.</p>
          <p className='mt-2'>🆘 Төлбөрийн буцаалт хийгдэхгүй тул та сонголтоо зөв хийнэ үү.</p>
        </div>
      </div>
      <div className='mt-16'>
        <h3 className='md:text-3xl text-xl'>Бидэнтэй нэгдсэн танд баярлалаа.</h3>
        <div className='mt-5 text-[#959499]'>
          <p>💬 Та өөрийн шилжүүлсэн баримтаа Instagram хуудас руу илгээнэ үү.</p>
          <p className='mt-2'>
            Instagram Page: <a 
              href="https://www.instagram.com/avaadyaviiservice/" 
              style={instagramLinkStyle}
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.instagram.com/intelliums/
            </a>
          </p>
          <p className='mt-2'>💁🏻‍♀️ Үйлчилгээний ажилтан шалгасны дараа тан руу холбоо барих болно.</p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Payment;
