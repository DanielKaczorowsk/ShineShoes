import * as React from "react"
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline'
import {useState} from "react";
import { Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle, CardContent } from "./ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "./ui/carousel"
import { Button } from "./ui/button"
import Autoplay from "embla-carousel-autoplay"
import banner1 from '../assets/banner/Banner_1.png';
import banner2 from '../assets/banner/Banner_2.png';
import banner3 from '../assets/banner/Banner_3.png';
import {namesData, newestData} from "../api/ShopProvider";
const bannerImg = [banner1,banner2,banner3];
const Home = () => {
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )
    const [newProductData, setNewProductData] = useState([]);
    const [newNamesData , setNewNamesData] = useState([]);
    const [favorite, setFavorite] = useState([]);
    React.useEffect(() =>{
        const newProduct = async () => {
            try {
                const newProductData = await newestData();
                setNewProductData(newProductData);
            }catch (e) {
                console.error(e.message);
            }
        };
        newProduct().catch((err) => console.error("Unhandled promise:", err));
    },[])
    React.useEffect(() =>{
        const newNames = async () => {
            try {
                const newNamesData = await namesData();
                setNewNamesData(newNamesData);
            }catch (e) {
                console.error(e.message);
            }
        };
        newNames().catch((err) => console.error("Unhandled promise:", err));
    },[])
    const toggleFavorite = (index) => {
        if (favorite.includes(index)) {
            setFavorite(favorite.filter((i) => i !== index));
        } else {
            setFavorite([...favorite, index]);
        }
    };
    return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen p-4 gap-6">
        <Carousel
            plugins={[plugin.current]}
            className="w-full max-w-300 border-b"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}>
            <CarouselContent>
                {bannerImg.map((imgSrc, index) => (
                    <CarouselItem key={index} className="pl-0">
                        <div className="h-125 w-full p-0">
                            <Card className="h-full w-full overflow-hidden border-none rounded-none ring-0 shadow-none">
                                <CardContent className="relative h-full w-full p-0">
                                    <img
                                        src={imgSrc}
                                        alt={`Banner ${index + 1}`}
                                        className="absolute inset-0 h-full w-full object-cover object-center"
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
        <Carousel className="w-full pb-4 max-w-300 border-b">
            <CarouselContent className="-ml-1">
                {newNamesData.map((product,index) => (
                    <CarouselItem key={index} className="basis-1/2 pl-1 lg:basis-1/5">
                        <div className="p-1">
                            <Card className="border-none shadow-none ring-0">
                                <CardContent className="flex items-center justify-center h-24  p-2">
                                    <span className="text-2xl font-semibold">{product}</span>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
        <h2 className="scroll-m-20 tracking-tight pb-2 text-3xl text-[#454545] first:mt-0">
            Nowosci !
        </h2>
        <Carousel className="w-full pb-4 max-w-300 border-b">
            <CarouselContent className="-ml-1">
                {newProductData.map((product) => (
                    <CarouselItem key={product.id} className="basis-1/2 pl-1 lg:basis-1/5">
                        <div className="p-1">
                            <Card className="relative mx-auto w-full max-w-sm pt-0">
                                <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
                                <img
                                    src="https://avatar.vercel.sh/shadcn1"
                                    alt="Event cover"
                                    className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
                                />
                                <CardHeader>

                                    <CardTitle>{product.name} {product.model}</CardTitle>
                                    <CardDescription>
                                        cena: {product.price} PLN
                                    </CardDescription>
                                    <CardAction className="p-3">
                                        <>
                                            {favorite.includes(product.id) ? (
                                                <HeartSolid
                                                    className="w-7 h-7 text-pink-300 cursor-pointer transition hover:scale-110"
                                                    onClick={() => toggleFavorite(product.id)}
                                                />
                                            ) : (
                                                <HeartOutline
                                                    className="w-7 h-7 text-gray-400 cursor-pointer transition hover:text-pink-300 hover:scale-110"
                                                    onClick={() => toggleFavorite(product.id)}
                                                />
                                            )}
                                        </>
                                    </CardAction>
                                </CardHeader>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious/>
            <CarouselNext/>
            <div className="flex justify-center pt-6">
                <Button className="px-6 py-3 text-lg rounded-lg text-[#454545] border  bg-white border-[#454545] hover:text-white hover:bg-[#454545] transition">
                    Zobacz Więcej
                </Button>
            </div>
        </Carousel>
        <h2 className="scroll-m-20 tracking-tight pb-2 text-3xl text-[#454545] first:mt-0">
            Najlepsze nasze produkty
        </h2>
        <Carousel className="w-full pb-4 max-w-300 border-b">
            <CarouselContent className="-ml-1">
                {newProductData.map((product) => (
                    <CarouselItem key={product.id} className="basis-1/2 pl-1 lg:basis-1/5">
                        <div className="p-1">
                            <Card className="relative mx-auto w-full max-w-sm pt-0">
                                <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
                                <img
                                    src="https://avatar.vercel.sh/shadcn1"
                                    alt="Event cover"
                                    className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
                                />
                                <CardHeader>

                                    <CardTitle>{product.name} {product.model}</CardTitle>
                                    <CardDescription>
                                        cena: {product.price} PLN
                                    </CardDescription>
                                    <CardAction className="p-3">
                                        <>
                                            {favorite.includes(product.id) ? (
                                                <HeartSolid
                                                    className="w-7 h-7 text-pink-300 cursor-pointer transition hover:scale-110"
                                                    onClick={() => toggleFavorite(product.id)}
                                                />
                                            ) : (
                                                <HeartOutline
                                                    className="w-7 h-7 text-gray-400 cursor-pointer transition hover:text-pink-300 hover:scale-110"
                                                    onClick={() => toggleFavorite(product.id)}
                                                />
                                            )}
                                        </>
                                    </CardAction>
                                </CardHeader>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious/>
            <CarouselNext/>
            <div className="flex justify-center pt-6">
                <Button className="px-6 py-3 text-lg rounded-lg text-[#454545] border  bg-white border-[#454545] hover:text-white hover:bg-[#454545] transition">
                    Zobacz Więcej
                </Button>
            </div>
        </Carousel>
        <Carousel className="w-full pb-4 max-w-300 border-b">
            <CarouselContent className="-ml-1">
                {newProductData.map((product) => (
                    <CarouselItem key={product.id} className="basis-1/2 pl-1 lg:basis-1/5">
                        <div className="p-1">
                            <Card className="relative mx-auto w-full max-w-sm pt-0">
                                <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
                                <img
                                    src="https://avatar.vercel.sh/shadcn1"
                                    alt="product.name"
                                    className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
                                />
                                <CardHeader>

                                    <CardTitle>{product.name} {product.model}</CardTitle>
                                    <CardDescription>
                                        cena: {product.price} PLN
                                    </CardDescription>
                                    <CardAction className="p-3">
                                        <>
                                            {favorite.includes(product.id) ? (
                                                <HeartSolid
                                                    className="w-7 h-7 text-pink-300 cursor-pointer transition hover:scale-110"
                                                    onClick={() => toggleFavorite(product.id)}
                                                />
                                            ) : (
                                                <HeartOutline
                                                    className="w-7 h-7 text-gray-400 cursor-pointer transition hover:text-pink-300 hover:scale-110"
                                                    onClick={() => toggleFavorite(product.id)}
                                                />
                                            )}
                                        </>
                                    </CardAction>
                                </CardHeader>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious/>
            <CarouselNext/>
            <div className="flex justify-center pt-6">
                <Button className="px-6 py-3 text-lg rounded-lg text-[#454545] border  bg-white border-[#454545] hover:text-white hover:bg-[#454545] transition">
                    Zobacz Więcej
                </Button>
            </div>
        </Carousel>
    </div>
    )
}

export default Home