import React from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { BasketContext } from "../AppRouter";
import ProductCard from "../components/products/ProductCard";
import { getProductsByType } from "../utils/products";

export default function HomePage() {

    const basket = useContext(BasketContext);

    return (
        <>
            <header className="header">
                <h1 className="title">Fake Gadgets Store</h1>
                <p>Welcome to Fake Gadgets Direct, the worlds leading fake supplier of electronic gadgets!</p>
            </header>
            <main className="w-80 w-sm-90 mx-auto">
                <div className="row">
                    <h2 className="col-12 pl-16">Buy a brand new Telephone</h2>
                    {getProductsByType("phones").slice(0, 6).map(product => <ProductCard key={product.id} data={product} addToBasket={basket.addItem} />)}
                </div>
                <div className="row">
                    <h2 className="col-12 pl-16">Buy a brand new Tablet</h2>
                    {getProductsByType("tablets").slice(0, 6).map(product => <ProductCard key={product.id} data={product} addToBasket={basket.addItem} />)}
                </div>
                <div className="row">
                    <h2 className="col-12 pl-16">Buy a brand new Laptop</h2>
                    {getProductsByType("laptops").slice(0, 6).map(product => <ProductCard key={product.id} data={product} addToBasket={basket.addItem} />)}
                </div>
            </main>
        </>
    )
}
