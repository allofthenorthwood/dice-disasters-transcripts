import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import Transcripts from "./Transcripts.js"
import {colours} from './helpers.js';

const DEBUG = true;
const EDITING_EP_NUM = 8;

class App extends Component {
  state = {
    selectedEpisode: 1,
    darkMode: false,
  }

  componentDidMount() {
    const url = document.referrer;
    const queryString = '?' + url.split('?')[1];
    const urlParams = new URLSearchParams(queryString);
    const epNum = parseInt(urlParams.get('ep')) || 1;
    this.setState({selectedEpisode: epNum});
  }

  render() {



    const episodes = [1, 2, 3, 4, 5, 6, 7, 8];
    const selectedEpisode = this.state.selectedEpisode;
    const darkMode = this.state.darkMode;
    return (
      <div className={css(styles.container, darkMode && styles.darkMode)}>
      <div className={css(styles.innerContainer)}>
        {!(DEBUG && EDITING_EP_NUM) && <div className={css(styles.navigation, DEBUG && styles.noSelect)}>
          <div className={css(styles.transcriptPicker)}>
            Episode: {episodes.map((episodeNumber) => {
              return <button
                className={css(styles.button, selectedEpisode === episodeNumber && styles.buttonActive)}
                onClick={() => {this.setState({selectedEpisode: episodeNumber})}}
                key={episodeNumber}
              >{episodeNumber}</button>
            })}

          </div>
          <div
            className={css(styles.colourModePicker)}
            onClick={() => this.setState({darkMode: !darkMode})}
            aria-hidden="true"
          >
            <input
              type="checkbox"
              className={css(styles.darkModeCheckbox)}
              checked={darkMode}
            />
            <label className={css(styles.darkModeLabel)}>Dark Mode</label>
          </div>
        </div>}
        <div className={css(styles.transcript)}>
          <Transcripts
            episode={(DEBUG && EDITING_EP_NUM) ? EDITING_EP_NUM : selectedEpisode}
            darkMode={darkMode}
            debug={DEBUG}
          />
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
  noSelect: {
    userSelect: 'none',
  },
  navigation: {
    display: 'flex',
    justifyContent: 'space-between',
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
  darkModeCheckbox: {
    verticalAlign: 'middle',
  },
  darkModeLabel: {
    paddingLeft: 3,
    verticalAlign: 'middle',
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
