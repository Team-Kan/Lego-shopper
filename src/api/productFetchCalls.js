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
 return results
}

module.exports = {
    fetchAllProducts,
    fetchProductById,
};