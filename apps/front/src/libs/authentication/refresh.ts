import { layoutApolloClient } from '../../../apollo-client';
import { RefreshDocument, RefreshRequest } from '../../graphql/generated';
import { login } from './login';

export const refreshAuth = async (request: RefreshRequest) => {
  const result = await layoutApolloClient.mutate({
    mutation: RefreshDocument,
    variables: {
      request,
    },
  });

  return result.data!.refresh;
};

export const refresh = async (address: string) => {
  console.log('refresh: address', address);

  const authenticationResult = await login(address);

  const refreshResult = await refreshAuth({
    refreshToken: authenticationResult!.refreshToken,
  });
  console.log('refresh: result', refreshResult);

  return refreshResult;
};

// (async () => {
//   await refresh();
// })();