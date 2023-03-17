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

module.exports = {
    fetchAllCollections,
    fetchCollectionProducts
};