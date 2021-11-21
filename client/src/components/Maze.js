import PropTypes from 'prop-types';
import Question from './Question';
import React, {useState} from 'react';
import Room from './Room';
import {
  Box,
  Button,
  Circle,
  Modal,
  ModalOverlay,
  SimpleGrid,
  Square,
  useDisclosure
} from '@chakra-ui/react';
import {Canvas} from '@react-three/fiber';

export default function Maze({maze}) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [position, setPosition] = useState([0]);
  const [question, setQuestion] = useState(null);

  const {cells, seed} = maze;
  const [currentIndex, prevIndex] = position;
  const currentCell = cells[currentIndex];

  const orientation =
    !Number.isInteger(prevIndex) || currentIndex - prevIndex === 1
      ? 'right'
      : prevIndex < currentIndex
      ? 'bottom'
      : prevIndex - currentIndex === 1
      ? 'left'
      : 'top';

  function addPosition(pos) {
    setPosition(prev => [pos, ...prev]);
  }

  function openDoor(cellIndex) {
    if (!position.includes(cellIndex)) {
      setQuestion(cellIndex);
      onOpen();
    } else {
      addPosition(cellIndex);
    }
  }

  return (
    <>
      <Box h="100vh">
        <Canvas shadows>
          <ambientLight />
          <pointLight castShadow position={[10, 10, 10]} />
          <Room
            orientation={orientation}
            currentCell={currentCell}
            onDoorClick={openDoor}
            cells={cells}
          />
        </Canvas>
      </Box>
      {Number.isInteger(prevIndex) && (
        <Button
          pos="absolute"
          bottom="4"
          left="50%"
          transform="translateX(-50%)"
          onClick={() => addPosition(prevIndex)}
          colorScheme="blue"
        >
          Go back
        </Button>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        {Number.isInteger(question) && (
          <Question
            seed={seed}
            data={cells[question].question}
            onCorrect={() => {
              addPosition(question);
              onClose();
            }}
            onClose={onClose}
          />
        )}
      </Modal>
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
            {index === currentIndex && <Circle size="3" bg="red.500" />}
          </Square>
        ))}
      </SimpleGrid>
    </>
  );
}

Maze.propTypes = {
  maze: PropTypes.object.isRequired
};
