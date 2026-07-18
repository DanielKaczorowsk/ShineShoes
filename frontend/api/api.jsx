const API_URL = "http://localhost:8081/api/v1";

export const loginUser = async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
    });

    if (!response.ok) {
        throw new Error('Błąd logowania');
    }
    return response.json();
};
export const registerUser = async (name, email, password) => {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok)
    {
        const errorData = await response.text();
        throw new Error(errorData || 'Błąd rejestracji');
    }

    return response.text();
};
export const getProtectedData = async (endpoint) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}${endpoint}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.json();
};