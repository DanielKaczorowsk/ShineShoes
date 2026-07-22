import { useState } from 'react';

/**
 * A generic hook for handling asynchronous data fetching
 *
 * @param {Function} fetchFn - An asynchronous function that returns data (e.g., an API request)
 * @returns {{sendData: (function(): Promise<{items: *, status: string}|{status: string}|undefined>)|*,isLoading ,status: string}} An object containing the data state, and status and loading
 */
export function useSetDataProvider(fetchFn)
{
    const [status, setStatus] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const execute = async () =>
    {
        try
        {
            setIsLoading(true);
            setStatus("Send data...");
            const data = await fetchFn();
            setStatus("Data successfully added");

            return { items: data, status: "Data successfully added" };
        }
        catch (e)
        {
            const errorMsg = "error " + e.message;
            setStatus(errorMsg);
            return {status: errorMsg};
        }
        finally {
            setIsLoading(false);
        }
    };
    return { execute, isLoading, status, };

}