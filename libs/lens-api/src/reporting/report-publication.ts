import { apolloClient } from '../apollo-client';
import { login } from '../authentication/login';
import { getAddressFromSigner } from '../ethers.service';
import {
  PublicationReportingReason,
  PublicationReportingSensitiveSubreason,
  ReportPublicationDocument,
  ReportPublicationRequest,
} from '../graphql/generated';

const reportPublicationRequest = async (request: ReportPublicationRequest) => {
  const result = await apolloClient.mutate({
    mutation: ReportPublicationDocument,
    variables: {
      request,
    },
  });

  return result.data!.reportPublication;
};

export const reportPublication = async () => {
  const address = getAddressFromSigner();
  console.log('report publication: address', address);

  await login(address);

  await reportPublicationRequest({
    publicationId: '0x0f-0x01',
    reason: {
      sensitiveReason: {
        reason: PublicationReportingReason.Sensitive,
        subreason: PublicationReportingSensitiveSubreason.Offensive,
      },
    },
    additionalComments: 'Testing report!',
  });

  console.log('report publication: success');
};

(async () => {
  await reportPublication();
})();
