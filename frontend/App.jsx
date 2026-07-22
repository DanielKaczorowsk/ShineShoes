import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, Outlet } from 'react-router-dom';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon,ShoppingCartIcon, XMarkIcon,UserIcon,HeartIcon } from '@heroicons/react/24/outline'
import LoginForm from './components/LoginForm';
import RegisterForm from "./components/RegisterForm";
import logo from './assets/LogoShineShoes.png';
import Dashboard from "./components/Dashboard";
import FormProduct from "./components/FormProduct";
import Home from "./components/Home";
import ProductView from "./components/ProductView";
import { addBasket } from "./api/ShopProvider";
import {useGetDataProvider} from "./api/GetProviderData";
import {useSetDataProvider} from "./api/SetDataProvider";

const ProtectedRoute = ({ isLoggedIn }) => {
    if (!isLoggedIn) return <Navigate to="/login" replace />;
    return <Outlet />;
}
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
const navigation = [
  { name: 'Przyklad', link: '#'},
  { name: 'Przyklad2', link: '#'},
  { name: 'Przyklad3', link: '#'},
]
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
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
    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    return (
        <Router>
            <Disclosure as="nav" className="relative top-5 bg-white border-b p-4">
                  <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                      <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button*/}
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
                          <span className="absolute -inset-0.5" />
                          <span className="sr-only">Open main menu</span>
                          <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                          <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                        </DisclosureButton>
                      </div>
                      <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex shrink-0 items-center">
                          <Link to="/"><img
                            alt="ShineShoes"
                            src={logo}
                            className="h-52 w-auto"
                          /></Link>
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                          <div className="flex space-x-4">

                          </div>
                        </div>
                      </div>

                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
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
                                  className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-lg bg-white shadow-2xl  transition focus:outline-none data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
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
                            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg outline outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
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

                  <DisclosurePanel className="sm:hidden">
                    <div className="space-y-1 px-2 pt-2 pb-3">
                      {navigation.map((item) => (
                        <DisclosureButton
                          key={item.name}
                          as="a"
                          href={item.link}
                          className={classNames(
                    'text-gray-300 hover:bg-white/5 hover:text-white',
                            'block rounded-md px-3 py-2 text-base font-medium',
                          )}
                        >
                          {item.name}
                        </DisclosureButton>
                      ))}
                    </div>
                  </DisclosurePanel>
                </Disclosure>
            <div style={{ padding: "20px" }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginForm onLoginSuccess={setIsLoggedIn} />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/add/product" element={<FormProduct />} />
                    <Route path="/product" element={<ProductView />} />
                    <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Route>
                    <Route path="*" element={<h2>Strona nie istnieje (404)</h2>} />
                </Routes>
            </div>
            </Router>
    );
}

export default App;