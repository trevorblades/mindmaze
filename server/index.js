import TrivaAPI from './datasources/trivia.js';
import {ApolloServer, gql} from 'apollo-server';

const typeDefs = gql`
  type Query {
    questions(amount: Int!, category: ID, difficulty: String): [Question!]!
    categories: [Category!]!
  }

  type Question {
    category: String!
    question: String!
    correctAnswer: String!
    incorrectAnswers: [String!]!
  }

  type Category {
    id: ID!
    name: String!
  }
`;

const resolvers = {
  Query: {
    questions: (_, {amount}, {dataSources}) =>
      dataSources.triviaAPI.getQuestions({amount}),
    categories: (_, __, {dataSources}) => dataSources.triviaAPI.getCategories()
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    triviaAPI: new TrivaAPI()
  })
});

server.listen().then(({url}) => {
  console.log(`🃏  Server ready at ${url}`);
});
