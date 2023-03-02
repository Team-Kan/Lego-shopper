import React, { useState } from 'react'
import { createProductFetch } from '../api';

const CreateProductForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [collectionId, setCollectionId] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [pieceCount, setPieceCount] = useState("");
  const [quantity, setQuantity] = useState("");

 const handleSubmit = async (ev) => {
   ev.preventDefault();
   const token = window.localStorage.getItem("token");
   const submitProduct = {
    name,
    description,
    collectionId,
    price,
    imageUrl,
    pieceCount,
    quantity
   }
   const newProduct = await  createProductFetch(token, submitProduct);
   console.log(newProduct);

   return newProduct
 } 
  return (
    <div className="w-96">
      <h1>Create product.</h1>
      <form className='flex flex-col justify-center items-center'>
        <input 
          placeholder='name...'
          value={name}
          onChange={ev => setName(ev.target.value)}
        />
        <input 
          placeholder='description...'
          value={description}
          onChange={ev => setDescription(ev.target.value)}
          />
        <input 
          placeholder='collectionId...'
          value={collectionId}
          onChange={ev => setCollectionId(ev.target.value)}
          />
        <input 
          placeholder='price...'
          value={price}
          onChange={ev => setPrice(ev.target.value)}
          />
        <input 
          placeholder='imageURL...'
          value={imageUrl}
          onChange={ev => setImageUrl(ev.target.value)}
          />
        <input 
          placeholder='Piece count...'
          value={pieceCount}
          onChange={ev => setPieceCount(ev.target.value)}
          />
        <input 
          placeholder='Starting quantity...'
          value={quantity}
          onChange={ev => setQuantity(ev.target.value)}
          />
          <button
            onClick={ev => handleSubmit(ev)}
          >
            Create product
          </button>
      </form>
    </div>
  )
}

export default CreateProductForm;