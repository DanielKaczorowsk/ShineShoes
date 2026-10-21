import * as React from "react"
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline'
import {useEffect, useState} from "react";
import { Card,
    CardDescription,
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
import banner1 from "../assets/banner/Banner_1.png?w=1920;1280;640&format=webp&as=srcset";
import banner2 from '../assets/banner/Banner_2.png?w=1920;1280;640&format=webp&as=srcset';
import banner3 from '../assets/banner/Banner_3.png?w=1920;1280;640&format=webp&as=srcset';
import {favoriteProduct, namesData, newestData, favoriteDelete} from "../api/ShopProvider";
import { useGetDataProvider } from "../api/GetProviderData";
import { Image } from "@unpic/react";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import {useAuth} from "../context/AuthContext";

const bannerImg = [banner1,banner2,banner3];
const Home = () => {
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )

    const {items:newProductData,isLoading:productLoading,refresh:newestProductRefresh} = useGetDataProvider(newestData);
    const {items:newNamesData,isLoading:productModelsLoading,refresh:modelRefresh} = useGetDataProvider(namesData);
    const { handleLogout,isLoggedIn } = useAuth();
    /*const useFavorite =
    {
        LOCAL: (index) =>
        {
            const isCurrentlyFavorite = !!localStorage.getItem('Favorites')
            if(!isCurrentlyFavorite)
            {
                localStorage.setItem('Favorites',index);
            }
            else
            {
                localStorage.removeItem('Favorites',index);
            }
        },
        DATABASE: async(index,favoriteBoolean,refresh) =>
        {
            if (favoriteBoolean)
            {
                try
                {
                    await favoriteDelete(index);
                }
                catch (error)
                {
                    console.log("Blad z usunieciem produktu",error);
                    return;
                }
            }
            else
            {
                try
                {
                    await favoriteProduct(index);
                }
                catch (error)
                {
                    console.log("Blad w dodawaniu przedmiotu do ulubionych",error);
                    return;
                }
            }
            try
            {
                await refresh();
            }
            catch(error)
            {
                console.log("Blad z odswiezaniem listy",error);
            }
        }
    }*/
    const [isFavorite , setFavorite] = useState([]);
    const toggleFavorite = async (index,favoriteBoolean,refresh) =>
    {
        if(!isLoggedIn)
        {
            const isCurrentlyFavorite = isFavorite.includes(index);
            if(isCurrentlyFavorite)
            {
                setFavorite(isFavorite.filter((i) => i !== index));
                return;
            }
            else
            {
                setFavorite([...isFavorite, index]);
                return;
            }
        }
        else if (favoriteBoolean)
        {
            try
            {
                await favoriteDelete(index);
            }
            catch (error)
            {
                console.log("Blad z usunieciem produktu",error);
                return;
            }
        }
        else
        {
            setFavorite([...isFavorite, index]);
            try
            {
                await favoriteProduct(index);
            }
            catch (error)
            {
                console.log("Blad w dodawaniu przedmiotu do ulubionych",error);
                return;
            }
        }
        try
        {
            await refresh();
        }
        catch(error)
        {
            console.log("Blad z odswiezaniem listy",error);
        }
    };
    return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen p-4 gap-6">
        <Carousel
            plugins={[plugin.current]}
            className="w-full max-w-7xl mx-auto overflow-hidden rounded-2xl"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}>
            <CarouselContent>
                {bannerImg.map((imgSrc, index) => (
                    <CarouselItem key={index} className="pl-0">
                        <div className="relative aspect-21/9 w-full overflow-hidden bg-gray-100">
                            <img
                                src={imgSrc}
                                srcSet={imgSrc}
                                sizes="100vw"
                                alt={`Banner ${index + 1}`}
                                loading={index === 0 ? "eager" : "lazy"}
                                fetchPriority={index === 0 ? "high" : "auto"}
                                className="h-full w-full object-cover"
                            />
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
        <div className="w-full border-b max-w-7xl mx-auto pb-6">
            <Carousel className="w-full">
                <CarouselContent className="-ml-2 md:-ml-4">
                    {newProductData.map((product) => {
                        const liked = !isLoggedIn ? isFavorite.includes(product.id) : product.favorite;
                        return(
                            <CarouselItem
                                key={product.id}
                                className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                            >
                                <div className="p-1 h-full">
                                    <Card className="relative flex flex-col w-full shadow-md border-0 bg-white py-0 ring-0 gap-0">

                                        <div className="relative shrink-0 w-full overflow-hidden rounded-t-xl">
                                            <AspectRatio ratio={1} className="w-full bg-muted">
                                                <Image
                                                    src="https://static.nike.com/a/images/t_web_pdp_936_v2/f_auto,u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/b7d9211c-26e7-431a-ac24-b0540fb3c00f/AIR+FORCE+1+%2707.png"
                                                    alt={`${product.name} ${product.model}`}
                                                    layout="fullWidth"
                                                    className="object-cover"
                                                />
                                            </AspectRatio>

                                            <button
                                                type="button"
                                                onClick={() => toggleFavorite(product.id,product.favorite,newestProductRefresh)}
                                                aria-label="Dodaj do ulubionych"
                                                className="absolute top-2 right-2 flex items-center justify-center w-9 h-9 rounded-full bg-white/70 backdrop-blur-sm shadow transition-colors z-10"
                                            >
                                                {liked ? (
                                                    <HeartSolid className="w-5 h-5 text-pink-500 transition hover:scale-110" />
                                                ) : (
                                                    <HeartOutline className="w-5 h-5 text-gray-500 transition hover:text-pink-500 hover:scale-110" />
                                                )}
                                            </button>
                                        </div>

                                        <CardHeader className="flex flex-col justify-between flex-1 p-4">
                                            <CardTitle
                                                className="text-gray-900 line-clamp-2 leading-snug"
                                                title={`${product.name} ${product.model}`}
                                            >
                                                {product.name} {product.model}
                                            </CardTitle>
                                            <CardDescription>
                                                <div className="text-gray-900 mt-2 shrink-0">
                                                    {product.price} PLN
                                                </div>
                                            </CardDescription>
                                        </CardHeader>
                                    </Card>
                                </div>
                            </CarouselItem>
                        )})}
                </CarouselContent>

                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

            <div className="flex justify-center pt-6">
                <Button className="px-6 py-3 text-lg rounded-lg text-[#454545] bg-white hover:text-white hover:bg-[#454545] shadow transition">
                    Zobacz Więcej
                </Button>
            </div>
        </div>
        <h2 className="scroll-m-20 tracking-tight pb-2 text-3xl text-[#454545] first:mt-0">
            Najlepsze nasze produkty
        </h2>
        <div className="w-full border-b max-w-7xl mx-auto pb-6">
            <Carousel className="w-full">
                <CarouselContent className="-ml-2 md:-ml-4">
                    {newProductData.map((product) => {
                        const liked = !isLoggedIn ? isFavorite.includes(product.id) : product.favorite;
                        return(
                            <CarouselItem
                                key={product.id}
                                className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                            >
                                <div className="p-1 h-full">
                                    <Card className="relative flex flex-col w-full shadow-md border-0 bg-white py-0 ring-0 gap-0">

                                        <div className="relative shrink-0 w-full overflow-hidden rounded-t-xl">
                                            <AspectRatio ratio={1} className="w-full bg-muted">
                                                <Image
                                                    src="https://static.nike.com/a/images/t_web_pdp_936_v2/f_auto,u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/b7d9211c-26e7-431a-ac24-b0540fb3c00f/AIR+FORCE+1+%2707.png"
                                                    alt={`${product.name} ${product.model}`}
                                                    layout="fullWidth"
                                                    className="object-cover"
                                                />
                                            </AspectRatio>

                                            <button
                                                type="button"
                                                onClick={() => toggleFavorite(product.id,product.favorite,newestProductRefresh)}
                                                aria-label="Dodaj do ulubionych"
                                                className="absolute top-2 right-2 flex items-center justify-center w-9 h-9 rounded-full bg-white/70 backdrop-blur-sm shadow transition-colors z-10"
                                            >
                                                {liked ? (
                                                    <HeartSolid className="w-5 h-5 text-pink-500 transition hover:scale-110" />
                                                ) : (
                                                    <HeartOutline className="w-5 h-5 text-gray-500 transition hover:text-pink-500 hover:scale-110" />
                                                )}
                                            </button>
                                        </div>

                                        <CardHeader className="flex flex-col justify-between flex-1 p-4">
                                            <CardTitle
                                                className="text-gray-900 line-clamp-2 leading-snug"
                                                title={`${product.name} ${product.model}`}
                                            >
                                                {product.name} {product.model}
                                            </CardTitle>
                                            <CardDescription>
                                                <div className="text-gray-900 mt-2 shrink-0">
                                                    {product.price} PLN
                                                </div>
                                            </CardDescription>
                                        </CardHeader>
                                    </Card>
                                </div>
                            </CarouselItem>
                        )})}
                </CarouselContent>

                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

            <div className="flex justify-center pt-6">
                <Button className="px-6 py-3 text-lg rounded-lg text-[#454545] bg-white hover:text-white hover:bg-[#454545] shadow transition">
                    Zobacz Więcej
                </Button>
            </div>
        </div>
        <div className="w-full border-b max-w-7xl mx-auto pb-6">
                <Carousel className="w-full">
                    <CarouselContent className="-ml-2 md:-ml-4">
                        {newProductData.map((product) => {
                            const liked = !isLoggedIn ? isFavorite.includes(product.id) : product.favorite;
                            return(
                            <CarouselItem
                                key={product.id}
                                className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                            >
                                <div className="p-1 h-full">
                                    <Card className="relative flex flex-col w-full shadow-md border-0 bg-white py-0 ring-0 gap-0">

                                        <div className="relative shrink-0 w-full overflow-hidden rounded-t-xl">
                                            <AspectRatio ratio={1} className="w-full bg-muted">
                                                <Image
                                                    src="https://static.nike.com/a/images/t_web_pdp_936_v2/f_auto,u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/b7d9211c-26e7-431a-ac24-b0540fb3c00f/AIR+FORCE+1+%2707.png"
                                                    alt={`${product.name} ${product.model}`}
                                                    layout="fullWidth"
                                                    className="object-cover"
                                                />
                                            </AspectRatio>

                                            <button
                                                type="button"
                                                onClick={() => toggleFavorite(product.id,product.favorite,newestProductRefresh)}
                                                aria-label="Dodaj do ulubionych"
                                                className="absolute top-2 right-2 flex items-center justify-center w-9 h-9 rounded-full bg-white/70 backdrop-blur-sm shadow transition-colors z-10"
                                            >
                                                {liked ? (
                                                    <HeartSolid className="w-5 h-5 text-pink-500 transition hover:scale-110" />
                                                ) : (
                                                    <HeartOutline className="w-5 h-5 text-gray-500 transition hover:text-pink-500 hover:scale-110" />
                                                )}
                                            </button>
                                        </div>

                                        <CardHeader className="flex flex-col justify-between flex-1 p-4">
                                            <CardTitle
                                                className="text-gray-900 line-clamp-2 leading-snug"
                                                title={`${product.name} ${product.model}`}
                                            >
                                                {product.name} {product.model}
                                            </CardTitle>
                                            <CardDescription>
                                                <div className="text-gray-900 mt-2 shrink-0">
                                                    {product.price} PLN
                                                </div>
                                            </CardDescription>
                                        </CardHeader>
                                    </Card>
                                </div>
                            </CarouselItem>
                        )})}
                    </CarouselContent>

                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>

            <div className="flex justify-center pt-6">
                <Button className="px-6 py-3 text-lg rounded-lg text-[#454545] bg-white hover:text-white hover:bg-[#454545] shadow transition">
                    Zobacz Więcej
                </Button>
            </div>
        </div>
    </div>
    )
}

export default Home