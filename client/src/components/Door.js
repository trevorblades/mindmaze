import PropTypes from 'prop-types';
import React, {createContext, useContext} from 'react';
import {Box, Sphere} from '@react-three/drei';

export const DOOR_HEIGHT = 3;
const DOOR_WIDTH = DOOR_HEIGHT / 2;
const DOOR_DEPTH = 0.05;
const KNOB_RADIUS = 0.1;

export const DoorContext = createContext();

export default function Door({position, rotation, getCellIndex}) {
  const {openDoor, setHovered} = useContext(DoorContext);
  return (
    <group
      rotation={rotation}
      position={position}
      onClick={() => openDoor(getCellIndex)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Box
        receiveShadow
        args={[DOOR_WIDTH, DOOR_HEIGHT, DOOR_DEPTH]}
        position={[0, 0, DOOR_DEPTH / 2]}
      >
        <meshStandardMaterial color="aqua" />
      </Box>
      <Sphere
        castShadow
        receiveShadow
        args={[KNOB_RADIUS]}
        position={[DOOR_WIDTH / 3, 0, DOOR_DEPTH + KNOB_RADIUS]}
      >
        <meshStandardMaterial color="hotpink" />
      </Sphere>
    </group>
  );
}

Door.propTypes = {
  rotation: PropTypes.array,
  position: PropTypes.array.isRequired,
  getCellIndex: PropTypes.func.isRequired
};
