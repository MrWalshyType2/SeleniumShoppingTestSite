import React, { useContext } from "react";
import { useState } from "react";
import { SlClose } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { BasketContext, UserContext } from "../../AppRouter";
import getProducts, { getProductById } from "../../utils/products";
import { createOrder } from "../../utils/user_orders";
import ProductCard from "../products/ProductCard";

export default function Basket(props) {
    const basket = useContext(BasketContext);

    const [checkoutOpen, setCheckoutOpen] = useState(false);
    const toggleCheckout = event => setCheckoutOpen(prev => !prev);

    return (
        <>
            {!checkoutOpen && <BasketEditor basket={basket} toggleCheckout={toggleCheckout} />}
            {checkoutOpen && <CheckoutForm basket={basket} toggleCheckout={toggleCheckout} />}
        </>
    );
}

export function CheckoutForm({ basket, toggleCheckout }) {
    const user = useContext(UserContext);
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({});
    
    const handleUserDetailsChange = event => setUserDetails(prev => Object.assign({}, userDetails, { [event.target.name]: event.target.value }));
    const getOrderCost = () => {
        let cost = 0;
        for (const productId in basket.products) {
            const product = getProductById(productId);
            cost += (product.cost * basket.products[productId]); // cost * quantity
        }
        return cost;
    }
    const renderOrderCost = () => (<p>Total (incl. VAT): £{getOrderCost()}</p>);

    const handleCheckout = event => {
        event.preventDefault();
        if (validateDetails()) {
            createOrder({
                products: basket.products,
                username: user.username
            });
            basket.resetBasket()
            navigate("/account");
        }
    };

    const validateDetails = () => true;

    return (
        <section>
            <div className="row">
                <div className="col-10">
                    <h2 className="m-16 ml-0">Checkout your basket</h2>
                    {renderOrderCost()}
                </div>
                <div className="col-2">
                    <button className="btn bg-light fg-dark h-100 mt-16 ml-auto d-block" onClick={toggleCheckout}><SlClose /></button>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <form onSubmit={handleCheckout}>
                        <fieldset className="p-16">
                            <legend>Personal details</legend>
                            <div className="form-group">
                                <label htmlFor="forename">Forename:</label>
                                <input type="text" name="forename" id="forename" required onChange={handleUserDetailsChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="surname">Surname:</label>
                                <input type="text" name="surname" id="surname" required onChange={handleUserDetailsChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="date-of-birth">Date of Birth:</label>
                                <input type="date" name="date-of-birth" id="date-of-birth" required onChange={handleUserDetailsChange} />
                            </div>
                        </fieldset>
                        <fieldset className="p-16">
                            <legend>Payment details</legend>
                            <div className="form-group">
                                <label htmlFor="long-card-no">Card number:</label>
                                <input type="number" name="long-card-no" id="long-card-no" required onChange={handleUserDetailsChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cc-no">CC:</label>
                                <input type="text" name="cc-no" id="cc-no" required onChange={handleUserDetailsChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="expiry-date">Expiry date:</label>
                                <input type="month" name="expiry-date" id="expiry-date" required onChange={handleUserDetailsChange} />
                            </div>
                        </fieldset>
                        <div className="btn-form-group pt-16">
                            <button type="submit" className="btn bg-danger fg-light d-block ml-auto w-20 w-md-40 w-sm-100">Purchase</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export function BasketEditor({ basket, toggleCheckout }) {
    console.log(basket);

    const renderBasketItems = () => {
        // basket.products.map(productId => <ProductCard key={productId} data={getProductById(productId)} deleteFromBasket={basket.removeById} />)
        const productCards = [];

        for (const productId in basket.products) {
            const productCount = basket.products[productId];
            productCards.push(
                <ProductCard key={productId + productCount} data={getProductById(productId)} deleteFromBasket={basket.removeById} count={productCount} />
            );
        }
        return productCards;
    };

    return (
        <section>
            <div className="row"><header>
                <h2>Edit your basket</h2>
                {basket.products.length === 0 && <p>So empty...</p>}
            </header>
                <div className="col-12 p-8">
                    {Object.keys(basket.products).length !== 0 ?
                        <button className="btn bg-warning fg-dark w-100" onClick={toggleCheckout}>Checkout</button>
                        :
                        <p>So empty... Have you tried looking at our phones?</p>
                    }
                </div>
            </div>
            <div className="row" id="basket">
                {renderBasketItems()}
            </div>
        </section>
    );
}