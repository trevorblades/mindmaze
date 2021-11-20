import PropTypes from 'prop-types';
import Question from './Question';
import React, {createContext, useContext} from 'react';
import {Button, Modal, ModalOverlay, useDisclosure} from '@chakra-ui/react';

export const DoorContext = createContext();

export default function Door({x, y, label}) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {seed, cells, position, setPosition} = useContext(DoorContext);

  const cellIndex = cells.findIndex(cell => cell.x === x && cell.y === y);
  const {question} = cells[cellIndex];

  function addPosition() {
    setPosition(prev => [cellIndex, ...prev]);
  }

  return (
    <>
      <Button
        onClick={
          question && !position.includes(cellIndex) ? onOpen : addPosition
        }
      >
        {label}
      </Button>
      {question && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <Question
            seed={seed}
            data={question}
            onCorrect={addPosition}
            onClose={onClose}
          />
        </Modal>
      )}
    </>
  );
}

Door.propTypes = {
  label: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
};
