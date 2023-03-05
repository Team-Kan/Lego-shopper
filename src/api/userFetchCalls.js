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

module.exports={
    createUser,
}