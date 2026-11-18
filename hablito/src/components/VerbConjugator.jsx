import React, { useState, useRef, useEffect } from "react";
import { fetchConjugation } from "../api/fetchConjugation";
import TensePill from "./TensePill";
import Button from '@mui/material/Button';  // Import the Button component from Material-UI
import IconButton from '@mui/material/IconButton'; 
import VolumeUpIcon from '@mui/icons-material/VolumeUp'; 
import { TextField, Typography, useMediaQuery } from "@mui/material";
import { colors } from "../colors";
import theme from "../theme";
import UseIsMobile from "./UseIsMobile";

function VerbConjugator({ randomVerb, randomTense, randomVerbForm, resetScreen, counter }) {
  const [inputValue, setInputValue] = useState('');
  const [buttonText, setButtonText] = useState('Check');  // New state variable for button text
  const [showEnglishInfinitive, setShowEnglishInfinitive] = useState(false);  // New state variable
  const [showConjugationAudio, setShowConjugationAudio] = useState(false);  // New state variable
  const conjugationAudioRef = useRef(null);  // New ref
  const inputRef = useRef();
  const [showMeDisabled, setShowMeDisabled] = useState (false);
  const [userAnswer, setUserAnswer] = useState ("unchecked");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleCheckClick = async () => {
    // Call the utility function to get the conjugated verb
    const conjugated = await fetchConjugation(randomVerb.infinitive, randomTense, randomVerbForm);

    // Compare the conjugated verb with the user's input (inputValue) to check correctness.
    if (checkAnswer(inputValue, conjugated)) {
      setButtonText('Next');  
      setShowEnglishInfinitive(true)
      setInputValue(conjugated)
      setShowConjugationAudio(true);
      setShowMeDisabled(true);
      setUserAnswer('correct');
  } else {setUserAnswer('incorrect')}

    // Compare the conjugated verb with the user's input (inputValue) to check correctness.
    // Implement your check logic here.

    // Update the UI with the result of the check.
  };

  const handleShowMeClick = async () => {
    // Call the utility function to get the conjugated verb
    const conjugated = await fetchConjugation(randomVerb.infinitive, randomTense, randomVerbForm);

    // Display the conjugated verb to the user.
    setInputValue(conjugated);
    setButtonText('Next');  // Set button text to 'Next' after showing the correct answer
    setShowEnglishInfinitive(true)
    setShowConjugationAudio(true);
    setShowMeDisabled(true);
    setUserAnswer('shown');
  };

  const clearAnswer = () => {
    setInputValue("");
    setButtonText("Check");
    setShowEnglishInfinitive(false);
    setShowConjugationAudio(false);
    setShowMeDisabled(false);
    setUserAnswer('unchecked');
  };

  const handleNextClick = () => {
    clearAnswer();
    resetScreen();
    inputRef.current.focus(); 
  };

  // Clears the answer whenever a new verb is loaded, e.g. after settings change
  useEffect(() => {
    clearAnswer();
  }, [randomVerb]);

  const audioRef = useRef(null);  // Create a ref to hold the audio element

  const handlePlaySound = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const handleConjugationAudioClick = () => {
    if (conjugationAudioRef.current) {
      conjugationAudioRef.current.play();
    }
  };

  const handleEnterKey = () => {
    if (buttonText === "Next") {
      handleNextClick();
    } else {
      handleCheckClick();
    }
  };

  // Rerenders verb conjugator whenever the settings sidebar is opened or closed
  useEffect(() => {
    handleNextClick()
  }, [counter])

  //Ensures that the keyboard loads on mobile when the page loads for the first time
  useEffect(() => {
    // Use a setTimeout to focus after a short delay (e.g., 100 milliseconds)
    const timeoutId = setTimeout(() => {
      inputRef.current.focus();
    }, 100);

    // Clear the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, []);

  let textFieldColour = colors.Red404;

  if (userAnswer === 'unchecked') {
    textFieldColour = 'transparent';
  } else if (userAnswer === 'incorrect') {
    textFieldColour = colors.Red404;
  } else if (userAnswer === 'correct') {
    textFieldColour = colors.Green404;
  } else if (userAnswer === 'shown') {
    textFieldColour = 'transparent';
  } else {
    textFieldColour = colors.Pink80;
  }

  const isMobile = UseIsMobile()

  return (
    <div style={{ background: 'white', color: 'black', paddingLeft: '2vw', paddingRight: '2vw', paddingTop: isMobile ? '6vh': '8vh', display: 'flex', flexDirection: 'column', alignItems: 'center', height: isMobile ? '50vh' : 'calc(100vh - 264px)', overflowY: 'o' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>  
        <div style={{ width: '64px', height: '64px' }}>
          {/* Invisible div with the same dimensions as the icon button */}
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          {/* New flex container */}
          <div style={{ display: 'flex', alignItems: 'center', textAlign: 'center', justifyContent: 'center' }}>
            <Typography 
              variant="h2" 
              style={{ 
                fontFamily: 'SofiaProLight', 
                fontSize: isMobile ? '12vw' : '3.5em', 
                maxWidth: '100%',
                }}>
              {randomVerb.infinitive}
            </Typography>
          </div>
          <div style={{ width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IconButton color="primary" style={{ alignItems: 'center' }} aria-label="Play sound" component="span" onClick={handlePlaySound}>
              <VolumeUpIcon />
            </IconButton>
          </div>
        </div>
      </div>
      <div style={{ height: isMobile ? '10vw' : '8vh', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div
          style={{
            visibility: showEnglishInfinitive ? 'visible' : 'hidden',
            display: 'flex', 
            maxWidth: '480px', 
          }}
        >
          <Typography 
            variant='h5' 
            style={{
              fontFamily: 'SofiaProLight',
              fontSize: isMobile ? '1.2em' : '1.5em', 
              textAlign: 'center'
              }}>
            {randomVerb.englishInfinitive}
          </Typography>
        </div>
      </div>
        <div style={{ height: '4vh', margin: '2vh'}}>
          <TensePill 
          tense={randomTense}
          isDarkMode={ false } //NEED TO BUILD SOMETHING FOR DARKMODE HERE!!
        />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '8vh', gap: '8px', width: '40%' }}>
          {/* Fixed-width TextField from MUI, centered, does not grow or shrink */}
          <div style={{ flexGrow: 0, flexShrink: 0, width: '320px' }}>
            <TextField
                  value={inputValue}
                  onChange={handleInputChange}
                  variant="filled"
                  onKeyDown={(e) => {
                  if (e.key === "Enter"){
                    handleEnterKey()
                  }
                  }
                  }
                  label={randomVerbForm}
                  style={{ width: '100%'}}
                  InputProps={{
                    style: { paddingLeft: '2.4em', paddingRight: '1em', backgroundColor: textFieldColour, color: 'black', textAlign: 'center'},
                    autoFocus: true,
                    inputProps: {style: {textAlign: 'center'}},
                    endAdornment: (
                      <IconButton 
                      color= 'primary'
                      style={{ opacity: showConjugationAudio ? 1 : 0 }} 
                      aria-label="Play conjugation sound" 
                      component="span"
                      disabled={!showConjugationAudio}
                      onClick={handleConjugationAudioClick}>
                      <VolumeUpIcon style={{ fontSize: 20 }} />
                    </IconButton>              
                    )
                  }}
                  inputLabelProps={{
                    style: { color: 'white', width: '100%', textAlign: 'left' } // Style the label
                  }}
                  inputRef={inputRef}
            />
          </div>
        </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '320px', paddingTop: '1.5vh' }}>
        <Button variant="text" color="primary" onClick={handleShowMeClick} disabled={showMeDisabled} style={{color: showMeDisabled ? theme.palette.primary.disabled : theme.palette.primary.main, borderRadius: '10vw', textTransform: 'none' }}>
          Show me
        </Button>
        <Button variant="contained" color="primary" onClick={buttonText === 'Next' ? handleNextClick : handleCheckClick} disabled={inputValue.trim() === ''} style={{ borderRadius: '10vw', textTransform: 'none', paddingLeft: '20px', paddingRight: '20px' }}>
          {buttonText}
        </Button>
      </div>
      <audio ref={audioRef} src={`./audio/${randomVerb.infinitive}/${randomVerb.infinitive}.mp3`} preload="auto" />
      <audio ref={conjugationAudioRef} src={`./audio/${randomVerb.infinitive}/${randomTense}/${randomVerbForm}.mp3`} preload="auto" />
    </div>
  );
}

function unaccent(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function checkAnswer(answer, correctAnswer) {
  const cleanedAnswer = unaccent(answer.trim().toLowerCase());
  const cleanedCorrectAnswer = unaccent(correctAnswer);  

  return cleanedAnswer === cleanedCorrectAnswer;
}

export default VerbConjugator;
