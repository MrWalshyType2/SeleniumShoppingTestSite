import React, { useContext, useState } from "react";
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from "../AppRouter";
import { SlBasket } from "react-icons/sl";

export default function NavigationBar(props) {

    // state to track whether the nav bar is toggled or not, styling is in the App.css file
    // - false is a closed toggle menu, true is a open toggle menu
    const [toggled, setToggled] = useState(false);
    const user = useContext(UserContext);

    // use to toggle the menu state
    function toggleMenu(event) {
        setToggled(previousState => {
            return !previousState;
        });
    }

    function isOpen() {
        if (toggled) return "show";
        return "";
    }

    return (
            <nav className="navbar row">
                <button id="toggle" className="hamburger ml-auto" onClick={toggleMenu}><span></span><span></span><span></span></button>
                <ul className={"col-6 col-md-12 nav-content " + isOpen()}>
                    <NavigationLink to="/" value="Home" />
                    <NavigationLink to="/products/phones" value="Phones" />
                    <NavigationLink to="/products/tablets" value="Tablets" />
                    <NavigationLink to="/products/laptops" value="Laptops" />
                </ul>
                <hr className="d-none d-md-block m-0" />
                {!user && <ul className={"col-6 col-md-12 nav-content " + isOpen()}>
                    <NavigationLink className="float-right float-md-none" to="/login" value="Sign in" />
                    <NavigationLink className="float-right float-md-none" to="/register" value="Register" />
                </ul>}
                {user && <ul className={"col-6 col-md-12 nav-content " + isOpen()}>
                    <NavigationLink className="nav-link float-right float-md-none" value="Sign out" onClick={props.logout} />
                    <NavigationLink className="float-right float-md-none" to="/account" value="My Account" />
                    {/* <NavigationLink className="float-right float-md-none" to="/account/orders" value="My Orders" /> */}
                    <NavigationLink className="float-right float-md-none" to="/account/basket" value={<SlBasket />} />
                </ul>}
            </nav>
    );
}

export function NavigationLink({ to, value, className, id, onClick }) {

    return (
        // change class name based on whether the navigation menu containing the link is toggled open or not
        <li className={"nav-link " + className} id={id} onClick={onClick}>
            <Link to={to}>
                {value}
            </Link>
        </li>
    )
}

export function SecuredRoute({ user, children }) {
    if (user) return children;
    return <Navigate to="/login" replace={true} />
}