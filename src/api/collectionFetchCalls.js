const MAIN_URL = "http://localhost:3000/"

const fetchAllCollections = async () => {
    const response = await fetch(`${MAIN_URL}api/collections`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    const result = await response.json();
    return result;
};

module.exports = {
    fetchAllCollections,
};