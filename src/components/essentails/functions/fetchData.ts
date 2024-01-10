import axios from "axios"

export const fetchData = async (url: any, token: any) => {
    try {
        let hasNextPage = true;
        //   let url = `${apiUrl}?startDateTime=${encodeURIComponent(
        //     new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
        //   )}&endDateTime=${encodeURIComponent(new Date().toISOString())}`;
        //   let url = `${apiUrl}`;
        // let url = "https://graph.microsoft.com/v1.0/security/incidents"
        // let url = "https://graph.microsoft.com/v1.0/security/alerts?$filter=vendorInformation/provider eq 'Azure Sentinel'"
        // let url = "https://graph.microsoft.com/v1.0/security/alerts_v2"
        // let url = "https://graph.microsoft.com/v1.0/security/incidents?$expand=alerts"
        let data = []
        while (hasNextPage) {
            const response: any = await axios(url, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            data.push(...response.data.value)


            if (response?.data?.["@odata.nextLink"]) {
                url = response?.data?.["@odata.nextLink"];
            } else {
                hasNextPage = false;
                return data
            }
        }

    } catch (error: any) {
    //    / if 
        console.error("Error fetching alerts:", error.message);
    }
}