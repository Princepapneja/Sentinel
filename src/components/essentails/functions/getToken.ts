import { initializeMSAL } from "./initalizeMSAL";

export const getToken = async () => {
    try {
      const pca = await initializeMSAL();
      const loginRequest = {
        scopes: ['openid', 'profile', 'user.read', 'SecurityEvents.Read.All'],
      };
      
      const loginResponse = await pca.loginPopup(loginRequest);
   
      const myAccounts = await pca.getAllAccounts();
    //   localStorage.setItem("token", loginResponse.accessToken)
      const urlTanets = myAccounts?.[0]?.username?.split("@")[1];
      return loginResponse
    } catch (error) {
      console.error('Error during login:', error);
    }
  };