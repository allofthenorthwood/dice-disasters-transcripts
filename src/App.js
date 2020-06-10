import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import Transcripts from "./Transcripts.js"
import {colours} from './helpers.js';

class App extends Component {
  state = {
    selectedEpisode: 1,
    darkMode: false,
  }
  render() {
    const episodes = [1, 2, 3, 4, 5];
    const selectedEpisode = this.state.selectedEpisode;
    const darkMode = this.state.darkMode;
    return (
      <div className={css(styles.container, darkMode && styles.darkMode)}>
      <div className={css(styles.innerContainer)}>
        <div className={css(styles.transcriptPicker)}>
          {episodes.map((episodeNumber) => {
            return <button
              className={css(styles.button, selectedEpisode === episodeNumber && styles.buttonActive)}
              onClick={() => this.setState({selectedEpisode: episodeNumber})}
              key={episodeNumber}
            >Episode {episodeNumber}</button>
          })}

        </div>
        <div className={css(styles.colourModePicker)}>
          <button
            className={css(styles.button, !darkMode && styles.buttonActive)}
            onClick={() =>this.setState({darkMode: false})}
          >Light Mode</button>
          <button
            className={css(styles.button, darkMode && styles.buttonActive)}
            onClick={() => this.setState({darkMode: true})}
          >Dark Mode</button>
        </div>
        <div className={css(styles.transcript)}>
          <Transcripts episode={selectedEpisode} darkMode={darkMode}/>
        </div>
        </div>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  darkMode: {
    backgroundColor: colours.blackDark,
    color: colours.greyLight,
  },
  innerContainer: {
    maxWidth: 900,
    boxSizing: 'border-box',
    width: "100%",
    margin: "auto",
    padding: 50,
    '@media (max-width: 600px)': {
      padding: 10,
    }
  },
  button: {
    background: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 4,
    margin: 5,
    padding: '5px 10px',
    color: colours.black,
    boxShadow: `0 0 0 1px rgba(0,0,0, 0.3)`,
    ':hover': {
      background: colours.greyLighter,
    },
    ':active': {
      background: colours.greyLighter,
    },
    ':focus': {
      background: colours.greyLighter,
      boxShadow: `0 0 2px 2px ${colours.blue}`
    },
  },
  buttonActive: {
    color: colours.greyLighter,
    boxShadow: `0 0 0 1px rgba(0,0,0,0.9)`,
    background: 'rgba(0,0,0,0.8)',

    ':hover': {
      background: colours.black,
    },
    ':active': {
      background: colours.black,
    },
    ':focus': {
      background: colours.black,
    },
  }
});

export default App;
