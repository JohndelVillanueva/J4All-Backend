interface UserData {
  id: number;
  name: string;
  email: string;
  // Add other user fields as needed
}

export const getUserData = async (id: number): Promise<UserData | null> => {
  try {
    const response: Response = await fetch(`/api/getUser/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    return await response.json() as UserData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};