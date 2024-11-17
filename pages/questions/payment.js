import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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


  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Данс амжилттай хуулагдлаа.');
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  return (
    <div className="lg:px-72 lg:py-20 p-4  bg-gradient-to-r from-[#1B2430] to-black text-white">
      <div className='text-center px-10 py-5'>
        <p className='font-bold md:text-lg text-sm py-5' style={gradientStyle}>
          Төлбөр төлөх заавар • <span className='font-light italic'>{date}</span>
        </p>
        <h2 className="text-center md:text-5xl text-3xl font-bold mb-5">
          Төлбөрөө хэрхэн төлөх вэ?
        </h2>
        <p className='text-[#959499] md:text-lg text-base'>
          Та дансаар болон <span className='text-[#b1e48a]'>АрдКойн</span> оор төлбөрөө төлөх боломжтой.
        </p>
      </div>
      <div className='py-10'>
        <div>
          <h3 className='md:text-3xl text-xl'>Дансаар төлөх:</h3>
          <div className='mt-5 text-[#959499]'>
            <p>
              🏦 М Банк {' '}
              <button
                onClick={() => copyToClipboard('8000441100')}
                className='text-[#62caaa] hover:underline focus:outline-none underline'
              >
                8000441100
              </button>
              {' '}
              / М. Билгүүн-Эрх / тоот данс руу шилжүүлээрэй.
            </p>
            <p className='mt-2'>💁🏻‍♀️ Гүйлгээний утга: Өөрийн Утас болон Instagram Username бичээрэй.</p>
            <p className='mt-2'>🆘 Төлбөрийн буцаалт хийгдэхгүй тул та сонголтоо зөв хийнэ үү.</p>
          </div>
        </div>

        <div className='py-10'>
          <h3 className='md:text-3xl text-xl'>Криптогоор төлөх:</h3>
          <div className='mt-5 text-[#959499]'>
            <p>
              🏦  USDT TRC20: {' '}
              <button
                onClick={() => copyToClipboard('TWGJPuTPpTwxDxqkfxf2U4TKb8KswH5EaY')}
                className='text-[#F6E96B] hover:underline focus:outline-none underline'
              >
                TWGJPuTPpTwxDxqkfxf2U4TKb8KswH5EaY
              </button>
              {' '}
              тоот данс руу шилжүүлээрэй.
            </p>
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
                https://www.instagram.com/avaadyaviiservice/
              </a>
            </p>
            <p className='mt-2'>
              Facebook Page: <a
                href="https://www.facebook.com/share/6kmHDSCeFDUdhCGi/?mibextid=LQQJ4d"
                style={facebookLinkStyle}
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.facebook.com/521
              </a>
            </p>
            <p className='mt-2'>💁🏻‍♀️ Үйлчилгээний ажилтан шалгасны дараа тан руу холбоо барих болно.</p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Payment;
