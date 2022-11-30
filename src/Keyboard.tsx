import styles from './Keyboard.module.css';

const KEYS = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
    ]

type KeyboardProps = {
    disabled?: boolean,
    activeLetters: string[]
    inactiveLetters: string[]
    addGuessedLetter: (letter: string) => void//a function takes in a letter as a parameter(type string) and return nothing
}
    
export function Keyboard({activeLetters, inactiveLetters, addGuessedLetter, disabled = false}: KeyboardProps) {
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(75px, 1fr)',
                gap: '.5rem'
            }}
        >
            {KEYS.map((key) => { //CSS Modules let you use the same CSS class name in different files without worrying about naming clashes. 
                const isActive = activeLetters.includes(key);
                const isInactive = inactiveLetters.includes(key);
                return(
                    <button 
                        onClick={() => addGuessedLetter(key)}
                        className={`${styles.btn} ${isActive ? styles.active : ''} ${isInactive ? styles.inactive : ''} `} 
                        disabled = {isInactive || isActive || disabled} //when loser/winner has been decided, disable the keyboard. And when a letter is guessed, cannot hover/select it anymore
                        key={key}>{key}
                    </button>
                ) 
            })}
        </div>
    )
}