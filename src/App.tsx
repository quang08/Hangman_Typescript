import { useCallback, useEffect, useState } from "react";
import words from './wordList.json';
import { HangmanDrawing } from "./HangmanDrawing"
import { HangmanWord } from "./HangmanWord"
import { Keyboard } from "./Keyboard"

function App() {
  const [wordToGuess, setWordToGuess] = useState(() => { //generate words to guess
    return words[Math.floor(Math.random() * words.length)]; 
    //.random() gives a # from 0-1 and multiply it by the length of the array then round it down
  });
  console.log(wordToGuess);

  const [guessedLetters, setGuessLetters] = useState<string[]>([]); //keeping track of guessed letters (init an array of strings)
  
  const inCorrectLettes = guessedLetters.filter(
    letter => !wordToGuess.includes(letter) //incorrect letters = letters that arent in the word to guess 
  )

  //LOSE / WIN
  const isLoser = inCorrectLettes.length >= 6; //6 body parts therefore if guessed >= 6 times uve lost
  const isWinner = wordToGuess.split('').every(letter => guessedLetters.includes(letter));
  //win <-> every letter in guessedLetters match wordToGuess.split();

  //INTERACTION PHYSICAL KEYBOARD AND LETTERS
  const addGuessedLetter = useCallback((letter: string) => {//3. function to add pressed key letter to guessedLetter arr
    if(guessedLetters.includes(letter) || isLoser || isWinner) return //3a. if guessedLetter array alr had the letter or if the game decision has been decided, ignore keypress
    //3b. else: add the letter to the end of the array
    setGuessLetters(currentLetters => [...currentLetters, letter]);
  },[guessedLetters])  //only rerun when guessLetters arr changes

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { //2.when a key is pressed
      const key = e.key; //2a. grab the key

      if(!key.match(/^[a-z]$/)) return //2b. if the key isnt a-z then ignore

      e.preventDefault();//2c. else prevent from refreshing
      addGuessedLetter(key); //2d. call this function to add the key to guessedLetters array
    }

    document.addEventListener('keypress', handler); //1. add event listener for keypress and a function to handle that keypress event

    return () => { //4. remove the event after handled
      document.removeEventListener('keypress', handler)
    }
  },[guessedLetters]) //triggered only when the guessedLetters array changes (only when there's a new incorrect letter)

  return <div
    style = {{
      maxWidth: "800px",
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
      margin: "0 auto",
      alignItems: "center"
    }}
  >
    <div style={{fontSize: "2rem", textAlign: "center"}}> 
    
      {isWinner && "Winner! - Refresh to try again"}
      {isLoser && "Nice Try - Refresh to try again"}
    </div>

    <HangmanDrawing numberOfGuesses={inCorrectLettes.length}/>
    <HangmanWord
      reveal = {isLoser }
      guessedLetters={guessedLetters} wordToGuess={wordToGuess} 
    />
    <div style={{alignSelf: 'stretch'}}>
      <Keyboard  
        disabled = {isLoser || isWinner} //passing the the game decision 
        activeLetters = {guessedLetters.filter(letter => wordToGuess.includes(letter))} //all the guessed letter that is correct
        inactiveLetters = {inCorrectLettes}
        addGuessedLetter = {addGuessedLetter}
      />
    </div>
  </div>
}

export default App
