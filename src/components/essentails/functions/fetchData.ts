import axios from "axios"
import { refreshToken } from "./refreshToken";

export const fetchData = async (url: any,token:any) => {
    try {
        // const token = await refreshToken()
        console.log(token,"token lelo");
        let hasNextPage = true;
        // const jugad="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImtXYmthYTZxczh3c1RuQndpaU5ZT2hIYm5BdyIsImtpZCI6ImtXYmthYTZxczh3c1RuQndpaU5ZT2hIYm5BdyJ9.eyJhdWQiOiJodHRwczovL21hbmFnZW1lbnQuY29yZS53aW5kb3dzLm5ldCIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzhlNGZmYzNjLTk5YzgtNGVhYi1iYjAwLWExYzFkZDNmMzNiYS8iLCJpYXQiOjE3MDc4MjUyMzYsIm5iZiI6MTcwNzgyNTIzNiwiZXhwIjoxNzA3ODI5MjI4LCJhY3IiOiIxIiwiYWlvIjoiQVZRQXEvOFZBQUFBMU03aTNqQThrT2RUaEY2eW5Ya0xTQUtsT2Z3YTJIUjhIeGJ2WTFDM0JVM0xOZHg1S0ZBMGFJaThhUDJTSTN6QmRvV3lhRWRuejc0eldndGIwcGFycHJjcHhFU3REWmtsenVKbGxEdUUzZE09IiwiYW1yIjpbInB3ZCIsIm1mYSJdLCJhcHBpZCI6IjE4ZmJjYTE2LTIyMjQtNDVmNi04NWIwLWY3YmYyYjM5YjNmMyIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoia3VtYXIiLCJnaXZlbl9uYW1lIjoiUHJpbmNlIiwiZ3JvdXBzIjpbImE1ZjkyZDkyLTJkMGEtNDliNi05MDI5LWNiYmQ4NjI5OTI0NiIsIjAwMzBjOGRlLWUxOTktNDA4ZS04MWI1LWNmZTVmZjgyODkzYiJdLCJpZHR5cCI6InVzZXIiLCJpcGFkZHIiOiIxMjIuMTYwLjE1My4xNyIsIm5hbWUiOiJQcmluY2Uga3VtYXIiLCJvaWQiOiI5MTE3N2IyZi0wYmJkLTQ3MzctYjY0ZS1lY2QyMmNiNjNhNWIiLCJwdWlkIjoiMTAwMzIwMDM0ODAyNzBGMCIsInJoIjoiMC5BU3NBUFB4UGpzaVpxMDY3QUtIQjNUOHp1a1pJZjNrQXV0ZFB1a1Bhd2ZqMk1CUENBTDguIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic3ViIjoianJtVnR5Y1BjU3FRdldpRDRJSmJUelpuU1RnaUstNnZBc1FaUC1JZHlDQSIsInRpZCI6IjhlNGZmYzNjLTk5YzgtNGVhYi1iYjAwLWExYzFkZDNmMzNiYSIsInVuaXF1ZV9uYW1lIjoiUHJpbmNlQEJlYXR1bTIwMjQub25taWNyb3NvZnQuY29tIiwidXBuIjoiUHJpbmNlQEJlYXR1bTIwMjQub25taWNyb3NvZnQuY29tIiwidXRpIjoiUnNpOWF6N0s1VWlWc2NGQy1aZE9BQSIsInZlciI6IjEuMCIsIndpZHMiOlsiNjJlOTAzOTQtNjlmNS00MjM3LTkxOTAtMDEyMTc3MTQ1ZTEwIiwiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il0sInhtc19jYWUiOiIxIiwieG1zX3RjZHQiOjE3MDYwNzAwMDZ9.MDOyk96YaLIU3moWzD8ad5CGBqiYsCXpfI0D6a0hjno8x2jSIoys-vikKqZ7zb8yhlgNkZ1ObV9yuB7VbhkLAazay1rU8K_UtXdGVJwqs8EFPeul-nIxwobBLA2zx0cmefgrDeqVxv0-RiUbI3jorEcqOJwEAx5eNvs-NuxhjccPucI9CIZ-SRPgCp6pLVDYhSnVS3g1zWlF49Tcp-4bZVcke0W53zALuujGtbRPWdKVVWSSk4ZBiLrLhgOzOV7Q2ZRalm7uel-HFgvyJJ5kM0QXtP7xV_Mus00UI_t7Uh2t7tCJr7U7iTXYvho-eUDq4i_TQaGGpvNEugls1CTvJA"
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
        console.error("Error fetching alerts:", error.message);
return error.response.status
    }
}