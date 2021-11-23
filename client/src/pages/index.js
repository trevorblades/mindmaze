import Maze from '../components/Maze';
import React from 'react';
import {Button} from '@chakra-ui/react';
import {gql, useLazyQuery} from '@apollo/client';

const GET_MAZE = gql`
  query GetMaze($size: Int!) {
    maze(size: $size) {
      seed
      cells {
        x
        y
        top
        right
        bottom
        left
        question {
          category
          question
          correctAnswer
          incorrectAnswers
        }
      }
    }
  }
`;

export default function HomePage() {
  const [getMaze, {loading, error, data}] = useLazyQuery(GET_MAZE, {
    variables: {size: 7}
  });

  if (data) {
    return <Maze maze={data.maze} />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <Button onClick={getMaze}>Start game</Button>
    </div>
  );
}
