export const client = async (endPoint) => {

  try{
    const response = await fetch(endPoint);
    if (!response.ok) throw new Error ('failed to fetch');
    const data = await response.json();
    return data;
  } catch(err) {
    return Promise.reject(err.message);
  }
}