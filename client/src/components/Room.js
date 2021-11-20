import React from 'react';
import {Box, Plane} from '@react-three/drei';

const WALL_HEIGHT = 5;
const WALL_WIDTH = (WALL_HEIGHT * 4) / 3;

export default function Room() {
  return (
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
        <meshStandardMaterial color="turquoise" />
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
      >
        <meshStandardMaterial color="lightgrey" />
      </Box>
      <Plane
        args={[WALL_HEIGHT / 2, WALL_HEIGHT / 1.5]}
        position={[0, WALL_HEIGHT / 3 / -2, WALL_HEIGHT / -2]}
        onClick={() => alert('door')}
      >
        <meshStandardMaterial color="red" />
      </Plane>
    </group>
  );
}
