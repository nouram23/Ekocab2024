import React from 'react';
import { useRouter } from 'next/router';

const GuideCenter = () => {
  const router = useRouter();

  const handleCountryClick = (countryCode) => {
    // Navigate to the dynamic country detail page
    router.push(`/guide/${countryCode}`);
  };

  // Country information with emojis
  const countries = [
    {
      code: 'aus',
      name: 'Australia',
      emoji: '🇦🇺', // Emoji for Australia
      description: 'Explore the beauty of Australia.',
    },
    {
      code: 'mgl',
      name: 'Mongolia',
      emoji: '🇲🇳', // Emoji for Mongolia
      description: 'Discover the landscapes of Mongolia.',
    },
    {
      code: 'chn',
      name: 'China',
      emoji: '🇨🇳', // Emoji for China
      description: 'Unveil the rich history of China.',
    },
  ];

  return (
      <div className='w-full py-8 px-4 flex flex-wrap gap-6'>
        {countries.map((country) => (
          <div
            key={country.code}
            onClick={() => handleCountryClick(country.code)}
            className='cursor-pointer w-full md:w-80 h-52 bg-white rounded-xl shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl flex flex-col  overflow-hidden'
          >
            <div className='text-6xl mb-4'>{country.emoji}</div>
            <div className='p-4'>
              <h2 className='text-2xl font-semibold text-gray-800 mb-1'>{country.name}</h2>
              <p className='text-sm text-gray-600'>{country.description}</p>
            </div>
          </div>
        ))}
      </div>
  );
};

export default GuideCenter;
