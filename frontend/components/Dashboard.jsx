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

const Dashboard = () => {

    const navigate = useNavigate();
    const {items:newProductData,newProductLoading,newProductRefresh} = useGetDataProvider(newestData);

    return (
        <div className="min-h-full pt-3">
        <header className="relative bg-white shadow-sm">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Your Profile</h1>
            </div>
        </header>
            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8"><Table>
                    <TableCaption className="text-right"><Link to="/add/product" className="font-semibold text-gray-500 hover:text-gray-600">
                        Dodaj Produkt
                    </Link></TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-25">Id</TableHead>
                            <TableHead>Nazwa Model</TableHead>
                            <TableHead>Opis</TableHead>
                            <TableHead className="text-right">Cena</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {newProductData.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell className="font-medium">{product.id}</TableCell>
                                <TableCell>{product.name} {product.model}</TableCell>
                                <TableCell>{product.description}</TableCell>
                                <TableCell className="text-right">{product.price}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table></div>
                <Pagination className="mt-4 cursor-pointer">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationLink href="#" isActive>1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">
                                2
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </main>
        </div>
    );
};

export default Dashboard;