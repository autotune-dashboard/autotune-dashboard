import { authStore } from './auth';
import { FetchStore } from '@utils';
// import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

export interface IApp {
  name: string;
  key: string;
}

const gqlAppsQuery = gql(`
{
  viewer {
    username
    applications {
      name
      key
      experiments {
        name
        started
        options {
            name
            completed
            payoff
        }
      }
    }
  }
}`);

// const client = new ApolloClient({
//   uri: 'https://wnzihyd3zndg3i3zdo6ijwslze.appsync-api.us-west-2.amazonaws.com/graphql',
//   headers: {
//     'Authorization': authStore.data.accessToken
//   }
// });

// client.query({
//   query: gqlAppsQuery
// }).then(r => console.log(r));

export class AppsStore extends FetchStore<IApp[]> {
  protected promise() {
    const headers = new Headers();
    headers.set('Cache-Control', 'no-cache');
    headers.set('Content-Type', 'application/json');
    headers.set('Authorization', authStore.data.accessToken);
    return fetch('https://wnzihyd3zndg3i3zdo6ijwslze.appsync-api.us-west-2.amazonaws.com/graphql', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: gqlAppsQuery
      })
    }).then(response => {
      return response.body as any as IApp[];
    });
  }
}

export const appsStore = new AppsStore();

(window as any).apps = appsStore;