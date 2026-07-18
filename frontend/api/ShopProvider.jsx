const API_URL = "http://localhost:8081/api/v1";

export const newestData = async () => {
    const response = await fetch(`${API_URL}/shopSite/newproduct`, {
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
export const topData = async (name) => {
    const response = await fetch(`${API_URL}/shopSite/top/${name}`, {
        method: 'POST',
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