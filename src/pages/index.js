import React, {useState} from 'react';
import generate from 'generate-maze';
import {Box, Button, ButtonGroup, Circle, Flex, Square} from '@chakra-ui/react';

export default function HomePage() {
  const [position, setPosition] = useState({x: 0, y: 0});
  const rows = generate(8, 8, true, 123456);
  const currentCell = rows[position.y][position.x];
  return (
    <Flex>
      <ButtonGroup>
        <Button
          isDisabled={currentCell.top}
          onClick={() => setPosition(prev => ({...prev, y: prev.y - 1}))}
        >
          Top
        </Button>
        <Button
          isDisabled={currentCell.right}
          onClick={() => setPosition(prev => ({...prev, x: prev.x + 1}))}
        >
          Right
        </Button>
        <Button
          isDisabled={currentCell.bottom}
          onClick={() => setPosition(prev => ({...prev, y: prev.y + 1}))}
        >
          Bottom
        </Button>
        <Button
          isDisabled={currentCell.left}
          onClick={() => setPosition(prev => ({...prev, x: prev.x - 1}))}
        >
          Left
        </Button>
      </ButtonGroup>
      <Box borderWidth="1px" borderColor="black">
        {rows.map((cells, rowIndex) => {
          const isLastRow = rowIndex === rows.length - 1;
          return (
            <Flex key={rowIndex}>
              {cells.map((cell, index, array) => {
                const isLastCell = index === array.length - 1;
                return (
                  <Square
                    key={index}
                    size="10"
                    borderColor="black"
                    borderTopWidth={cell.top && '1px'}
                    borderRightWidth={cell.right && '1px'}
                    borderBottomWidth={cell.bottom && '1px'}
                    borderLeftWidth={cell.left && '1px'}
                    bg={isLastRow && isLastCell && 'red.300'}
                  >
                    {cell === currentCell && <Circle size="3" bg="red.500" />}
                  </Square>
                );
              })}
            </Flex>
          );
        })}
      </Box>
    </Flex>
  );
}
