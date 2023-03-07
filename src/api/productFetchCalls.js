const MAIN_URL = "http://localhost:3000/api/products"

const fetchAllProducts = async () => {
    const response = await fetch(`${MAIN_URL}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    const result = await response.json();
    return result;
};

const fetchProductById = async (id) => {
 const response = await fetch(`${MAIN_URL}/${id}`,{
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
 });

 const results = await response.json();
 return results;
}

const editProductFetch = async (id, token, body) => {
  const response = await fetch(`${MAIN_URL}/${id}`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(body),
  })
  
  const results = await response.json();
  return results;
}

const deleteProductFetch = async (id, token) => {
  const response = await fetch(`${MAIN_URL}/${id}`, {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
  })

  const results = await response.json();
  return results;
}
module.exports = {
    fetchAllProducts,
    fetchProductById,
    editProductFetch,
    deleteProductFetch,
};