import React, {useState, useEffect} from "react";
import { editCollectionFetch } from "../api";

const EditCollectionForm = (props) => {
  const {
    showAllCollections,
    collection, 
    setEditCollection,
    setIsLoading
  } = props;
  const [error, setError] = useState("");
  const [name, setName] = useState("")
  
  const handleEdit = async (ev) => {
    ev.preventDefault();
    setIsLoading(true)
    const token = window.localStorage.getItem("token");
    const editCollection = await editCollectionFetch(token, name, collection.id);
    if (editCollection.error) {
      setTimeout(() => {
        setIsLoading(false)
      }, 500);
      return setError(editCollection.message);
    }
    showAllCollections();
    setTimeout(() => {
      setIsLoading(false)
    }, 500);
    setEditCollection(false);
    return editCollection;
  }

  useEffect(() => {
    collection
    ? setName(collection.name || "")
    : setName("")
  }, [collection])
  return (
    <form 
      className="w-11/12 flex items-center justify-center"
      onSubmit={ev => handleEdit(ev)}
    >
      <input 
        className="border-2 border-green-700 rounded-md w-8/12 p-2"
        placeholder="enter new name..."
        value={name}
        onChange={ev => setName(ev.target.value)}
      />
      <div>{error}</div>
      <button
        className="pl-4 pr-4 mb-4 bg-green-600 rounded-lg shadow-md shadow-green-700 hover:animate-pulse active:bg-green-800 active:animate-none active:translate-y-1"
      >
        Edit
      </button>
      <button 
        className="pl-4 pr-4 mb-4 bg-green-600 rounded-lg shadow-md shadow-green-700 hover:animate-pulse active:bg-green-800 active:animate-none active:translate-y-1"
        onClick={ev => {
          ev.preventDefault(); 
          setEditCollection(false)}
        }
      >
        Cancel
      </button>
    </form>
  );
};

export default EditCollectionForm;
