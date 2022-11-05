import { gql } from '@apollo/client'

export const PUBLICATION_BY_PROJECT_QUERY = gql`
  query Publications($request: PublicationsQueryRequest!) {
    publications(request: $request) {
      items {
        __typename
      }
      pageInfo {
        prev
        next
        totalCount
      }
    }
  }
`
