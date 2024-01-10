import axios from "axios"

export const fetchData = async (url: any, token: any) => {
    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data

    } catch (error: any) {
        throw new Error(error.message)
    }
}