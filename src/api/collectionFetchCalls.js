const fetchAllCollections = async () => {
    const response = await fetch(`/api/collections`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    const result = await response.json();
    return result;
};

const fetchCollectionProducts = async(id) => {
    const response = await fetch(`/api/products/collection/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    const result = await response.json();
    return result;
}

const editCollectionFetch = async (token, name, id) => {
  const response = await fetch(`/api/collections/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ name })
  })
  
  const results = await response.json();
  return results
}

const deleteCollectionFetch = async (token, id) => {
    const response = await fetch(`/api/collections/${id}`, {
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
    fetchAllCollections,
    fetchCollectionProducts,
    editCollectionFetch,
    deleteCollectionFetch
};