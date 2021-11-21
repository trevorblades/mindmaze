import PropTypes from 'prop-types';
import React from 'react';
import {Box, SimpleGrid, Square} from '@chakra-ui/react';
import {
  FaArrowAltCircleDown,
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaArrowAltCircleUp
} from 'react-icons/fa';

export default function Minimap({cells, currentIndex, orientation}) {
  return (
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
  currentIndex: PropTypes.number.isRequired,
  orientation: PropTypes.string.isRequired
};
