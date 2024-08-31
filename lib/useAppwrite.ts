import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

const useAppwrite = (fn: Function) => {
    const [data, setData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    async function fetchData() {
        setIsLoading(true);
        try {
            const response: any[] = await fn();
            setData(response);
        } catch (error: any) {
            Alert.alert(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => fetchData();

    return { data, isLoading, refetch };
};
export default useAppwrite;