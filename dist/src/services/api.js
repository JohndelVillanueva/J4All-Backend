export const fetchUserData = async () => {
    const response = await fetch('/api/getUser');
    if (!response.ok) {
        throw new Error('Failed to fetch user data');
    }
    const data = await response.json();
    return data;
};
