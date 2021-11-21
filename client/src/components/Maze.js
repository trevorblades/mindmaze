import Door, {DoorContext, WALL_HEIGHT, WALL_WIDTH} from './Door';
import Minimap from './Minimap';
import PropTypes from 'prop-types';
import Question from './Question';
import React, {useState} from 'react';
import {Box, Plane} from '@react-three/drei';
import {
  Button,
  Modal,
  ModalOverlay,
  chakra,
  useDisclosure
} from '@chakra-ui/react';
import {Canvas} from '@react-three/fiber';

export default function Maze({maze}) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [position, setPosition] = useState([0]);
  const [door, setDoor] = useState(null);

  const {cells, seed} = maze;
  const [currentIndex, prevIndex] = position;
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

  return (
    <>
      <chakra.div h="100vh">
        <Canvas shadows>
          <ambientLight />
          <pointLight castShadow position={[10, 10, 10]} />
          <group>
            <Plane
              receiveShadow
              args={[WALL_WIDTH, WALL_HEIGHT]}
              rotation={[0, Math.PI / 2, 0]}
              position={[WALL_WIDTH / -2, 0, 0]}
            >
              <meshStandardMaterial color="green" />
            </Plane>
            <Plane
              receiveShadow
              args={[WALL_WIDTH, WALL_HEIGHT]}
              rotation={[Math.PI / -2, 0, 0]}
              position={[0, WALL_HEIGHT / -2, 0]}
            >
              <meshStandardMaterial color="tan" />
            </Plane>
            <Plane
              receiveShadow
              args={[WALL_WIDTH, WALL_HEIGHT]}
              rotation={[0, Math.PI / -2, 0]}
              position={[WALL_WIDTH / 2, 0, 0]}
            >
              <meshStandardMaterial color="red" />
            </Plane>
            <Plane
              receiveShadow
              args={[WALL_WIDTH, WALL_HEIGHT]}
              position={[0, 0, WALL_HEIGHT / -2]}
            >
              <meshStandardMaterial color="yellow" />
            </Plane>
            <Box
              castShadow
              receiveShadow
              rotation={[0, Math.PI / 3, 0]}
              position={[1, WALL_HEIGHT / -2 + 0.5, 0]}
              onClick={event => {
                event.stopPropagation();
                alert('box');
              }}
            >
              <meshStandardMaterial color="lightgrey" />
            </Box>
            <DoorContext.Provider
              value={{
                cells,
                currentCell: cells[currentIndex],
                orientation,
                openDoor(cellIndex) {
                  if (!position.includes(cellIndex)) {
                    setDoor(cellIndex);
                    onOpen();
                  } else {
                    addPosition(cellIndex);
                  }
                }
              }}
            >
              <Door position={[0, WALL_HEIGHT / 3 / -2, WALL_HEIGHT / -2]} />
              <Door
                top="right"
                right="bottom"
                bottom="left"
                left="top"
                rotation={[0, Math.PI / -2, 0]}
                position={[WALL_WIDTH / 2, WALL_HEIGHT / 3 / -2, 0]}
              />
              <Door
                top="left"
                right="top"
                bottom="right"
                left="bottom"
                rotation={[0, Math.PI / 2, 0]}
                position={[WALL_WIDTH / -2, WALL_HEIGHT / 3 / -2, 0]}
              />
            </DoorContext.Provider>
          </group>
        </Canvas>
      </chakra.div>
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
        {Number.isInteger(door) && (
          <Question
            seed={seed}
            data={cells[door].question}
            onCorrect={() => {
              addPosition(door);
              onClose();
            }}
            onClose={onClose}
          />
        )}
      </Modal>
      <Minimap
        cells={cells}
        currentIndex={currentIndex}
        orientation={orientation}
      />
    </>
  );
}

Maze.propTypes = {
  maze: PropTypes.object.isRequired
};
