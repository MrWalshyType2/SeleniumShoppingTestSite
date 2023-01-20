import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/products/ProductCard";
import { getProductsByType } from "../utils/products";

export default function ProductPage({ addToBasket }) {

    const params = useParams();
    const products = getProductsByType(params.productType);

    return (
        <>
            <header className="header">
                <h1 className="title">Fake Gadgets Store - {params.productType}</h1>
                <p>Welcome to Fake Gadgets Direct, the worlds leading fake supplier of electronic gadgets!</p>
            </header>
            <main className="w-80 w-sm-90 mx-auto">
                <div className="row">
                    {products.map(product => <ProductCard key={product.id} data={product} addToBasket={addToBasket} />)}
                </div>
            </main>
        </>
    )
}