const MAIN_URL = "http://localhost:3000"

const createUser = async ({username, password}) => {
    const response = await fetch(
        `${MAIN_URL}/api/auth/register`,
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
        `${MAIN_URL}/api/auth/`,
        {
          method: 'GET',
          headers: {
            'authorization': token 
          }
        }
      )
      const results = await response.json()

      return results;
}

const editUsersAdminPriv = async ({id, isAdmin, token}) => {
  const response = await fetch(
    `${MAIN_URL}/api/auth/${id}`, {
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