import NextAuth from "next-auth"
import { authOptions } from "./option"

const handler= NextAuth(authOptions)
export { handler as GET, handler as POST}
// pages/api/auth/[...nextauth].ts
// import NextAuth, { AuthOptions } from "next-auth";
// import AzureADProvider from "next-auth/providers/azure-ad";

// const authOptions: AuthOptions = {
//   // Configure one or more authentication providers
//   providers: [
//     AzureADProvider({
//       clientId: process.env.AZURE_AD_CLIENT_ID!,
//       clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
//       tenantId: process.env.AZURE_AD_TENANT_ID!,
//       authorization: { params: { scope: "openid profile user.Read email" } },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, account }) {
//       // IMPORTANT: Persist the access_token to the token right after sign in
//       if (account) {
//         token.idToken = account.id_token;
//       }
//       return token;
//     },
//   },
// };

// export default NextAuth(authOptions);