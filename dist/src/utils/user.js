export const getUserData = async (id) => {
    try {
        const response = await fetch(`/api/getUser/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        return await response.json();
    }
    catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
};
