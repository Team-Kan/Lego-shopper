import React, { useState } from "react";
import { createCollectionFetch } from "../api";

const CreateCollectionForm = () => {
  const [name, setName] = useState("");
  const handleSubmit = async (ev) => {
    const token = window.localStorage.getItem("token");
    ev.preventDefault();

    const newCollection = await createCollectionFetch(token, name);
    console.log(newCollection);

    return newCollection;
  };
  return (
    <div className="border-2 border-green-600 rounded-md w-[26rem] m-12 shadow-md shadow-green-700">
      <form className="flex flex-col justify-center items-center h-full">
        <h1>Create new collection.</h1>
        <input
          placeholder="name..."
          className="border-2 border-green-700 rounded-md w-96 p-2"
          value={name}
          onChange={(ev) => {
            (ev) => handleSubmit(ev);
          }}
        />
        <button
          className="bg-green-600 w-48 rounded-lg hover:animate-pulse active:translate-y-1 active:bg-green-800 active:animate-none shadow-md shadow-green-700"
        >
            create Collection
        </button>
      </form>
    </div>
  );
};

export default CreateCollectionForm;
