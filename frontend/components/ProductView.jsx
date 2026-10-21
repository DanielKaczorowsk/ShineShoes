import React, { useState } from 'react';
import { Image } from "@unpic/react";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import {favoritesProduct} from "../api/ShopProvider";
import { Button } from "./ui/button"
import {useGetDataProvider} from "../api/GetProviderData";
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline'
import { Card,
    CardDescription,
    CardHeader,
    CardTitle } from "./ui/card"
import {useAuth} from "../context/AuthContext";
const ProductView = () => {
    const {items:products,newProductLoading,newProductRefresh} = useGetDataProvider(favoritesProduct);
    const [favorite , setFavorite] = useState([]);
    const { isLoggedIn } = useAuth();
    const toggleFavorite = (index) => {
        if (favorite.includes(index)) {
            setFavorite(favorite.filter((i) => i !== index));
        } else {
            setFavorite([...favorite, index]);
        }
    };
    return (
                <div className="w-full border-b max-w-7xl mx-auto pb-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {isLoggedIn &&(
                            <>
                                {products.map((product) => (
                                    <div
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
                                                        onClick={() => toggleFavorite(product.id)}
                                                        aria-label="Dodaj do ulubionych"
                                                        className="absolute top-2 right-2 flex items-center justify-center w-9 h-9 rounded-full bg-white/70 backdrop-blur-sm shadow transition-colors z-10"
                                                    >
                                                        {product.favorite ? (
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
                                    </div>
                                ))}
                            </>
                        )}

                        </div>
                </div>
    );
};

export default ProductView;