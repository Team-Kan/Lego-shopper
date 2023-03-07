import React, { useState, useEffect } from "react";
import { editProductFetch } from "../api";

const EditProductForm = (props) => {
  const {product} = props;
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
    const editProduct = await editProductFetch(id, token, {
      name,
      description,
      collectionId,
      price,
      imageUrl,
      pieceCount,
      quantity,
    })
    if(editProduct.error){
      return setError(editProduct.message)
    }
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
    <div>
      {product.id ? 
       <form>
         <input
           className=""
           value={name}
           onChange={ev => setName(ev.target.value)}
         />
         <input
           className=""
           value={description}
           onChange={ev => setDescription(ev.target.value)}
         />
         <input
           className=""
           value={collectionId}
           onChange={ev => setCollectionId(ev.target.value)}
         />
         <input
           className=""
           value={price}
           onChange={ev => setPrice(ev.target.value)}
         />
         <input
           className=""
           value={imageUrl}
           onChange={ev => setImageUrl(ev.target.value)}
         />
         <input
           className=""
           value={pieceCount}
           onChange={ev => setPieceCount(ev.target.value)}
         />
         <input
           className=""
           value={quantity}
           onChange={ev => setQuantity(ev.target.value)}
         />
       </form> 
      : <div>Please select A product</div>}
    </div>
  );
};

export default EditProductForm;
