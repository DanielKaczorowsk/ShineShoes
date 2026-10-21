const API_URL = "http://localhost:8081/api/v1";
export const favoritesProduct = async () => {
    const response = await  fetch(`${API_URL}/shopSite/favorites/get`,{
        method:'GET',
        headers:{
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
    if(!response.ok){
        throw new Error('Blad z polaczeniem');
    }
    return await response.json();
}
export const newestData = async () => {
    const response = await fetch(`${API_URL}/shopSite/newestData`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
    if (!response.ok) {
        throw new Error('Blad z polaczeniem');
    }
    return await response.json();
};
export const topData = async (name) => {
    const response = await fetch(`${API_URL}/shopSite/top/${name}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (!response.ok) {
        throw new Error('Blad z polaczeniem');
    }
    return response.json();
};
export const namesData = async() =>
{
    const response = await fetch(`${API_URL}/shopSite/names`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (!response.ok) {
        throw new Error('Blad z polaczeniem');
    }
    return await response.json();
};
export const addBasket = async (dataBasket) => {
    const response = await fetch(`${API_URL}/shopSite/basket/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dataBasket }),
    });

    if (!response.ok)
    {
        const errorData = await response.text();
        throw new Error(errorData || 'Error provider basket');
    }

    return response.text();
};
export  const favoriteProduct = async (idProduct) =>{
    const response = await fetch(`${API_URL}/shopSite/favorites/add/${idProduct}`,{
        method: 'POST',
        credentials: 'include',
    });
    if(!response.ok){
        const errorData = await response.text();
        throw new Error(errorData || 'Error provider favorite');
    }
    return response.text();
}
export  const favoriteDelete = async (idProduct) =>{
    const response = await fetch(`${API_URL}/shopSite/favorites/delete/${idProduct}`,{
        method:'DELETE',
        credentials: 'include',
    });
    if(!response.ok){
        const errorData = await response.text();
        throw new Error(errorData || 'Error delete product from favorite')
    }
}