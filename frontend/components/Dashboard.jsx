import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Table,TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "./ui/table";
import {newestData} from "../api/ShopProvider";
import {
    Pagination,
    PaginationContent, PaginationEllipsis,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "./ui/pagination";
import {useGetDataProvider} from "../api/GetProviderData";
import {productDelete} from "../api/ProductProvider";

const Dashboard = () => {

    const navigate = useNavigate();
    const {items:newProductData,isLoading:newProductLoading,refresh:newProductRefresh} = useGetDataProvider(newestData);
    const deleteProvider = async(e,id)=>
    {
        e.preventDefault();
        try
        {
            await productDelete(id);
            await newProductRefresh();
        }
        catch(error)
        {
            console.log(error);
        }

    }
    return (
        <div className="min-h-full bg-gray-50 pt-3">
            <header className="border-b bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Products
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Zarządzaj produktami w swoim sklepie
                    </p>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

                <div className="mb-4 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            Lista produktów
                        </h2>
                        <p className="text-sm text-gray-500">
                            Wszystkie produkty znajdujące się w sklepie
                        </p>
                    </div>

                    <Link
                        to="/add/product"
                        className="rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white
                                   shadow-sm transition hover:bg-gray-700
                                   focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                    >
                        + Dodaj produkt
                    </Link>
                </div>

                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                    <Table>
                        <TableHeader className="bg-gray-50">
                            <TableRow>
                                <TableHead className="w-20 pl-6">
                                    ID
                                </TableHead>

                                <TableHead>
                                    Nazwa / model
                                </TableHead>

                                <TableHead>
                                    Opis
                                </TableHead>

                                <TableHead className="text-right">
                                    Cena
                                </TableHead>

                                <TableHead className="w-28 pr-6 text-right">
                                    Akcje
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {newProductData.map((product) => (
                                <TableRow
                                    key={product.id}
                                    className="transition-colors hover:bg-gray-50"
                                >
                                    <TableCell className="pl-6 font-medium text-gray-500">
                                        #{product.id}
                                    </TableCell>

                                    <TableCell className="font-semibold text-gray-900">
                                        {product.name} {product.model}
                                    </TableCell>

                                    <TableCell className="max-w-md truncate text-gray-500">
                                        {product.description}
                                    </TableCell>

                                    <TableCell className="text-right font-medium text-gray-900">
                                        {product.price} zł
                                    </TableCell>

                                    <TableCell className="pr-6">
                                        <div className="flex justify-end gap-2">

                                            <button
                                                type="button"
                                                className="inline-flex h-8 w-8 items-center justify-center
                                                           rounded-md border border-gray-200
                                                           bg-white text-gray-500
                                                           transition hover:border-gray-300
                                                           hover:bg-gray-50 hover:text-gray-900"
                                                title="Edytuj produkt"
                                            >
                                                ✎
                                            </button>

                                            <button onClick={(e) => deleteProvider(e,product.id)}
                                                type="button"
                                                className="inline-flex h-8 w-8 items-center justify-center
                                                           rounded-md border border-red-100
                                                           bg-white text-red-500
                                                           transition hover:border-red-200
                                                           hover:bg-red-50 hover:text-red-600"
                                                title="Usuń produkt"
                                            >
                                                ×
                                            </button>

                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                <Pagination className="mt-6">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationLink href="#">
                                ←
                            </PaginationLink>
                        </PaginationItem>

                        <PaginationItem>
                            <PaginationLink href="#" isActive>
                                1
                            </PaginationLink>
                        </PaginationItem>

                        <PaginationItem>
                            <PaginationLink href="#">
                                2
                            </PaginationLink>
                        </PaginationItem>

                        <PaginationItem>
                            <PaginationLink href="#">
                                3
                            </PaginationLink>
                        </PaginationItem>

                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>

                        <PaginationItem>
                            <PaginationLink href="#">
                                →
                            </PaginationLink>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>

            </main>
        </div>

    );
};

export default Dashboard;