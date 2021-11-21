import PropTypes from 'prop-types';
import React from 'react';
import {Box, Plane} from '@react-three/drei';

const WALL_HEIGHT = 5;
const WALL_WIDTH = (WALL_HEIGHT * 4) / 3;

const ORIENTATION_MAP = {
  top: {
    left: 'left',
    right: 'right'
  },
  right: {
    left: 'top',
    right: 'bottom'
  },
  bottom: {
    left: 'right',
    right: 'left'
  },
  left: {
    left: 'bottom',
    right: 'top'
  }
};

function Door(props) {
  return (
    <Plane
      args={[WALL_HEIGHT / 2, WALL_HEIGHT / 1.5]}
      onClick={() => alert('door')}
      {...props}
    >
      <meshStandardMaterial color="aqua" />
    </Plane>
  );
}

export default function Room({orientation, currentCell, onDoorClick, cells}) {
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
      {!currentCell[orientation] && (
        <Door
          position={[0, WALL_HEIGHT / 3 / -2, WALL_HEIGHT / -2]}
          onClick={() => {
            const cellIndex = cells.findIndex(cell => {
              switch (orientation) {
                case 'top':
                  return (
                    cell.x === currentCell.x && cell.y === currentCell.y - 1
                  );
                case 'right':
                  return (
                    cell.x === currentCell.x + 1 && cell.y === currentCell.y
                  );
                case 'bottom':
                  return (
                    cell.x === currentCell.x && cell.y === currentCell.y + 1
                  );
                case 'left':
                  return (
                    cell.x === currentCell.x - 1 && cell.y === currentCell.y
                  );
                default:
              }
            });
            onDoorClick(cellIndex);
          }}
        />
      )}
      {!currentCell[ORIENTATION_MAP[orientation].right] && (
        <Door
          rotation={[0, Math.PI / -2, 0]}
          position={[WALL_WIDTH / 2, WALL_HEIGHT / 3 / -2, 0]}
          onClick={() => {
            const or = ORIENTATION_MAP[orientation].right;
            const cellIndex = cells.findIndex(cell => {
              switch (or) {
                case 'top':
                  return (
                    cell.x === currentCell.x && cell.y === currentCell.y - 1
                  );
                case 'right':
                  return (
                    cell.x === currentCell.x + 1 && cell.y === currentCell.y
                  );
                case 'bottom':
                  return (
                    cell.x === currentCell.x && cell.y === currentCell.y + 1
                  );
                case 'left':
                  return (
                    cell.x === currentCell.x - 1 && cell.y === currentCell.y
                  );
                default:
              }
            });
            onDoorClick(cellIndex);
          }}
        />
      )}
      {!currentCell[ORIENTATION_MAP[orientation].left] && (
        <Door
          rotation={[0, Math.PI / 2, 0]}
          position={[WALL_WIDTH / -2, WALL_HEIGHT / 3 / -2, 0]}
          onClick={() => {
            const or = ORIENTATION_MAP[orientation].left;
            const cellIndex = cells.findIndex(cell => {
              switch (or) {
                case 'top':
                  return (
                    cell.x === currentCell.x && cell.y === currentCell.y - 1
                  );
                case 'right':
                  return (
                    cell.x === currentCell.x + 1 && cell.y === currentCell.y
                  );
                case 'bottom':
                  return (
                    cell.x === currentCell.x && cell.y === currentCell.y + 1
                  );
                case 'left':
                  return (
                    cell.x === currentCell.x - 1 && cell.y === currentCell.y
                  );
                default:
              }
            });
            onDoorClick(cellIndex);
          }}
        />
      )}
    </group>
  );
}

Room.propTypes = {
  orientation: PropTypes.string.isRequired,
  currentCell: PropTypes.object.isRequired,
  onDoorClick: PropTypes.func.isRequired,
  cells: PropTypes.array.isRequired
};
