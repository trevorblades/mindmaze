import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {
  Button,
  ModalBody,
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

export default function Question({seed, data, onCorrect}) {
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
  onCorrect: PropTypes.func.isRequired
};
