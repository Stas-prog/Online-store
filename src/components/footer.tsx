import Link from "next/link"
import Image from "next/image"


const Footer = () => {
    return (
        <div className="py-24 px-4 md:px-8 lg:px-16 relative bg-gray-200 text-sm mt-24 mb-5">
            {/* TOP  */}
            <div className="flex flex-col md:flex-row justify-between gap-24">
                {/* LEFT  */}
                <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
                    <Link href="/homepage">
                        <Image src='/logo.png' alt="" width={104} height={74} className="cursor-pointer" />
                        {/* <div className="text-2xl tracking-wide">Packandgo</div> */}
                    </Link>
                    <p>Адреса: Київ, вул Хрещатик 27б, Україна</p>
                    <span className="font-semibold">Packandgo@gmail.com</span>
                    <span className="font-semibold">+38 050 456 23 89</span>
                    <div className="flex gap-6">
                        <Image src="/facebook.png" alt="" width={16} height={16} />
                        <Image src="/instagram.png" alt="" width={16} height={16} />
                        <Image src="/youtube.png" alt="" width={16} height={16} />
                        <Image src="/pinterest.png" alt="" width={16} height={16} />
                        <Image src="/x.png" alt="" width={16} height={16} />
                    </div>
                </div>
                {/* CENTER  */}
                <div className="w-1/2 hidden lg:flex justify-between">
                    <div className="flex flex-col justify-between">
                        <h1 className="font-medium text-lg">COMPANY</h1>
                        <div className="flex flex-col gap-6">
                            <Link href="/about">Про нас</Link>
                            <Link href="">Кар'єра</Link>
                            <Link href="">Філії</Link>
                            <Link href="">Блог</Link>
                            <Link href="/contact">Контакти</Link>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between">
                        <h1 className="font-medium text-lg">Магазин</h1>
                        <div className="flex flex-col gap-6">
                            <Link href="/list?cat=нові-товари">Новий товар</Link>
                            <Link href="/list?cat=аксесуари">Аксесуари</Link>
                            <Link href="">Для чоловіків</Link>
                            <Link href="">Для жінок</Link>
                            <Link href="/list?cat=all-products">Всі товари</Link>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between">
                        <h1 className="font-medium text-lg">Допомога</h1>
                        <div className="flex flex-col gap-6">
                            <Link href="/corp">Корпоративні замовлення</Link>
                            <Link href="">Мій акаунт</Link>
                            <Link href="">Знайти нас</Link>
                            <Link href="">Права і обов'язки</Link>
                            <Link href="">Подарункова карта</Link>
                        </div>
                    </div>
                </div>
                {/* RIGHT  */}
                <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
                    <h1 className="font-medium text-lg">SUBSCRIBE</h1>
                    <p className="">Будь першим, щоб отримувати найсвіжіші новини</p>
                    <div className="flex">
                        <input type="text" placeholder="email address" className="p-4 w-3/4" />
                        <button className="w-1/4 bg-z text-white text-sm">Join</button>
                    </div>
                    <span className="font-semibold">Безпечна оплата</span>
                    <div className="flex justify-between">
                        <Image src="/discover.png" alt="" width={40} height={20} />
                        <Image src="/skrill.png" alt="" width={40} height={20} />
                        <Image src="/paypal.png" alt="" width={40} height={20} />
                        <Image src="/mastercard.png" alt="" width={40} height={20} />
                        <Image src="/visa.png" alt="" width={40} height={20} />
                    </div>
                </div>
            </div>
            {/* BOTTOM  */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-16">
                <div className="font-semibold">2025 PACKANDGO SHOP</div>
                <div className="flex flex-col md:flex-row gap-8">
                    <span className="mr-4 text-gray-500 text-center">Мова</span>
                    <span className="font-medium">Україна | українська</span>
                </div>
                <div className="flex flex-col md:flex-row gap-8">
                    <span className="mr-4 text-gray-500">Валюта</span>
                    <span className="font-medium flex items-center">
                        <Image src="https://st2.depositphotos.com/7442846/11033/v/380/depositphotos_110336322-stock-illustration-hryvnia-icon-in-a-flat.jpg"
                            alt="" width={26} height={26} />
                        UAH
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Footer