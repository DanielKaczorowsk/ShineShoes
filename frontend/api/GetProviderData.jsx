import { useState, useEffect } from 'react';

/**
 * A generic hook for handling asynchronous data fetching
 *
 * @param {Function} fetchFn - An asynchronous function that returns data (e.g., an API request)
 * @returns {{ items: Array, isLoading: boolean, refresh: Function }} An object containing the data state, loading status, and a refresh function
 */
export function useGetDataProvider(fetchFn)
{
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadData = async () =>
    {
        try
        {
            setIsLoading(true);
            const data = await fetchFn();
            setItems(data);
        }
        catch (e)
        {
            console.error(e.message);
        }
        finally
        {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        loadData().catch((err) => console.error("Unhandled promise:", err));
    }, []);
    return { items, isLoading, refresh: loadData};
}