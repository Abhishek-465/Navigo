import { useState, useEffect } from 'react';

const useTypingEffect = (words, typeSpeed = 100, backSpeed = 50, pauseDuration = 1000) => {
  const [currentWord, setCurrentWord] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    let timeout;

    const handleTyping = () => {
      const current = loopNum % words.length;
      const fullText = words[current];

      if (isDeleting) {
        setCurrentWord(fullText.substring(0, currentWord.length - 1));
      } else {
        setCurrentWord(fullText.substring(0, currentWord.length + 1));
      }

      timeout = setTimeout(() => {
        if (!isDeleting && currentWord === fullText) {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        } else if (isDeleting && currentWord === '') {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
        }

        setIndex(index + 1);
      }, isDeleting ? backSpeed : typeSpeed);
    };

    handleTyping();

    return () => clearTimeout(timeout);
  }, [currentWord, isDeleting, index, words, loopNum, typeSpeed, backSpeed, pauseDuration]);

  return currentWord;
};
