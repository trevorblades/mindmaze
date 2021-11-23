import Door, {DOOR_HEIGHT} from './Door';
import Minimap from './Minimap';
import PropTypes from 'prop-types';
import Question from './Question';
import React, {Suspense, useState} from 'react';
import {Box, Plane, useTexture} from '@react-three/drei';
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

function Cube() {
  const {map, normalMap, roughnessMap} = useTexture({
    map: 'https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/materials/marble/Marble006_1K_Color.jpg',
    normalMap:
      'https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/materials/marble/Marble006_1K_Normal.jpg',
    roughnessMap:
      'https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/materials/marble/Marble006_1K_Roughness.jpg'
  });
  return (
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
      <meshStandardMaterial
        map={map}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
      />
    </Box>
  );
}

function Floor() {
  const wood = useTexture({
    aoMap:
      'https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/materials/wood-floor-43/WoodFloor043_1K_AmbientOcclusion.jpg',
    map: 'https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/materials/wood-floor-43/WoodFloor043_1K_Color.jpg',
    displacementMap:
      'https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/materials/wood-floor-43/WoodFloor043_1K_Displacement.jpg',
    metalnessMap:
      'https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/materials/wood-floor-43/WoodFloor043_1K_Metalness.jpg',
    normalMap:
      'https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/materials/wood-floor-43/WoodFloor043_1K_Normal.jpg',
    roughnessMap:
      'https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/materials/wood-floor-43/WoodFloor043_1K_Roughness.jpg'
  });
  return (
    <Plane
      receiveShadow
      args={[WALL_WIDTH, WALL_WIDTH]}
      rotation={[Math.PI / -2, 0, 0]}
      position={[0, WALL_HEIGHT / -2, 0]}
    >
      <meshStandardMaterial {...wood} />
    </Plane>
  );
}

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
          <Suspense fallback={null}>
            <ambientLight intensity={0.4} />
            <group rotation={[0, ROOM_ROTATION[orientation], 0]}>
              <pointLight
                castShadow
                intensity={0.5}
                position={[0, WALL_HEIGHT, 0]}
              />
              <Floor />
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
              <Cube />
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
          </Suspense>
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
        position={position}
        currentIndex={currentIndex}
        orientation={orientation}
      />
    </>
  );
}

Maze.propTypes = {
  maze: PropTypes.object.isRequired
};
