const MAIN_URL = "http://localhost:3000/"

const fetchAllUsers = async (token) => {
    const response = await fetch(`${MAIN_URL}api/auth/admin`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });
    const result = await response.json();
    return result;
};

module.exports = {
    fetchAllUsers,
};