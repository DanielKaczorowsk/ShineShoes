import { useEffect, useRef, useState } from "react";
import {useAuth} from "../../context/AuthContext";
import { Link } from 'react-router-dom';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { BellIcon,ShoppingCartIcon ,UserIcon,HeartIcon,Bars3Icon,XMarkIcon } from '@heroicons/react/24/outline'
import { addBasket } from "../../api/ShopProvider";
import {useSetDataProvider} from "../../api/SetDataProvider";
import logo from '../../assets/LogoShineShoes.png';

const products = [
    {
        id: 1,
        name: 'Throwback Hip Bag',
        href: '#',
        color: 'Salmon',
        price: '$90.00',
        quantity: 1,
        imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
        imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
    },
    {
        id: 2,
        name: 'Medium Stuff Satchel',
        href: '#',
        color: 'Blue',
        price: '$32.00',
        quantity: 1,
        imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
        imageAlt:
            'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
    },
    {
        id: 3,
        name: 'Zip Tote Basket',
        href: '#',
        color: 'White and black',
        price: '$140.00',
        quantity: 1,
        imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-03.jpg',
        imageAlt: 'Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.',
    },
]

const shopNavigation = [
    {
        name: "Nowości",
        link: "/new-arrivals",
        columns: [
            {
                title: "Odkryj",
                links: [
                    { name: "Wszystkie nowości", link: "/new-arrivals" },
                    { name: "Najnowsze modele", link: "/new-arrivals/latest" },
                    { name: "Bestsellery", link: "/bestsellers" },
                ],
            },
        ],
    },
    {
        name: "Mężczyźni",
        link: "/men",
        columns: [
            {
                title: "Obuwie",
                links: [
                    { name: "Wszystkie buty", link: "/men" },
                    { name: "Sneakersy", link: "/men/sneakers" },
                    { name: "Buty sportowe", link: "/men/sport" },
                    { name: "Buty klasyczne", link: "/men/classic" },
                ],
            },
            {
                title: "Popularne",
                links: [
                    { name: "Bestsellery", link: "/bestsellers" },
                    { name: "Nowości", link: "/new-arrivals" },
                    { name: "Wyprzedaż", link: "/sale" },
                ],
            },
        ],
    },
    {
        name: "Kobiety",
        link: "/women",
        columns: [
            {
                title: "Obuwie",
                links: [
                    { name: "Wszystkie buty", link: "/women" },
                    { name: "Sneakersy", link: "/women/sneakers" },
                    { name: "Buty sportowe", link: "/women/sport" },
                ],
            },
            {
                title: "Odkryj",
                links: [
                    { name: "Bestsellery", link: "/bestsellers" },
                    { name: "Nowości", link: "/new-arrivals" },
                ],
            },
        ],
    },
    {
        name: "Wyprzedaż",
        link: "/sale",
        columns: [
            {
                title: "Oferty",
                links: [
                    { name: "Wszystkie przeceny", link: "/sale" },
                    { name: "Ostatnie sztuki", link: "/sale/last-chance" },
                ],
            },
        ],
    },
];
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
function Navbar()
{


    const [isNavbarVisible, setIsNavbarVisible] = useState(true);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const scrollableHeight =
                document.documentElement.scrollHeight - window.innerHeight;

            const scrollPercent =
                scrollableHeight > 0 ? scrollY / scrollableHeight : 0;

            if (scrollY <= 0 || scrollPercent < 0.3) {
                setIsNavbarVisible(true);
            } else if (scrollY < lastScrollY.current - 2) {
                setIsNavbarVisible(true);
            } else if (scrollY > lastScrollY.current + 2) {
                setIsNavbarVisible(false);
            }

            lastScrollY.current = scrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    const [productData, setProductData] = useState({
        name: '',
        category: [],
        description: '',
        model: '',
        price: 0,
        variantProduct: [
            { size: "", color: "", quantity: 0 }
        ]
    });
    const { execute: addToBasket, status } = useSetDataProvider(() => addBasket(productData));
    const { handleLogout,isLoggedIn } = useAuth();
    return (
        <Disclosure
            as="header"
            className={`sticky top-0 z-50 bg-white shadow-sm
            transition-transform duration-300 ease-in-out ${
                isNavbarVisible
                    ? "translate-y-0"
                    : "-translate-y-full"
            }`}
        >
            <div className="border-b border-gray-100 pt-4">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex min-w-0 items-center">
                        <DisclosureButton
                            className="ml-2 inline-flex items-center justify-center
                   rounded-md p-2 text-[#454545]
                   hover:bg-gray-100 lg:hidden"
                        >
                            {({ open }) => (
                                <>
                <span className="sr-only">
                    {open ? "Zamknij menu" : "Otwórz menu"}
                </span>

                                    {open ? (
                                        <XMarkIcon className="size-7" />
                                    ) : (
                                        <Bars3Icon className="size-7" />
                                    )}
                                </>
                            )}
                        </DisclosureButton>
                        <Link to="/" className="flex shrink-0 items-center">
                            <img
                                src={logo}
                                alt="ShineShoes"
                                className="w-auto h-15 sm:h-32 md:h-44 lg:h-52"
                            />
                        </Link>
                    </div>

                    <div className="flex shrink-0 items-center gap-3 sm:gap-4">

                        <div className="flex items-center">
                            <div className="ml-3">
                                <Link to="/product"><HeartIcon aria-hidden="true" className="size-8" /></Link>
                            </div>
                            <Menu as="div" className="relative ml-3">
                                <MenuButton className="relative flex rounded-full p-1 text-gray-500 hover:text-[#454545] focus:outline-none">
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">Koszyk</span>
                                    <ShoppingCartIcon aria-hidden="true" className="size-7" />
                                    {/* Optional: Cart Count Badge */}
                                    <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-[#454545] text-[10px] font-bold text-white">
                                        {products.length}
                                  </span>
                                </MenuButton>
                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-lg bg-white shadow-2xl  transition focus:outline-none data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:ease-out data-leave:duration-75">
                                    <div className="p-4">
                                        <h2 className="text-lg font-medium text-[#454545]">Twój koszyk</h2>
                                        <div className="mt-4 flow-root">
                                            <ul role="list" className="-my-4 divide-y divide-gray-200">
                                                {products.map((product) => (
                                                    <li key={product.id} className="flex py-4">
                                                        <div className="size-16 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                            <img alt={product.imageAlt} src={product.imageSrc} className="size-full object-cover" />
                                                        </div>

                                                        <div className="ml-4 flex flex-1 flex-col">
                                                            <div className="flex justify-between text-sm font-medium text-[#454545]">
                                                                <h3 className="truncate w-32">{product.name}</h3>
                                                                <p className="ml-2">{product.price}</p>
                                                            </div>
                                                            <div className="flex flex-1 items-end justify-between text-xs">
                                                                <p className="text-[#454545]">Ilość: {product.quantity}</p>
                                                                <button type="button" className="font-medium px-6 py-3 text-[10px] rounded-[3px] text-[#454545] border  bg-white border-[#454545] hover:text-white hover:bg-[#454545] transition">
                                                                    Usuń
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Footer Section */}
                                        <div className="mt-6 border-t border-gray-200 pt-4">
                                            <div className="flex justify-between text-base font-medium text-[#454545]">
                                                <p>Suma</p>
                                                <p>$262.00</p>
                                            </div>
                                            <div className="mt-4">
                                                <MenuItem>
                                                    <a href="/checkout" className="flex items-center justify-center px-6 py-3 text-md rounded-md text-[#454545] border  bg-white border-[#454545] hover:text-white hover:bg-[#454545] transition">
                                                        Do kasy
                                                    </a>
                                                </MenuItem>
                                            </div>
                                        </div>
                                    </div>
                                </MenuItems>
                            </Menu>
                            <div className="ml-3">
                                <button type="button" className="relative rounded-full p-1 text-[#454545] focus:outline-2 focus:outline-offset-2 focus:outline-gray-400">
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">Powiadomienia</span>
                                    <BellIcon aria-hidden="true" className="size-8" />
                                </button>
                            </div>

                            {/* Profile dropdown */}
                            <Menu as="div" className="relative ml-3">
                                <MenuButton className="relative flex rounded-full p-1 text-[#454545] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500">
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">Ustawienia uzytkownika</span>
                                    <UserIcon aria-hidden="true" className="size-8" />
                                </MenuButton>
                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg outline outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-leave:duration-75 data-leave:ease-in"
                                >{isLoggedIn && (
                                    <>
                                        <MenuItem>
                                            <Link
                                                to="/Dashboard"
                                                className="block px-4 py-2 text-sm text-[#454545] data-focus:bg-gray-100 data-focus:outline-hidden"
                                            >
                                                Twoj Profil
                                            </Link>
                                        </MenuItem>
                                        <MenuItem>
                                            <a
                                                href="#"
                                                className="block px-4 py-2 text-sm text-[#454545] data-focus:bg-gray-100 data-focus:outline-hidden"
                                            >
                                                Ustawienia
                                            </a>
                                        </MenuItem>
                                        <MenuItem>
                                            <a onClick={handleLogout}
                                               className="block px-4 py-2 text-sm text-[#454545] data-focus:bg-gray-100 data-focus:outline-hidden"
                                            >
                                                Wyloguj
                                            </a>
                                        </MenuItem>
                                    </>
                                )}
                                    {!isLoggedIn && (
                                        <>
                                            <MenuItem>
                                                <Link
                                                    to="/login"
                                                    className="block px-4 py-2 text-sm text-[#454545] data-focus:bg-gray-100 data-focus:outline-hidden"
                                                >
                                                    Logowanie
                                                </Link>
                                            </MenuItem>
                                            <MenuItem>
                                                <Link
                                                    to="/register"
                                                    className="block px-4 py-2 text-sm text-[#454545] data-focus:bg-gray-100 data-focus:outline-hidden"
                                                >
                                                    Rejestracja
                                                </Link>
                                            </MenuItem>
                                        </>
                                    )}
                                </MenuItems>
                            </Menu>
                        </div>
                    </div>
                </div>
                <div className="relative hidden border-b border-gray-100 lg:block">
                    <nav className="mx-auto flex h-12 max-w-7xl items-center justify-center gap-10 px-6">
                        {shopNavigation.map((item) => (
                            <div key={item.name} className="group h-full">
                                <Link
                                    to={item.link}
                                    className="relative flex h-full items-center text-sm font-medium tracking-wide text-[#454545] transition-colors hover:text-black"
                                >
                                    {item.name}

                                    <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#454545] transition-all duration-200 group-hover:w-full" />
                                </Link>

                                {/* Mega-menu */}
                                <div className="invisible absolute left-0 top-full z-50 w-full translate-y-2 border-t border-gray-100 bg-white opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                                    <div className="mx-auto grid max-w-7xl
                grid-cols-1 gap-10 px-8 py-8
                md:grid-cols-2 xl:grid-cols-4">
                                        {item.columns.map((column) => (
                                            <div key={column.title}>
                                                <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#454545]">
                                                    {column.title}
                                                </h3>

                                                <ul className="space-y-3">
                                                    {column.links.map((link) => (
                                                        <li key={link.name}>
                                                            <Link
                                                                to={link.link}
                                                                className="text-sm text-gray-500 transition-colors hover:text-[#454545]"
                                                            >
                                                                {link.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                        <div className="flex flex-col justify-center rounded-lg bg-gray-50 p-6">
                                <span className="text-xs font-medium uppercase tracking-widest text-gray-500">
                                    ShineShoes
                                </span>
                                            <h3 className="mt-2 text-xl font-semibold text-[#454545]">
                                                Znajdź swój styl
                                            </h3>
                                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                                Poznaj modele, które dopełnią Twoją stylizację.
                                            </p>
                                            <Link
                                                to={item.link}
                                                className="mt-4 w-fit border-b border-[#454545] pb-1 text-sm font-medium text-[#454545] hover:text-black"
                                            >
                                                Odkryj kolekcję
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </nav>
                </div>
            </div>

            <DisclosurePanel className="border-t border-gray-100 bg-white lg:hidden">
                <nav className="space-y-1 px-4 py-3">
                    {shopNavigation.map((item) => (
                        <div key={item.name} className="border-b border-gray-100 last:border-0">
                            <DisclosureButton
                                as={Link}
                                to={item.link}
                                className="flex w-full items-center justify-between
                               rounded-lg px-3 py-3 text-sm font-medium
                               text-[#454545] transition hover:bg-gray-50"
                            >
                                {item.name}
                                <span aria-hidden="true" className="text-gray-400">
                        →
                    </span>
                            </DisclosureButton>

                            <div className="space-y-1 px-3 pb-3">
                                {item.columns.flatMap((column) => column.links).map((link) => (
                                    <DisclosureButton
                                        key={`${item.name}-${link.name}`}
                                        as={Link}
                                        to={link.link}
                                        className="block rounded-md px-3 py-2
                                       text-sm text-gray-500
                                       transition hover:bg-gray-50
                                       hover:text-[#454545]"
                                    >
                                        {link.name}
                                    </DisclosureButton>
                                ))}
                            </div>
                        </div>
                    ))}
                </nav>
            </DisclosurePanel>
        </Disclosure>
    )

}
export default Navbar;