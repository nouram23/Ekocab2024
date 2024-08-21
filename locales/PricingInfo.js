import prius30 from '../Assets/prius30.png';
import sanata8 from '../Assets/sanata8.png';
import alphart from '../Assets/Alphart.png';
import suzuki from '../Assets/suzuki.png';
// import g63 from '../Assets/g63.png';
const PricingLocale = [
    {
        negtaldaa: "Нэг талдаа",
        hoyurtaldaa: "Хоёр талдаа",
        udruur: "Өдрөөр",
    },
]

const Pricings = [
    {
        types: [
            {
                mark: 'Prius 30',
                desc: "+ Уух зүйл",
                image: `${prius30.src}`,
                price_negtaldaa: "84,000",
                price_hoyurtaldaa: "94,000",
                price_udruur: "254,000",
                text1: "Та манайхаас онгоцны буудал руу хүргүүлэх, онгоцны буудлаас тосуулах, гэсэн үйлчилгээ авах боломжтой."
            },
            {
                mark: 'Suzuki Jimny',
                desc: "+ Уух зүйл",
                image: `${suzuki.src}`,
                price_negtaldaa: "104,000",
                price_hoyurtaldaa: "134,000",
                price_udruur: "294,000",
                text1: "Та манайхаас онгоцны буудал руу хүргүүлэх, онгоцны буудлаас тосуулах, гэсэн үйлчилгээ авах боломжтой."
            },
            {
                mark: 'Alphart',
                desc: "+ Уух зүйл",
                image: `${alphart.src}`,
                price_negtaldaa: "124,000",
                price_hoyurtaldaa: "134,000",
                price_udruur: "294,000",
                text1: "Та манайхаас онгоцны буудал руу хүргүүлэх, онгоцны буудлаас тосуулах, гэсэн үйлчилгээ авах боломжтой."
            },
            {
                mark: 'Sonata 8',
                desc: "+ Уух зүйл",
                image: `${sanata8.src}`,
                price_negtaldaa: "94,000",
                price_hoyurtaldaa: "104,000",
                price_udruur: "264,000",
                text1: "Та манайхаас онгоцны буудал руу хүргүүлэх, онгоцны буудлаас тосуулах, гэсэн үйлчилгээ авах боломжтой."
            },
            // {
            //     mark: 'Land Cruiser 300',
            //     desc: "+ Уух зүйл",
            //     image: `${g63.src}`,
            //     price_negtaldaa: "604,000",
            //     price_hoyurtaldaa: "614,000",
            //     price_udruur: "904,000",
            //     text1: "Та манайхаас онгоцны буудал руу хүргүүлэх, онгоцны буудлаас тосуулах, гэсэн үйлчилгээ авах боломжтой."
            // },
        ]
    }
]

module.exports = {
    PricingLocale,
    Pricings,
}
