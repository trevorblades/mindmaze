import PropTypes from 'prop-types';
import React, {createContext, useContext} from 'react';
import {Plane} from '@react-three/drei';

export const WALL_HEIGHT = 5;
export const WALL_WIDTH = (WALL_HEIGHT * 4) / 3;

export const DoorContext = createContext();

export default function Door({rotation, position, ...props}) {
  const {cells, currentCell, orientation, openDoor} = useContext(DoorContext);
  const direction = props[orientation] || orientation;
  return currentCell[direction] ? null : (
    <Plane
      args={[WALL_HEIGHT / 2, WALL_HEIGHT / 1.5]}
      rotation={rotation}
      position={position}
      onClick={() => {
        const cellIndex = cells.findIndex(cell => {
          switch (direction) {
            case 'top':
              return cell.x === currentCell.x && cell.y === currentCell.y - 1;
            case 'right':
              return cell.x === currentCell.x + 1 && cell.y === currentCell.y;
            case 'bottom':
              return cell.x === currentCell.x && cell.y === currentCell.y + 1;
            case 'left':
              return cell.x === currentCell.x - 1 && cell.y === currentCell.y;
            default:
          }
        });
        openDoor(cellIndex);
      }}
    >
      <meshStandardMaterial color="aqua" />
    </Plane>
  );
}

Door.propTypes = {
  rotation: PropTypes.array,
  position: PropTypes.array.isRequired
};
