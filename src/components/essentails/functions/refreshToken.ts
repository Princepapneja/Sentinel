import { initializeMSAL } from "./initalizeMSAL";

export const refreshToken = async () => {
    try {
      const pca = await initializeMSAL();
      const loginRequest = {
        scopes: ['https://management.azure.com/user_impersonation'],


      };
      const accounts = pca.getAllAccounts();
      
      const response = await pca.acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
        // interactionType: InteractionType.Popup,
      });
    
    //   localStorage.setItem("token", response.accessToken)
      return response.accessToken
    } catch (error) {
      console.error('Error refreshing token:', error);
    }
  };