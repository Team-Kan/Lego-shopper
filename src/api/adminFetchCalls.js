

const fetchAllUsers = async (token) => {
    const response = await fetch(`/api/auth/admin`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });
    const result = await response.json();
    return result;
};

const createProductFetch = async (token, newProduct) => {
  const response = await fetch(`/api/products/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(newProduct),
  });
  const result = await response.json();

  return result
}

const createCollectionFetch = async (token, name) => {
  const response = await fetch(`/api/collections`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({name}),
  });
  const result = await response.json();

  return result;
} 

module.exports = {
    fetchAllUsers,
    createProductFetch,
    createCollectionFetch,
};