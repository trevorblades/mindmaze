import React from 'react';
import {Box, Sphere} from '@react-three/drei';

export const DOOR_HEIGHT = 3;
const DOOR_WIDTH = DOOR_HEIGHT / 2;
const DOOR_DEPTH = 0.05;

const KNOB_RADIUS = 0.1;

export default function Door(props) {
  return (
    <group {...props}>
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
