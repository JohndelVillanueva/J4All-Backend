// Define the UserData type according to your API response structure
export interface UserData {
  // Example fields; replace with actual fields from your API
  id: number;
  name: string;
  email: string;
}

export const fetchUserData = async (): Promise<UserData> => {
  const response = await fetch('/api/getUser');
  
  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }
  
  const data = await response.json();
  return data as UserData;
};