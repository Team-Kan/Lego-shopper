import React, {useState} from "react";

const AddProductToCartForm = (props) => {
    const {product} = props;
    const [quantity, setQuantity] = useState(1);

  return (
    <form className="flex">
      <label>Current Stock: {product.quantity}</label>
      <div className="self-center w-36">
        <button 
          className="pl-3 pr-3"
          onClick={(ev) => {
            ev.preventDefault();
            quantity - 1 > 0 ?
              setQuantity(quantity - 1)
            : null
          }}
        >
            -
        </button>
        <input
          className="w-10 ml-3 mr-3 border-2 border-green-500 rounded-md text-center"
          type="number"
          value={quantity}
          onChange={(ev) =>
            ev.target.value < product.quantity && ev.target.value > 0
              ? setQuantity(ev.target.value)
              : null
          }
        />
        <button
          className="pl-3 pr-3"
          onClick={(ev) => {
            ev.preventDefault();
            quantity + 1 < product.quantity ?
              setQuantity(quantity + 1)
            : null
          }}
        >
          +
        </button>
      </div>
    </form>
  );
};

export default AddProductToCartForm;
