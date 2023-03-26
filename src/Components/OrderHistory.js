import React from "react";

const OrderHistory = (props) => {
  const { orderHistory } = props;

  return (
    <div className="flex flex-col items-center">
      {orderHistory.length ? (
        <ul className="w-8/12">
          {orderHistory.map((order) => {
            return (
              <li key={order.id} className="bg-slate-100 p-4">
                <ul>
                  {order.products.map((product) => {
                    return (
                      <li key={product.id}>
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
