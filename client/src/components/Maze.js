import Door, {DoorContext} from './Door';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {ButtonGroup, Circle, Flex, SimpleGrid, Square} from '@chakra-ui/react';

export default function Maze({maze}) {
  const [position, setPosition] = useState([0]);
  const {cells, seed} = maze;
  const currentIndex = position[0];
  const currentCell = cells[position[0]];
  return (
    <Flex>
      <DoorContext.Provider
        value={{
          cells,
          seed,
          position,
          setPosition
        }}
      >
        <ButtonGroup key={currentIndex}>
          {!currentCell.top && <Door label="top" x={0} y={currentCell.y - 1} />}
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
      <SimpleGrid
        columns={Math.sqrt(cells.length)}
        borderWidth="1px"
        borderColor="black"
      >
        {cells.map((cell, index, array) => (
          <Square
            key={index}
            size="10"
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
    </Flex>
  );
}

Maze.propTypes = {
  maze: PropTypes.object.isRequired
};
