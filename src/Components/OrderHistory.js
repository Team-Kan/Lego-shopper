import React from "react";
import { Link } from "react-router-dom";

const OrderHistory = (props) => {
  const { orderHistory } = props;

  return (
    <div className="flex flex-col items-center">
      {orderHistory.length ? (
        <ul className="w-8/12 mt-4">
          {orderHistory.map((order) => {
            return (
              <li key={order.id} className="bg-slate-100 p-4 m-6 max-h-[30rem] overflow-scroll">
                <ul>
                  {order.products.map((product) => {
                    return (
                      <li key={product.id} className=" border-2 p-1 m-1 hover:shadow-sm hover:shadow-green-700">
                        <Link to={`/product/${product.id}`}>  
                        <div>
                          <span>{product.name} </span>
                          <div className="flex">
                            <img
                              className="h-16 w-16 border-2 border-green-600 mr-2"
                              src={product.imageUrl}
                            />
                            <span>amount purchased: {product.quantity}</span>
                          </div>
                        </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="bg-yellow-500 text-4xl">
          You have no previous orders... yet!
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
