import Door, {DoorContext} from './Door';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import Room from './Room';
import {
  Box,
  ButtonGroup,
  Center,
  Circle,
  SimpleGrid,
  Square
} from '@chakra-ui/react';
import {Canvas} from '@react-three/fiber';

export default function Maze({maze}) {
  const [position, setPosition] = useState([0]);
  const {cells, seed} = maze;
  const currentIndex = position[0];
  const currentCell = cells[position[0]];
  return (
    <>
      <Box h="100vh">
        <Canvas shadows>
          <ambientLight />
          <pointLight castShadow position={[10, 10, 10]} />
          <Room />
        </Canvas>
      </Box>
      <Center h="100vh">
        <DoorContext.Provider
          value={{
            cells,
            seed,
            position,
            setPosition
          }}
        >
          <ButtonGroup key={currentIndex}>
            {!currentCell.top && (
              <Door label="top" x={0} y={currentCell.y - 1} />
            )}
            {!currentCell.right && (
              <Door label="right" x={currentCell.x + 1} y={currentCell.y} />
            )}
            {!currentCell.bottom && (
              <Door label="bottom" x={currentCell.x} y={currentCell.y + 1} />
            )}
            {!currentCell.left && (
              <Door label="left" x={currentCell.x - 1} y={currentCell.y} />
            )}
          </ButtonGroup>
        </DoorContext.Provider>
      </Center>
      <SimpleGrid
        columns={Math.sqrt(cells.length)}
        borderWidth="1px"
        borderColor="black"
        pos="absolute"
        top="4"
        left="4"
        bg="white"
      >
        {cells.map((cell, index, array) => (
          <Square
            key={index}
            size="6"
            borderColor="black"
            borderTopWidth={cell.top && '1px'}
            borderRightWidth={cell.right && '1px'}
            borderBottomWidth={cell.bottom && '1px'}
            borderLeftWidth={cell.left && '1px'}
            bg={index === array.length - 1 && 'red.300'}
          >
            {index === position[0] && <Circle size="3" bg="red.500" />}
          </Square>
        ))}
      </SimpleGrid>
    </>
  );
}

Maze.propTypes = {
  maze: PropTypes.object.isRequired
};
