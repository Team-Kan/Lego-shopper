import React, { useState } from "react";
import { createCollectionFetch } from "../api";

const CreateCollectionForm = (props) => {
  const { showAllCollections, setIsLoading } = props;
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (ev) => {
    setIsLoading(true);
    const token = window.localStorage.getItem("token");
    ev.preventDefault();

    const newCollection = await createCollectionFetch(token, name);
    if (newCollection.error) {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return setError(newCollection.error);
    }

    setError("");
    setName("");
    showAllCollections();
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return newCollection;
  };
  return (
    <div className="bg-white max-h-[300px] border-2 border-green-600 rounded-md w-11/12 mb-6 shadow-md shadow-green-700">
      <form
        className="flex flex-col justify-center items-center m-6"
        onSubmit={(ev) => handleSubmit(ev)}
      >
        <h1>Create new collection.</h1>
        <input
          placeholder="name..."
          className="border-2 border-green-700 rounded-md w-8/12 p-2"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
        />
        <button className="bg-green-600 w-48 rounded-lg hover:animate-pulse active:translate-y-1 active:bg-green-800 active:animate-none shadow-md shadow-green-700">
          create Collection
        </button>
      </form>
    </div>
  );
};

export default CreateCollectionForm;
