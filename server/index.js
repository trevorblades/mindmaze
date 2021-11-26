import TrivaAPI from './datasources/trivia.js';
import generate from 'generate-maze';
import {ApolloServer, gql} from 'apollo-server';

const typeDefs = gql`
  type Query {
    maze(size: Int!, category: ID, difficulty: String): Maze!
    categories: [Category!]!
  }

  type Maze {
    seed: Int!
    cells: [Cell!]!
  }

  type Cell {
    x: Int!
    y: Int!
    top: Boolean!
    right: Boolean!
    bottom: Boolean!
    left: Boolean!
    question: Question
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
    async maze(_, {size, ...params}, {dataSources}) {
      const seed = Math.round(Date.now() / 1000);
      const amount = size ** 2 - 1;
      // TODO: limited to 50, paginate for higher amounts (ie. 8 and greater)
      const questions = await dataSources.triviaAPI.getQuestions({
        amount,
        ...params
      });
      return {
        seed,
        cells: generate(size, size, true, seed)
          .flat()
          .map((cell, index) => ({
            ...cell,
            question: questions[index - 1]
          }))
      };
    },
    categories: (_, __, {dataSources}) => dataSources.triviaAPI.getCategories()
  },
  Question: {
    correctAnswer: question => question.correct_answer,
    incorrectAnswers: question => question.incorrect_answers
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  dataSources: () => ({
    triviaAPI: new TrivaAPI()
  })
});

server.listen().then(({url}) => {
  console.log(`🃏 Server ready at ${url}`);
});
