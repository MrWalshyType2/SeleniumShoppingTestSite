import React, { useContext } from "react";
import { Outlet, useParams } from "react-router-dom";
import { BasketContext, UserContext } from "../AppRouter";
import ProductCard from "../components/products/ProductCard";
import { getProductById } from "../utils/products";
import { getUserOrders } from "../utils/user_orders";

export default function MyAccountPage(props) {
    const params = useParams();
    const basket = useContext(BasketContext);
    const user = useContext(UserContext);

    const renderOrderItem = (order, orderNumber) => {
        const productCards = [];
        console.log(order)
        for (const productId in order) {
            console.log(productId)
            const productCount = order[productId];
            productCards.push(
                // <ProductCard key={productId + productCount + user.username} data={getProductById(productId)} count={productCount} />
                <ProductCard key={productId + user.username + orderNumber} data={getProductById(productId)} count={productCount} />
            );
        }
        return productCards;
    };
    
    const renderUserOrders = () => {
        const orders = getUserOrders(user.username);
        const orderProducts = orders.map(order => order.products);
        console.log(orders);
        return orderProducts.map((order, orderNumber) => <div className="row" key={orderNumber + 1}>
            <h3 className="ml-16"><u>Order {orderNumber + 1}</u></h3>
            {/* {order.map(productId => (<ProductCard key={productId + user.username + orderNumber} data={getProductById(productId)}/>))} */}
            {renderOrderItem(order, orderNumber)}
        </div>);
    }

    const renderBasketItems = () => {
        const productCards = [];

        for (const productId in basket.products) {
            const productCount = basket.products[productId];
            productCards.push(
                <ProductCard key={productId + user.username + productCount} data={getProductById(productId)} deleteFromBasket={basket.removeById} count={productCount} />
            );
        }
        return productCards;
    };

    return (
        <>
            <header className="header">
                <h1 className="title">My Account</h1>
                <p>Manage your account here!</p>
            </header>
            <main className="w-80 w-sm-90 mx-auto">
                <Outlet />
                {!params.data && <>
                    <section>
                        <h2>Your previous orders...</h2>
                        {renderUserOrders()}
                    </section>
                    <section>
                        <div className="row">
                            <header className="col-12">
                                <h2>Currently in your basket</h2>
                                {basket.products.length === 0 && <p>So empty...</p>}
                            </header>
                        </div>
                        <div className="row" id="basket">
                            {renderBasketItems()}
                        </div>
                    </section>
                </>}
            </main>
        </>
    );
}