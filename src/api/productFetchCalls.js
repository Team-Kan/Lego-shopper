const MAIN_URL = process.env.MAIN_URL || "http://localhost:3000/"

const fetchAllProducts = async () => {
    const response = await fetch(`${MAIN_URL}/api/products`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    const result = await response.json();
    return result;
};

module.exports = {
    fetchAllProducts,
};