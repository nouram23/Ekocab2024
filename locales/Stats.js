const StatsLocale = [
    {
        items: [
            {
                title: "Нисэх буудал хүргэх, тосох",
                text1: "удаа",
                text2: "Хөшигийн хөндийн нисэх онгоцны буудал хүргэх, тосох үйлчилгээг хамгийн хямдааар тогтмол үйл ажиллагаагаа явуулсаар байна.",
                icon: <EkocabIcon/>,
                count: "64",
                class1: 'bg-blue-500'
            },
            {
                title: "Байгууллагийн гэрээт хүргэлт",
                text1: "байгууллага",
                text2: "Хөшигийн хөндийн нисэх онгоцны буудал хүргэх, тосох үйлчилгээг хамгийн хямдааар тогтмол үйл ажиллагаагаа явуулсаар байна.",
                icon: <WorldIcon/>,
                count: "4",
                class1: 'bg-blue-500'
            },
            {
                title: "Ажлын байрны хүртээмж",
                text1: "ажлын байр",
                text2: "Хөшигийн хөндийн нисэх онгоцны буудал хүргэх, тосох үйлчилгээг хамгийн хямдааар тогтмол үйл ажиллагаагаа явуулсаар байна.",
                icon: <JobIcon/>,
                count: "12",
                class1: 'bg-blue-500'
            },
        ]
    }
]

module.exports = {
    StatsLocale,
}

function EkocabIcon () {
    return (
        <svg className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
}

function WorldIcon () {
    return (
        <svg className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
}

function JobIcon() {
    return (
        <svg className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
}
