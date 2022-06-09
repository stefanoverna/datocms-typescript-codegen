import { request as graphqlRequest } from 'graphql-request';
import { RequestDocument } from 'graphql-request/dist/types';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';

export function request<TDocument = any, TVariables = Record<string, any>>(
  document: RequestDocument | TypedDocumentNode<TDocument, TVariables>,
  variables?: TVariables,
) {
  return graphqlRequest<TDocument, TVariables>(
    'http://graphql.lvh.me:3001/',
    document,
    variables,
    {
      Authorization:
        'Bearer faeb9172e232a75339242faafb9e56de8c8f13b735f7090964',
      'X-Exclude-Invalid': 'true',
    },
  );
}
