import axios from "axios";

export const fetchData = async (url:any, token:any, header = {}) => {
    try {
        let hasNextPage = true;
        let data = [];

        while (hasNextPage) {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    ...header,
                },
            });

            data.push(...response.data.value);

            const nextLink = response.data["@odata.nextLink"];
            hasNextPage = !!nextLink;
            url = nextLink;
        }

        return data;
    } catch (error:any) {
        
        // Proper error handling
        return error.response.status|| error;
    }
};
