import PropTypes from 'prop-types';
import React from 'react';
import {Box, SimpleGrid, Square} from '@chakra-ui/react';
import {
  FaArrowAltCircleDown,
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaArrowAltCircleUp
} from 'react-icons/fa';

export default function Minimap({cells, position, currentIndex, orientation}) {
  return (
    <SimpleGrid
      columns={Math.sqrt(cells.length)}
      pos="absolute"
      top="4"
      left="4"
      spacing="0.5"
      p="0.5"
      bg="white"
    >
      {cells.map((cell, index, array) => (
        <Square
          key={index}
          size="6"
          borderWidth="3px"
          borderColor={index === array.length - 1 ? 'red.300' : 'black'}
          borderTopColor={!cell.top && 'transparent'}
          borderRightColor={!cell.right && 'transparent'}
          borderBottomColor={!cell.bottom && 'transparent'}
          borderLeftColor={!cell.left && 'transparent'}
          bg={!position.includes(index) && 'black'}
        >
          {index === currentIndex && (
            <Box
              as={
                orientation === 'top'
                  ? FaArrowAltCircleUp
                  : orientation === 'right'
                  ? FaArrowAltCircleRight
                  : orientation === 'bottom'
                  ? FaArrowAltCircleDown
                  : FaArrowAltCircleLeft
              }
              color="red.500"
            />
          )}
        </Square>
      ))}
    </SimpleGrid>
  );
}

Minimap.propTypes = {
  cells: PropTypes.array.isRequired,
  position: PropTypes.array.isRequired,
  currentIndex: PropTypes.number.isRequired,
  orientation: PropTypes.string.isRequired
};
