import React, { useState, useEffect } from "react";
import { editProductFetch } from "../api";

const EditProductForm = (props) => {
  const {product, setEditProduct} = props;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [collectionId, setCollectionId] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [pieceCount, setPieceCount] = useState("");
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState("");

  const handleEdit = async (ev, id) => {
    ev.preventDefault()
    const token = window.localStorage.getItem("token");
    console.log(token)
    const body = {
      name,
      description,
      collectionId,
      price,
      imageUrl,
      pieceCount,
      quantity,
    }
    const editProduct = await editProductFetch({
      id: product.id, 
      token, 
      name,
      description,
      collectionId,
      price,
      imageUrl,
      pieceCount,
      quantity,})
    if(editProduct.error){
      return setError(editProduct.message)
    }
    setEditProduct(false)
    return editProduct
  }

  useEffect(() => {
    if(product.id){
      setName(product.name)
      setDescription(product.description)
      setCollectionId(product.collectionId)
      setPrice(product.price)
      setImageUrl(product.imageUrl)
      setPieceCount(product.pieceCount)
      setQuantity(product.quantity)
    }
  }, [product])

  return (
    <div className="flex flex-col items-center w-full">
      {product.id ? 
       <form className="w-11/12 flex flex-col items-center">
         <input
           className="border-2 border-green-700 rounded-md w-8/12 p-2"
           value={name}
           onChange={ev => setName(ev.target.value)}
         />
         <input
           className="border-2 border-green-700 rounded-md w-8/12 p-2"
           value={description}
           onChange={ev => setDescription(ev.target.value)}
         />
         <input
           className="border-2 border-green-700 rounded-md w-8/12 p-2"
           value={collectionId}
           onChange={ev => setCollectionId(ev.target.value)}
         />
         <input
           className="border-2 border-green-700 rounded-md w-8/12 p-2"
           value={price}
           onChange={ev => setPrice(ev.target.value)}
         />
         <input
           className="border-2 border-green-700 rounded-md w-8/12 p-2"
           value={imageUrl}
           onChange={ev => setImageUrl(ev.target.value)}
         />
         <input
           className="border-2 border-green-700 rounded-md w-8/12 p-2"
           value={pieceCount}
           onChange={ev => setPieceCount(ev.target.value)}
         />
         <input
           className="border-2 border-green-700 rounded-md w-8/12 p-2"
           value={quantity}
           onChange={ev => setQuantity(ev.target.value)}
         />
         <button
           onClick={ev => handleEdit(ev)}
         >Submit edits</button>
       </form> 
      : <div>Please select A product</div>}
      <button 
        className="pl-4 pr-4 bg-green-600 rounded-lg shadow-md shadow-green-700 hover:animate-pulse active:bg-green-800 active:animate-none active:translate-y-1"
        onClick={ev => setEditProduct(false)}
      >
        cancel
      </button>
    </div>
  );
};

export default EditProductForm;
