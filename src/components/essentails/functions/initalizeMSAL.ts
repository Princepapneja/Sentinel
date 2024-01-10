import {
    PublicClientApplication,InteractionType
  } from "@azure/msal-browser";
export const initializeMSAL = async () => {
    const clientId = '3d3a42fb-58ae-4fd9-a69f-8f27294e940f';
    const tenantId = '859e22dd-3386-4991-a003-379cc967d6e4';
    
console.log(clientId);
    const msalConfig = {
      auth: {
        clientId: clientId,
        authority: `https://login.microsoftonline.com/${tenantId}`,
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: true,
      },
    };

    const pca = await PublicClientApplication.createPublicClientApplication(msalConfig);

    return pca;
  };
