import React, { useState } from "react";
import { createProductFetch } from "../api";

const CreateProductForm = (props) => {
  const { collections } = props;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [collectionId, setCollectionId] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [pieceCount, setPieceCount] = useState("");
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState("");

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
    if (newProduct.error) {
      return setError(newProduct.error);
    }

    setName("");
    setDescription("");
    setCollectionId("");
    setPrice("");
    setImageUrl("");
    setPieceCount("");
    setQuantity("");

    return newProduct;
  };
  return (
    <div className="border-2 border-green-600 rounded-md w-11/12 h-[42rem] overflow-y-scroll mt-12 mb-12 shadow-md shadow-green-700">
      <form className="flex flex-col justify-center items-center">
        <h1>Create product.</h1>
        <label className="self-start">Product name:</label>
        <input
          className="border-2 border-green-700 rounded-md w-8/12 p-2"
          placeholder="name..."
          value={name}
          onChange={(ev) => setName(ev.target.value)}
        />
        <label className="self-start">Description:</label>
        <input
          className="border-2 border-green-700 rounded-md w-8/12 p-2"
          placeholder="description..."
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        <label className="self-start">collection:</label>
        <select
          className="border-2 border-green-700 rounded-md w-8/12 p-2"
          onChange={(ev) => setCollectionId(ev.target.value)}
        >
          <option value={null}>Select a collection</option>
          {collections.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
        <label className="self-start">Price:</label>
        <input
          className="border-2 border-green-700 rounded-md w-8/12 p-2"
          placeholder="price..."
          value={price}
          onChange={(ev) => setPrice(ev.target.value)}
        />
        <label className="self-start">Image URL:</label>
        <input
          className="border-2 border-green-700 rounded-md w-8/12 p-2"
          placeholder="imageURL..."
          value={imageUrl}
          onChange={(ev) => setImageUrl(ev.target.value)}
        />
        <label className="self-start">How many Pieces? :</label>
        <input
          className="border-2 border-green-700 rounded-md w-8/12 p-2"
          placeholder="Piece count..."
          value={pieceCount}
          onChange={(ev) => setPieceCount(ev.target.value)}
        />
        <label className="self-start">How many do we have in stock? :</label>
        <input
          className="border-2 border-green-700 rounded-md w-8/12 p-2"
          placeholder="Starting quantity..."
          value={quantity}
          onChange={(ev) => setQuantity(ev.target.value)}
        />
        <div>{error}</div>
        <button
          className="bg-green-600 w-6/12 rounded-lg hover:animate-pulse active:translate-y-1 active:bg-green-800 active:animate-none shadow-md shadow-green-700"
          onClick={(ev) => handleSubmit(ev)}
        >
          Create product
        </button>
      </form>
    </div>
  );
};

export default CreateProductForm;
