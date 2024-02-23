import { initializeMSAL } from "./initalizeMSAL";

export const getToken = async () => {
  const msalInstance = await initializeMSAL();
  try {
    const tokenRequest = {
      scopes: ['https://management.azure.com/user_impersonation'],
  };
        const response = await msalInstance.acquireTokenSilent(tokenRequest);
        return response.accessToken;
  }
   catch (error: any) {

     return await login(msalInstance);
       
    }
  };
  export const login = async (msalInstance:any) => {
    const loginRequest = {
        scopes: ['openid', 'profile', 'https://management.azure.com/user_impersonation']
    };

    try {
        const response = await msalInstance.loginPopup(loginRequest);
        return response;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}