const createUser = async ({username, password}) => {
    const response = await fetch(
        `/api/auth/register`,
        {
          method: 'POST',
          body: JSON.stringify({ username, password}),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      const results = await response.json()

      return results;
}

const getUser = async (token) => {
    const response = await fetch(
        `/api/auth/`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}` 
          }
        }
      )
      const results = await response.json()

      return results;
}

const editUsersAdminPriv = async ({id, isAdmin, token}) => {
  const response = await fetch(
    `/api/auth/${id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ isAdmin }),
    }
  )
  const results = await response.json();

  return results
}

module.exports={
    createUser,
    getUser,
    editUsersAdminPriv,
}