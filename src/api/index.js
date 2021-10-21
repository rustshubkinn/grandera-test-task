const URL = 'https://jsonplaceholder.typicode.com/users';

export const fetchUsers = async () => {
  const response = await fetch(URL);
  const result = await response.json();

  return result;
};
