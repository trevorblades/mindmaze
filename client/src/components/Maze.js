import Door, {DOOR_HEIGHT} from './Door';
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

const WALL_HEIGHT = 5;
const WALL_WIDTH = (WALL_HEIGHT * 4) / 3;
const DOOR_Y = (WALL_HEIGHT - DOOR_HEIGHT) / -2;

const ROOM_ROTATION = {
  top: 0,
  right: Math.PI / 2,
  bottom: Math.PI,
  left: Math.PI / -2
};

export default function Maze({maze}) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [position, setPosition] = useState([0]);
  const [door, setDoor] = useState(null);

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

  function openDoor(getCellIndex) {
    const cellIndex = cells.findIndex(getCellIndex);
    if (!position.includes(cellIndex)) {
      setDoor(cellIndex);
      onOpen();
    } else {
      addPosition(cellIndex);
    }
  }

  return (
    <>
      <chakra.div h="100vh">
        <Canvas shadows>
          <ambientLight intensity={0.5} />
          <group rotation={[0, ROOM_ROTATION[orientation], 0]}>
            <pointLight castShadow position={[10, 10, 10]} intensity={0.5} />
            <pointLight
              castShadow
              position={[-3, 5, -3]}
              color="purple"
              intensity={1}
            />
            <Plane
              receiveShadow
              args={[WALL_WIDTH, WALL_WIDTH]}
              rotation={[Math.PI / -2, 0, 0]}
              position={[0, WALL_HEIGHT / -2, 0]}
            >
              <meshStandardMaterial color="tan" />
            </Plane>
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
              rotation={[0, Math.PI / -2, 0]}
              position={[WALL_WIDTH / 2, 0, 0]}
            >
              <meshStandardMaterial color="red" />
            </Plane>
            <Plane
              receiveShadow
              args={[WALL_WIDTH, WALL_HEIGHT]}
              position={[0, 0, WALL_WIDTH / -2]}
            >
              <meshStandardMaterial color="yellow" />
            </Plane>
            <Plane
              receiveShadow
              args={[WALL_WIDTH, WALL_HEIGHT]}
              rotation={[0, Math.PI, 0]}
              position={[0, 0, WALL_WIDTH / 2]}
            >
              <meshStandardMaterial color="blue" />
            </Plane>
            <Box
              castShadow
              receiveShadow
              rotation={[0, Math.PI / 3, 0]}
              position={[1, WALL_HEIGHT / -2 + 0.5, 1]}
              onClick={event => {
                event.stopPropagation();
                alert('box');
              }}
            >
              <meshStandardMaterial color="lightgrey" />
            </Box>
            {!currentCell.top && orientation !== 'bottom' && (
              <Door
                position={[0, DOOR_Y, WALL_WIDTH / -2]}
                onClick={() =>
                  openDoor(
                    cell =>
                      cell.x === currentCell.x && cell.y === currentCell.y - 1
                  )
                }
              />
            )}
            {!currentCell.right && orientation !== 'left' && (
              <Door
                rotation={[0, Math.PI / -2, 0]}
                position={[WALL_WIDTH / 2, DOOR_Y, 0]}
                onClick={() =>
                  openDoor(
                    cell =>
                      cell.x === currentCell.x + 1 && cell.y === currentCell.y
                  )
                }
              />
            )}
            {!currentCell.bottom && orientation !== 'top' && (
              <Door
                rotation={[0, Math.PI, 0]}
                position={[0, DOOR_Y, WALL_WIDTH / 2]}
                onClick={() =>
                  openDoor(
                    cell =>
                      cell.x === currentCell.x && cell.y === currentCell.y + 1
                  )
                }
              />
            )}
            {!currentCell.left && orientation !== 'right' && (
              <Door
                rotation={[0, Math.PI / 2, 0]}
                position={[WALL_WIDTH / -2, DOOR_Y, 0]}
                onClick={() =>
                  openDoor(
                    cell =>
                      cell.x === currentCell.x - 1 && cell.y === currentCell.y
                  )
                }
              />
            )}
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
