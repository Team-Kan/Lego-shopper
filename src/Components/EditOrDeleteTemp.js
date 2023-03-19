import React from "react";

const EditOrDeleteTemp = (props) => {
  const { name, handleClick, handleChange, edit, del, list } = props;
  return (
    <>
      <h1>Edit or Remove {name}</h1>
      <div className="flex justify-center items-center w-full">
        <button
          onClick={(ev) => handleClick(ev.target.value)}
          value={"edit"}
          disabled={edit}
          className={`m-1 pl-2 pr-2 bg-green-600 w-1/4 rounded-lg shadow-md shadow-green-700 hover:animate-pulse ${
            !edit
              ? "active:translate-y-1 active:bg-green-800 active:animate-none"
              : ""
          }`}
        >
          Edit
        </button>
        <button
          onClick={(ev) => handleClick(ev.target.value)}
          value={"delete"}
          disabled={del}
          className={`m-1 pl-2 pr-2 bg-green-600 w-1/4 rounded-lg shadow-md shadow-green-700 hover:animate-pulse ${
            !del
              ? "active:translate-y-1 active:bg-green-800 active:animate-none"
              : ""
          }`}
        >
          Delete
        </button>
      </div>
      <select
        onChange={(ev) => handleChange(ev, list)}
        className="m-4 border-2 border-green-700 rounded-md w-8/12 p-2"
      >
        <option value={{}}>Select a {name}...</option>
        {list.length ? (
          list.map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            );
          })
        ) : (
          <option value={{}}>There are no {name}s.</option>
        )}
      </select>
    </>
  );
};

export default EditOrDeleteTemp;
