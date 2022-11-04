import { gql } from '@apollo/client'

export const AuthChallengeQuery = gql`
query Challenge($request: ChallengeRequest!) {
  challenge(request: $request) {
    text
  }
}
`
