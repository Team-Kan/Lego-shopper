import React, { useState } from "react";
import { EditOrDeleteTemp, EditCollectionForm, DeleteCollectionForm } from ".";

const EditOrDeleteCollection = (props) => {
  const { collections, showAllCollections, setIsLoading } = props;
  const [editCollection, setEditCollection] = useState(false);
  const [deleteCollection, setDeleteCollection] = useState(false);
  const [collection, setCollection] = useState({});

  const handleClick = (value) => {
    switch (value) {
      case "edit":
        setEditCollection(true);
        setDeleteCollection(false);
        break;
      case "delete":
        setDeleteCollection(true);
        setEditCollection(false);
        break;
    }
  };

  const handleChange = (ev, list) => {
    const addedCollection = list.filter(({ id }) => id === +ev.target.value);
    setCollection(addedCollection[0]);
  };


  return (
    <div className="bg-white mb-6 min-h-[20rem] border-2 flex flex-col justify-center items-center border-green-600 rounded-md w-11/12 shadow-md shadow-green-700">
      <EditOrDeleteTemp
        name={"Collection"}
        handleClick={handleClick}
        edit={editCollection}
        del={deleteCollection}
        list={collections}
        handleChange={handleChange}
      />
      {editCollection ? (
        <div className="w-full flex justify-center items-center">
          <EditCollectionForm 
            showAllCollections={showAllCollections} 
            collection={collection}
            setEditCollection={setEditCollection}
            setIsLoading={setIsLoading}
          />
        </div>
      ) : null}
      {deleteCollection ? (
        <div>
          <DeleteCollectionForm 
            setDeleteCollection={setDeleteCollection} 
            showAllCollections={showAllCollections}
            setIsLoading={setIsLoading}
            collection={collection}
          />
        </div>
      ) : null}
    </div>
  );
};

export default EditOrDeleteCollection;
