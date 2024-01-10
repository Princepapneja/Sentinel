// import { AuthOptions } from "next-auth";
// import AzureADProvider from "next-auth/providers/azure-ad";


// export const authOptions: AuthOptions = {
//     pages: {
//         signIn: "/",
//     }, providers: [
//         AzureADProvider({
//             clientId: process.env.AZURE_AD_CLIENT_ID!,
//             clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
//             tenantId: process.env.AZURE_AD_TENANT_ID,
//         }),
//     ],

// };
import { refreshToken } from "@/components/essentails/functions/refreshToken";
import moment from "moment";
import { AuthOptions } from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";

export const authOptions: AuthOptions = {
    // Configure one or more authentication providers
    providers: [
        AzureADProvider({
            clientId: process.env.AZURE_AD_CLIENT_ID!,
            clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
            tenantId: process.env.AZURE_AD_TENANT_ID!,
            authorization: { params: { scope: "openid profile user.Read email SecurityEvents.Read.All" } },
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                // console.log(account,token,"account");

                token.idToken = account.id_token;
                token.accessToken = account.access_token;
                console.log(account, "account");


            }
            return token;
        },
        async session({ session, token }: any) {
            // Fetch additional data from Microsoft Sentinel using the access token
            // const timeDifference = moment(token?.exp * 1000).diff(moment()); // Multiply by 1000 to convert seconds to milliseconds
            // console.log(timeDifference);


            // if (timeDifference > 0) {
            //     // Token is not expired yet, set up interval to refresh 1 minute before expiration
            //     //          setInterval(async () => {
            //     //    let accessToken= await  refreshToken();
            //     //         session["token"] = accessToken
            //     //         return session;
            //     //           }, timeDifference - 60000);
            // const accessToken = token?.accessToken;

            //     session["token"] = accessToken
            //     return session;
            //     // Cleanup function to clear the interval on component unmount or when not needed
            // } else {
            //     // Token has already expired, refresh it immediately
            //     let accessToken = await refreshToken(token);
            //     session["token"] = accessToken
            //     return session;
            // }
            //   }
            const accessToken = token?.accessToken;

                session["token"] = accessToken
                return session;


        },

    },
}