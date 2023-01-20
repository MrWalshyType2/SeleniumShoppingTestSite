import React, { useContext } from "react";
import { UserContext } from "../../AppRouter";
import { TiDelete } from "react-icons/ti";

export default function ProductCard({ data, addToBasket, deleteFromBasket, count }) {
    const user = useContext(UserContext);

    return (
        <article className="col-3 col-lg-2 col-md-4 col-sm-6 col-xs-12 p-16 pb-0" style={{ minHeight: "475px" }}>
            <h3>{data.name}</h3>
            <img className="w-100" src="https://via.placeholder.com/150" alt="" />
            {user && addToBasket && <button className="btn bg-warning fg-dark w-100" onClick={event => addToBasket(data.id)}>Add to basket</button>}
            {user && deleteFromBasket && <button className="btn bg-danger fg-white w-100" onClick={event => deleteFromBasket(data.id)}><TiDelete /></button>}
            <div className="row">
                <div className="col-12">
                    {count && <p className="mb-0"><strong>Quantity: </strong>{count}</p>}
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <p className="mb-0"><strong>Price: </strong>£{data.cost}</p>
                </div>
            </div>
            <p>{data.description}</p>
        </article>
    );
}