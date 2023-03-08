import React from 'react'

const ChangeAdminForm = (props) => {
  const {users} = props;
  const admins = users.filter(({isAdmin}) => isAdmin);
  const notAdmins = users.filter(({isAdmin}) => !isAdmin);
  return (
    <div className="bg-white min-h-[20rem] border-2 border-green-600 rounded-md w-11/12 mt-12 mb-12 shadow-md shadow-green-700">
      {admins.map(users => {
        return (
          <div>
            
          </div>
        )
      })}
    </div>
  )
}

export default ChangeAdminForm;
