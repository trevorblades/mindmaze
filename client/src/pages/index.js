import Maze from '../components/Maze';
import React from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Radio,
  RadioGroup,
  Select
} from '@chakra-ui/react';
import {gql, useLazyQuery} from '@apollo/client';
import {graphql, useStaticQuery} from 'gatsby';

const GET_MAZE = gql`
  query GetMaze($size: Int!, $category: ID, $difficulty: String) {
    maze(size: $size, category: $category, difficulty: $difficulty) {
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
  const {mindmaze} = useStaticQuery(
    graphql`
      query ListCategories {
        mindmaze {
          categories {
            id
            name
          }
        }
      }
    `
  );

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
    <form
      onSubmit={event => {
        event.preventDefault();
        const {category, difficulty} = event.target;
        getMaze({
          variables: {
            size: 7,
            category: category.value || null,
            difficulty: difficulty.value || null
          }
        });
      }}
    >
      <Button type="submit">Start game</Button>
      <FormControl>
        <FormLabel>Category</FormLabel>
        <Select name="category">
          <option value="">All categories</option>
          {mindmaze.categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Difficulty</FormLabel>
        <RadioGroup name="difficulty">
          <HStack>
            <Radio value="">All</Radio>
            <Radio value="easy">Easy</Radio>
            <Radio value="medium">Medium</Radio>
            <Radio value="hard">Hard</Radio>
          </HStack>
        </RadioGroup>
      </FormControl>
    </form>
  );
}
