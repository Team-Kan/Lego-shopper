import React from "react";
import { editUsersAdminPriv } from "../api";

const ChangeAdminForm = (props) => {
  const { auth, users, displayAllUsers, setIsLoading } = props;
  const admins = users.filter(({ isAdmin }) => isAdmin);
  const notAdmins = users.filter(({ isAdmin }) => !isAdmin);
  
  const handleEdit = async ({ id, token, isAdmin }) => {
    setIsLoading(true);
    const edit = await editUsersAdminPriv({ token, isAdmin, id });
    if (edit.id) {
      displayAllUsers(token);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const userInfo = (array, whichUsers, label) => {
    const token = window.localStorage.getItem("token");
    return (
      <>
        <h1 className="text-4xl">{whichUsers}:</h1>
        <ul className="mb-6 flex flex-col items-center">
          {array.map(({ id, username, isAdmin }) => {
            return (
              <li
                key={id}
                className="flex border-2 border-green-700 shadow-md shadow-green-600 w-11/12 mb-4 mt-4 rounded-md"
              >
                <form>
                  <label>{label}</label>
                  <input
                    type="checkbox"
                    value={id}
                    disabled={id === auth.id}
                    onClick={(ev) => handleEdit({ id, token, isAdmin })}
                  />
                </form>
                <div>
                  <p className="p-2">
                    <label className="text-green-600 font-extrabold">id:</label>
                    <br />
                    {id}
                  </p>
                  <p className="p-2">
                    <label className="text-green-600 font-extrabold">
                      UserName:
                    </label>
                    <br />
                    {username}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </>
    );
  };
  return (
    <div className="bg-white min-h-[20rem] max-h-[42rem] overflow-scroll border-2 border-green-600 rounded-md w-11/12 mt-12 mb-12 shadow-md shadow-green-700 overflow-y-scroll">
      {userInfo(admins, "Admins", "Remove from admins?")}
      <div>{userInfo(notAdmins, "Users", "Add to admins?")}</div>
    </div>
  );
};

export default ChangeAdminForm;
