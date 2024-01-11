// services/graphService.ts
import { Client } from '@microsoft/microsoft-graph-client';

const getClient = (accessToken: string) => {
  return Client.init({
    authProvider: (done) => {
      done(null, accessToken);
    },
  });
};

export const getSignInLogs = async (accessToken: string) => {
    debugger
  const client = getClient(accessToken);

  try {
    const result = await client
      .api('/auditLogs/signIns')
      .get();

    return result.value;
  } catch (error) {
    console.error('Error fetching sign-in logs:', error);
    throw error;
  }
};
