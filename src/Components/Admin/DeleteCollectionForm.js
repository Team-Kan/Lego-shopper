import React, { useState } from "react";
import { deleteCollectionFetch } from "../../api";

const DeleteCollectionForm = (props) => {
  const [error, setError] = useState("");
  const { setDeleteCollection, showAllCollections, setIsLoading, collection } = props;
  const handleDelete = async (ev) => {
    ev.preventDefault();
    setIsLoading(true);
    if (!collection.id) {
      return setError("Please select a Collection");
    }
    const token = window.localStorage.getItem("token");
    const deleted = await deleteCollectionFetch(token, collection.id);

    if (deleted.error) {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return setError(deleted.error);
    }
    showAllCollections()
    setDeleteCollection(false);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return deleted;
  };
  return (
    <div className="m-2">
      <form>
        <div>
          <div className="m-2">{error}</div>
          <button
            onClick={(ev) => handleDelete(ev)}
            className="m-1 pl-4 pr-4 bg-red-600 rounded-lg shadow-md shadow-red-700 hover:animate-pulse active:bg-red-800 active:animate-none active:translate-y-1"
          >
            delete
          </button>
          <button
            className="m-1 pl-4 pr-4 bg-green-600 rounded-lg shadow-md shadow-green-700 hover:animate-pulse active:bg-green-800 active:animate-none active:translate-y-1"
            onClick={(ev) => {
              ev.preventDefault();
              setDeleteCollection(false);
            }}
          >
            cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeleteCollectionForm;
