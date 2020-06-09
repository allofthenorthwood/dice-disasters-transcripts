import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import Transcripts from "./Transcripts.js"
import {colours} from './helpers.js';

class App extends Component {
  state = {
    selectedEpisode: 5,
    darkMode: false,
  }
  render() {
    const episodes = [1, 2, 3, 4, 5];
    const selectedEpisode = this.state.selectedEpisode;
    const darkMode = this.state.darkMode;
    return (
      <div className={css(styles.container, darkMode && styles.darkMode)}>
        <div className={css(styles.transcriptPicker)}>
          {episodes.map((episode) => {
            return <button
              onClick={() => this.setState({selectedEpisode: episode})}
              key={episode}
            >Episode {episode}</button>
          })}

        </div>
        <div className={css(styles.colourModePicker)}>
          <button onClick={() =>this.setState({darkMode: false})}>Light Mode</button>
          <button onClick={() => this.setState({darkMode: true})}>Dark Mode</button>
        </div>
        <div className={css(styles.transcript)}>
          <Transcripts episode={selectedEpisode}/>
        </div>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    maxWidth: 900,
    boxSizing: 'border-box',
    width: "100%",
    margin: "auto",
    padding: 50,
    '@media (max-width: 600px)': {
      padding: 10,
    }
  },
  darkMode: {
    // dark mode:
    backgroundColor: colours.black,
    color: colours.greyLight,
  },
});

export default App;
