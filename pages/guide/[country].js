import React from 'react';
import { useRouter } from 'next/router';

const CountryDetail = () => {
  const router = useRouter();
  const { country } = router.query;

  // Define content based on country code
  const renderContent = () => {
    switch (country) {
      case 'aus':
        return (
          <div>
            <h1 className='text-3xl font-bold'>Australia Guide</h1>
            <p>Detailed information about Australia.</p>
          </div>
        );
      case 'mgl':
        return (
          <div>
            <h1 className='text-3xl font-bold'>Mongolia Guide</h1>
            <p>Detailed information about Mongolia.</p>
          </div>
        );
      case 'chn':
        return (
          <div>
            <h1 className='text-3xl font-bold'>China Guide</h1>
            <p>Detailed information about China.</p>
          </div>
        );
      default:
        return <p>No guide available for this country.</p>;
    }
  };

  return (
    <div className='w-full py-5 px-4'>
      {renderContent()}
    </div>
  );
};

export default CountryDetail;
