import {
    PublicClientApplication,InteractionType
  } from "@azure/msal-browser";
export const initializeMSAL = async () => {
    const clientId = process.env.AZURE_AD_CLIENT_ID||"2ea6912c-63ad-43c9-825b-8cd0fbd4d369";
    const tenantId = process.env.AZURE_AD_TENANT_ID|| "8e4ffc3c-99c8-4eab-bb00-a1c1dd3f33ba";
   
    const msalConfig:any = {
      auth: {
        clientId: clientId,
        authority:`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
        redirectUri: 'http://localhost:3000',
      },
      cache: {
        cacheLocation: 'localStorage', // Change cacheLocation to localStorage
        storeAuthStateInCookie: true,
      },
    };

    const pca = await PublicClientApplication.createPublicClientApplication(msalConfig);

    return pca;
  };
