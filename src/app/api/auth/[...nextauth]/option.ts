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
            }
            return token;
        },
        async session({ session, token }: any) {
            // Fetch additional data from Microsoft Sentinel using the access token
            const accessToken = token?.accessToken;

            session["token"] = accessToken
            return session;
        },




    },
}