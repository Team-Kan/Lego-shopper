import React, { useState } from "react";
import { createProductFetch } from "../api";

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
      quantity,
    };
    const newProduct = await createProductFetch(token, submitProduct);
    console.log(newProduct);

    return newProduct;
  };
  return (
    <div className="border-2 border-green-600 rounded-md w-[26rem] m-12 shadow-md shadow-green-700">
      <form className="flex flex-col justify-center items-center">
        <h1>Create product.</h1>
        <input
          className="border-2 border-green-700 rounded-md w-96 p-2"
          placeholder="name..."
          value={name}
          onChange={(ev) => setName(ev.target.value)}
        />
        <input
          className="border-2 border-green-700 rounded-md w-96 p-2"
          placeholder="description..."
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        <input
          className="border-2 border-green-700 rounded-md w-96 p-2"
          placeholder="collectionId..."
          value={collectionId}
          onChange={(ev) => setCollectionId(ev.target.value)}
        />
        <input
          className="border-2 border-green-700 rounded-md w-96 p-2"
          placeholder="price..."
          value={price}
          onChange={(ev) => setPrice(ev.target.value)}
        />
        <input
          className="border-2 border-green-700 rounded-md w-96 p-2"
          placeholder="imageURL..."
          value={imageUrl}
          onChange={(ev) => setImageUrl(ev.target.value)}
        />
        <input
          className="border-2 border-green-700 rounded-md w-96 p-2"
          placeholder="Piece count..."
          value={pieceCount}
          onChange={(ev) => setPieceCount(ev.target.value)}
        />
        <input
          className="border-2 border-green-700 rounded-md w-96 p-2"
          placeholder="Starting quantity..."
          value={quantity}
          onChange={(ev) => setQuantity(ev.target.value)}
        />
        <button
          className="bg-green-600 w-48 rounded-lg hover:animate-pulse active:translate-y-1 active:bg-green-800 active:animate-none shadow-md shadow-green-700"
          onClick={(ev) => handleSubmit(ev)}
        >
          Create product
        </button>
      </form>
    </div>
  );
};

export default CreateProductForm;
