import bilguunerh from "../Assets/bilguunerh.png";
import usukh6ayar from "../Assets/eazy.png";
import ariunerdene from "../Assets/ariunerdene.png";
import random from "../Assets/random.png";
import instagram from "../Assets/iga.png";


const TeamLocale = [
    {
        members: [
            {
                name: 'М.Билгүүн-Эрх',
                role: 'Үүсгэн байгуулагч',
                image: `${bilguunerh.src}`,
                instagram: 'https://www.instagram.com/bilguunerh/',
                icon: `${instagram.src}`,
            },
            {
                name: 'Д.Ууганбаяр',
                role: 'Back-End хөгжүүлэгч',
                image: `${random.src}`,
                instagram: '',
                icon: `${instagram.src}`,
            },
            {
                name: 'Г.Өсөхбаяр',
                role: 'Ерөнхий эрхлэгч',
                image: `${usukh6ayar.src}`,
                instagram: 'https://www.instagram.com/usukh6ayar/',
                icon: `${instagram.src}`,
            },
            {
                name: 'Ариун-Эрдэнэ',
                role: 'Контент бүтээгч',
                image: `${ariunerdene.src}`,
                instagram: 'https://www.instagram.com/aruk_ae/',
                icon: `${instagram.src}`,
            },
            {
                name: 'М.Оюунболд',
                role: 'Sydney дахь хөтөч',
                image: `${random.src}`,
                instagram: '',
                icon: `${instagram.src}`,
            },
            {
                name: 'З.Эрдэнэ-Уул',
                role: 'Туслах хөгжүүлэгч',
                image: `${random.src}`,
                instagram: '',
                icon: `${instagram.src}`,
            },      
        ]
    }
]

module.exports = {
    TeamLocale,
}