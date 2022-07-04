import { URL } from "../config";

export const Mutation_Create = `
mutation{
  createChannel(name:$name){
    id,
    name
  }
}
`;

export const Subscription_Messages = `
subscription{
  writeMessages(channel:$channel){
    id,
    title,
    content,
    createdAt
  }
}
`;

export const Query_Messages = `
query{
  queryMessages{
    id,
    title,
    content,
    createdAt
  }
}
`;

export const queryData = (grl: string): Promise<Response> => {
  return fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: grl }),
  });
};
