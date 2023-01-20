import React, { createContext, useCallback, useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import { SecuredRoute } from "./components/nav";
import MyAccountPage from "./pages/MyAccountPage";
import AccountData from "./components/account/AccountData";
import products from "./utils/products.json";
import userSampleData from "./utils/users.json";
import AuthPage from "./pages/AuthPage";
import ProductPage from "./pages/ProductPage";

export const UserContext = createContext();
export const ProductContext = createContext();
export const BasketContext = createContext();

export default function AppRouter() {
    // setup data and login state, emulating real functionality with local storage
    let userData = localStorage.getItem("users_x101");
    if (!userData) localStorage.setItem("users_x101", JSON.stringify(userSampleData));
    userData = JSON.parse(localStorage.getItem("users_x101"));
    
    let loggedInUser = localStorage.getItem("logged_in_user");
    if (loggedInUser) loggedInUser = JSON.parse(loggedInUser);
    let basketData = JSON.parse(localStorage.getItem("basket_x101")) || { products: {} };
    basketData.removeById = removeFromBasket;
    basketData.addItem = addItemToBasket;

    const [userAccounts, setUserAccounts] = useState(userData);
    const [user, setUser] = useState(loggedInUser);
    const [basket, setBasket] = useState(Object.assign(basketData, {
        removeById: removeFromBasket,
        addItem: addItemToBasket,
        resetBasket: resetBasket
    }));

    const registerAccount = newUser => {
        if (!newUser || !newUser.username || !newUser.password) return false;
        setUserAccounts(accounts => {
            const newAccounts = [...accounts, newUser];
            localStorage.setItem("users_x101", JSON.stringify(newAccounts));
            return newAccounts;
        });
        return true;
    }

    const login = userDetails => {
        const userAccount = userAccounts.find(acc => acc.username === userDetails.username);
        if (!userAccount || userAccount.password !== userDetails.password) {
            setUser(null);
            return false;
        }
        localStorage.setItem("logged_in_user", JSON.stringify(userDetails));
        localStorage.setItem("basket_x101", JSON.stringify(basket));
        setUser(userAccount);
        return true;
    };

    const logout = () => {
        localStorage.removeItem("logged_in_user");
        localStorage.removeItem("basket_x101");
        setUser(null);
        setBasket({ 
            products: [],
            removeById: removeFromBasket,
            addItem: addItemToBasket,
            resetBasket: resetBasket
        });
    };

    function addItemToBasket(productId) { 
        setBasket(previousBasket => {
            let newBasket = {};
            if (previousBasket.products[productId]) {
                const prods = Object.assign({}, previousBasket.products);
                prods[productId] += 1;
                newBasket.products = prods;
            } else {
                const prods = Object.assign({}, previousBasket.products);
                prods[productId] = 1;
                newBasket.products = prods;
            }

            localStorage.setItem("basket_x101", JSON.stringify(newBasket));
            newBasket.removeById = removeFromBasket;
            newBasket.addItem = addItemToBasket;
            newBasket.resetBasket = resetBasket;
            return newBasket;
        });
    }

    function removeFromBasket(productId) { 
        console.log(productId);
        setBasket(previousBasket => {
            const newBasket = {};
            const productInOrderCount = previousBasket.products[productId];
            if (productInOrderCount) {
                const prods = Object.assign({}, previousBasket.products);
                if (productInOrderCount === 1) delete prods[productId];
                else prods[productId] -= 1;
                newBasket.products = prods;
            } else {
                const prods = Object.assign({}, previousBasket.products);
                newBasket.products = prods;
            }

            console.log("Old: " + JSON.stringify(previousBasket, null, "  "))
            console.log("New: " + JSON.stringify(newBasket, null, "  "))
            // console.log(previousBasket.products.filter(product => product !== productId))
            localStorage.setItem("basket_x101", JSON.stringify(newBasket));
            newBasket.removeById = removeFromBasket;
            newBasket.addItem = addItemToBasket;
            newBasket.resetBasket = resetBasket;
            return newBasket;
        });
    }

    function resetBasket() {
        setBasket(prev => {
            const newBasket = { products: {} };
            newBasket.removeById = removeFromBasket;
            newBasket.addItem = addItemToBasket;
            newBasket.resetBasket = resetBasket;
            return newBasket;
        });
    }

    return (
        <UserContext.Provider value={user}>
            <ProductContext.Provider value={products}>
                <BasketContext.Provider value={basket}>
                    <HashRouter>
                        <Routes>
                            <Route path="/" element={<App logout={logout} />}>
                                <Route index element={<HomePage />} />
                                <Route path="/products/:productType" element={<ProductPage addToBasket={addItemToBasket} />} />
                                <Route path="/account" element={
                                    <SecuredRoute user={user}><MyAccountPage /></SecuredRoute>
                                }>
                                    <Route path=":data" element={
                                        <SecuredRoute user={user}>
                                            <AccountData />
                                        </SecuredRoute>
                                    } />
                                </Route>
                                <Route path="/login" element={<AuthPage cb={login} login={true} to={"/"} />} />
                                <Route path="/register" element={<AuthPage cb={registerAccount} register={true} to={"/login"} />} />
                            </Route>
                            <Route path="*" element={<ErrorPage />} />
                        </Routes>
                    </HashRouter>
                </BasketContext.Provider>
            </ProductContext.Provider>
        </UserContext.Provider>
    );
}