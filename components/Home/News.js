import React from 'react';

const News = () => {
  // Sample news data
  const newsItems = [
    {
      id: 1,
      title: "Худалдааны салбарын борлуулалтын орлого 35.7%-иар өслөө.",
      description: "The stock market reached an all-time high today as investors showed renewed optimism.",
      imageUrl: "https://via.placeholder.com/300x200",
    },
    {
      id: 2,
      title: "Төлбөрийн тэнцэл 57 сая ам.долларын алдагдалтай гарлаа",
      description: "The local team clinched the championship in a thrilling game last night.",
      imageUrl: "https://via.placeholder.com/300x200",
    },
    {
      id: 3,
      title: "Үйлдвэрлэгчдийн үнийн өсөлт саарснаар бодлогын хүү буурах хүлээлт өсөв…",
      description: "A leading tech company has announced the release of its latest innovative gadget.",
      imageUrl: "https://via.placeholder.com/300x200",
    },
  ];

  return (
    <div className='w-full py-8'>
      <div className="w-full md:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {newsItems.map((item) => (
            <div key={item.id} className="group relative overflow-hidden transition-transform transform md:hover:scale-105 rounded-xl">
              <p className="text-gray-600 font-extralight opacity-50 text-sm mb-1 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                11 цаг 10 минутын өмнө
              </p>
              <img src={item.imageUrl} alt={item.title} className="w-full h-52 object-cover rounded-xl" />
              <div className="p-3">
                <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-500 transition-colors duration-300">{item.title}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default News;
