// utils/user.ts
export const getUserFullName = (user: { first_name?: string, last_name?: string }) => {
  if (!user?.first_name) return null;
  return `${user.first_name} ${user.last_name || ''}`.trim();
}