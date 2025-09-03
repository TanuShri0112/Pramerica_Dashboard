import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Plus, X, CaseSensitive } from 'lucide-react';

const QuestionEditModal = ({ isOpen, onClose, question, onSave }) => {
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [points, setPoints] = useState(1);
  const [correctAnswers, setCorrectAnswers] = useState(['']);
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [leftColumn, setLeftColumn] = useState(['']);
  const [rightColumn, setRightColumn] = useState(['']);
  const [correctPairs, setCorrectPairs] = useState({});
  const [oneWordAnswer, setOneWordAnswer] = useState('');
  const [minWords, setMinWords] = useState(50);
  const [maxWords, setMaxWords] = useState(500);

  useEffect(() => {
    if (question) {
      setQuestionText(question.content.question || '');
      setOptions(question.content.options || []);
      setCorrectAnswer(question.content.correctAnswer || (question.type === 'mcq' ? [0] : 0));
      setPoints(question.content.points || 1);
      setCorrectAnswers(question.content.correctAnswers || ['']);
      setCaseSensitive(question.content.caseSensitive || false);
      setLeftColumn(question.content.leftColumn || ['Item 1', 'Item 2']);
      setRightColumn(question.content.rightColumn || ['Match A', 'Match B']);
      setCorrectPairs(question.content.correctPairs || { '0': '0', '1': '1' });
      setOneWordAnswer(question.content.correctAnswer || '');
      setMinWords(question.content.minWords || 50);
      setMaxWords(question.content.maxWords || 500);
    }
  }, [question]);

  const addOption = () => {
    setOptions([...options, '']);
  };

  const removeOption = (index) => {
    if (options.length > 2) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);

      if (question.type === 'mcq') {
        const correctAnswerArray = Array.isArray(correctAnswer) ? correctAnswer : [correctAnswer];
        const updatedCorrectAnswers = correctAnswerArray
          .filter((answerIndex) => answerIndex !== index)
          .map((answerIndex) => (answerIndex > index ? answerIndex - 1 : answerIndex));
        setCorrectAnswer(updatedCorrectAnswers);
      } else if (typeof correctAnswer === 'number' && correctAnswer >= index && correctAnswer > 0) {
        setCorrectAnswer(correctAnswer - 1);
      }
    }
  };

  const updateOption = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addCorrectAnswer = () => {
    setCorrectAnswers([...correctAnswers, '']);
  };

  const removeCorrectAnswer = (index) => {
    if (correctAnswers.length > 1) {
      setCorrectAnswers(correctAnswers.filter((_, i) => i !== index));
    }
  };

  const updateCorrectAnswer = (index, value) => {
    const newAnswers = [...correctAnswers];
    newAnswers[index] = value;
    setCorrectAnswers(newAnswers);
  };

  const addLeftItem = () => {
    const newIndex = leftColumn.length;
    setLeftColumn([...leftColumn, '']);
    setRightColumn([...rightColumn, '']);
    setCorrectPairs({
      ...correctPairs,
      [newIndex.toString()]: newIndex.toString()
    });
  };

  const removeMatchingPair = (index) => {
    if (leftColumn.length > 2) {
      const newLeftColumn = leftColumn.filter((_, i) => i !== index);
      const newRightColumn = rightColumn.filter((_, i) => i !== index);

      const newCorrectPairs = {};
      Object.entries(correctPairs).forEach(([leftIdx, rightIdx]) => {
        const leftIdxNum = parseInt(leftIdx);
        const rightIdxNum = parseInt(rightIdx);

        if (leftIdxNum !== index && rightIdxNum !== index) {
          const newLeftIdx = leftIdxNum > index ? leftIdxNum - 1 : leftIdxNum;
          const newRightIdx = rightIdxNum > index ? rightIdxNum - 1 : rightIdxNum;
          newCorrectPairs[newLeftIdx.toString()] = newRightIdx.toString();
        }
      });

      setLeftColumn(newLeftColumn);
      setRightColumn(newRightColumn);
      setCorrectPairs(newCorrectPairs);
    }
  };

  const updateLeftItem = (index, value) => {
    const newLeftColumn = [...leftColumn];
    newLeftColumn[index] = value;
    setLeftColumn(newLeftColumn);
  };

  const updateRightItem = (index, value) => {
    const newRightColumn = [...rightColumn];
    newRightColumn[index] = value;
    setRightColumn(newRightColumn);
  };

  const updateCorrectPair = (leftIndex, rightIndex) => {
    setCorrectPairs({
      ...correctPairs,
      [leftIndex.toString()]: rightIndex
    });
  };

  const handleCorrectAnswerChange = (index, isChecked) => {
    if (question.type === 'mcq') {
      const currentCorrectAnswers = Array.isArray(correctAnswer) ? correctAnswer : [correctAnswer];

      if (isChecked) {
        if (!currentCorrectAnswers.includes(index)) {
          setCorrectAnswer([...currentCorrectAnswers, index]);
        }
      } else {
        setCorrectAnswer(currentCorrectAnswers.filter((answerIndex) => answerIndex !== index));
      }
    } else {
      setCorrectAnswer(index);
    }
  };

  const handleSave = () => {
    let finalCorrectAnswer;

    if (question.type === 'mcq') {
      finalCorrectAnswer = Array.isArray(correctAnswer) ? correctAnswer : [correctAnswer];
    } else if (question.type === 'truefalse') {
      finalCorrectAnswer = correctAnswer === 1;
    } else if (question.type === 'oneword') {
      finalCorrectAnswer = oneWordAnswer;
    } else {
      finalCorrectAnswer = correctAnswer;
    }

    const updatedQuestion = {
      ...question,
      content: {
        ...question.content,
        question: questionText,
        options: ['mcq', 'scq'].includes(question.type) ? options : question.content.options,
        correctAnswer:
          question.type === 'fillup' || question.type === 'matching' || question.type === 'assignment'
            ? undefined
            : finalCorrectAnswer,
        correctAnswers: question.type === 'fillup' ? correctAnswers.filter((answer) => answer.trim()) : undefined,
        caseSensitive: ['fillup', 'oneword'].includes(question.type) ? caseSensitive : undefined,
        leftColumn: question.type === 'matching' ? leftColumn.filter((item) => item.trim()) : undefined,
        rightColumn: question.type === 'matching' ? rightColumn.filter((item) => item.trim()) : undefined,
        correctPairs: question.type === 'matching' ? correctPairs : undefined,
        minWords: question.type === 'descriptive' ? minWords : undefined,
        maxWords: question.type === 'descriptive' ? maxWords : undefined,
        points: points
      }
    };

    onSave(updatedQuestion);
    onClose();
  };

  const getQuestionTypeLabel = () => {
    switch (question?.type) {
      case 'mcq':
        return 'Multiple Choice Question';
      case 'scq':
        return 'Single Choice Question';
      case 'truefalse':
        return 'True/False Question';
      case 'fillup':
        return 'Fill in the Blank';
      case 'matching':
        return 'Matching Question';
      case 'oneword':
        return 'One Word Answer';
      case 'descriptive':
        return 'Descriptive Question';
      case 'assignment':
        return 'Assignment Question';
      default:
        return 'Question';
    }
  };

  const isCorrectAnswer = (index) => {
    if (question?.type === 'mcq') {
      const correctAnswerArray = Array.isArray(correctAnswer) ? correctAnswer : [correctAnswer];
      return correctAnswerArray.includes(index);
    } else {
      return correctAnswer === index;
    }
  };

  if (!question) return null;

  // NOTE: Your JSX code continues for rendering the modal UI below...
  // 🔁 The render JSX remains the same, and you've already pasted it. So keep using that part below as-is.

  // 👇 You can paste your full JSX render code below (starting from `<Dialog>` ... etc)
};

export default QuestionEditModal;
