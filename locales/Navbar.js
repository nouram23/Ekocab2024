const NavbarLocale = [
    {
        ekocab: 'Экокаб ХХК',
        home: 'Home',
        driver: 'Жолооч',
        service: 'Бүтээгдэхүүн',
        about: 'About',
        admin: 'Админ хэсэг',
        payment: 'Payment',
        services: [
            {
                title: 'EkoCab',
                description: 'Нисэх онгоцны буудал хүргэх тосох үйлчилгээ',
                logo: <EkocabLogo/>,
                url: "/services/airport"
            },
            {
                title: 'Spongeko',
                description: 'Гадна хаягжилт цэвэрлэх үйлчилгээ',
                logo: <></>,
                url: "/services/airport"
            },
        ]
    },
    {
        ekocab: 'Экокаб ХХК',
        home: 'Нүүр',
        driver: 'Жолооч',
        service: 'Бүтээгдэхүүн',
        services: [
            {
                title: 'EkoCab',
                description: 'Нисэх онгоцны буудал хүргэх тосох үйлчилгээ',
                logo: <EkocabLogo/>,
                url: "/services/airport"
            },
            {
                title: 'Spongeko',
                description: 'Гадна хаягжилт цэвэрлэх үйлчилгээ',
                logo: <></>,
                url: "/services/airport"
            },
        ]
    },
]

module.exports = {
    NavbarLocale,
}

function EkocabLogo() {
    return (
        <img src="../Assets/logoicon.png" alt="Ekocab Logo"/>
    )
}