import React, { useState, useEffect, Component } from 'react'
import { Button,ButtonGroup,Card,Form } from 'react-bootstrap';

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'en-US'

function App2() {


  const [isListening, setIsListening] = useState(false)
  const [note, setNote] = useState(null)
  const [savedNotes, setSavedNotes] = useState([])

  function onSubmitText() {
    console.log({savedNotes})
    console.log("function trigerred")

    var i,text="";
    for (i = 0; i < savedNotes.length; i++) {
      text += savedNotes[i] + " ";
    }
   console.log(text)
    fetch('http://localhost:3000/audio', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        data:text
      })
    })
    .then(response => response.json())
      .then(outcome => {
          console.log(outcome.data)
          document.getElementById("target").value = outcome.data;
      })
}

  useEffect(() => {
    handleListen()
  }, [isListening])

  const handleListen = () => {
    if (isListening) {
      mic.start()
      mic.onend = () => {
        console.log('continue..')
        mic.start()
      }
    } else {
      mic.stop()
      mic.onend = () => {
        console.log('Stopped Mic on Click')
      }
    }
    mic.onstart = () => {
      console.log('Mics on')
    }

    mic.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      console.log("useful"+transcript)

      setNote(transcript)
      mic.onerror = event => {
        console.log(event.error)
      }
    }
  }
  const handleSaveNote = () => {
    setSavedNotes([...savedNotes, note])
    setNote('')
  }

  return (
    <>
      <h1>Voice Notes</h1>
      <div className="container">
        <div className="box">
          <h2>Current Note</h2>
          {isListening ? <span>🎙️</span> : <span>🛑🎙️</span>}
          <button onClick={handleSaveNote} disabled={!note}>
            Save Note
          </button>
          <button onClick={() => setIsListening(prevState => !prevState)}>
            Start/Stop
          </button>
          <p>{note}</p>
        </div>
        <div className="box">
          <h2>Notes</h2>
          {savedNotes.map(n => (
            <p key={n}>{n}</p>
          ))}
        </div>
      </div>

      <Form.Group controlId="exampleForm.ControlTextarea1" id="textfield">
          <Form.Label>Translated Output:</Form.Label>
          <Form.Control as="textarea" rows={3} id="target" />
      </Form.Group>
      <Button onClick={onSubmitText} variant="primary">Submit</Button>

    </>
  )
}

export default App2;