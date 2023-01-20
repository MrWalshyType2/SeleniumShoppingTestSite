import React from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { BasketContext } from "../../AppRouter";
import Basket from "./Basket";

export default function AccountData(props) {
    const params = useParams();
    const data = params.data;

    function renderAccountData() {
        if (data === "basket") return <Basket />;
        // else if (data === "orders") return <Orders />;
        else return <h2>Error - Invalid account data request</h2>
    }

    return (
        <>
            {renderAccountData()}
        </>
    );
}