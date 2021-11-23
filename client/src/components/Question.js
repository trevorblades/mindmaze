import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  Stack,
  Text
} from '@chakra-ui/react';
import {decode} from 'he';
import {shuffle} from 'shuffle-seed';

export default function Question({seed, data, onCorrect, onClose}) {
  const [guesses, setGuesses] = useState([]);
  const [selected, setSelected] = useState('');

  const {question, correctAnswer, incorrectAnswers} = data;
  const answers = shuffle(
    [...incorrectAnswers, correctAnswer].map(answer => ({
      text: answer,
      isCorrect: answer === correctAnswer
    })),
    seed
  );

  return (
    <ModalContent>
      <ModalHeader>Question</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Text>{decode(question)}</Text>
        <RadioGroup value={selected} onChange={setSelected}>
          <Stack>
            {answers.map((answer, index) => {
              const value = index.toString();
              return (
                <Radio
                  isDisabled={guesses.includes(value)}
                  key={index}
                  value={value}
                >
                  {decode(answer.text)}
                </Radio>
              );
            })}
          </Stack>
        </RadioGroup>
      </ModalBody>
      <ModalFooter>
        <Button onClick={onClose} mr="2">
          Cancel
        </Button>
        <Button
          isDisabled={!selected}
          onClick={() => {
            if (answers[selected].isCorrect) {
              onCorrect();
            } else {
              setGuesses(prev => [...prev, selected]);
              setSelected('');
            }
          }}
        >
          Submit
        </Button>
      </ModalFooter>
    </ModalContent>
  );
}

Question.propTypes = {
  seed: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
  onCorrect: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};
