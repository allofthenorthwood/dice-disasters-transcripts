import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import ep1 from './transcripts/ep1-transcript';
import ep2 from './transcripts/ep2-transcript';
import ep3 from './transcripts/ep3-transcript';
import ep4 from './transcripts/ep4-transcript';
import ep5 from './transcripts/ep5-transcript';
import {colours} from './helpers.js';

const castIndex = {
  Oliver: "DM",
  Talia: "Zan",
  Alice: "Jasmin",
  Alan: "Cody",
  Allison: "Erica",
  Robot: "Max",
};
const castList = Object.keys(castIndex);

const characterIndex = {
  CODY: null,
  MAX: null,
  ZAN: null,
  ERICA: null,
  JASMIN: null,
  INTERCOM: null,
};
//const characterList = Object.keys(characterIndex);

const speakerColours = {
  Alan: "red",
  CODY: "red",
  Alice: "green",
  JASMIN: "green",
  Robot: "blue",
  MAX: "blue",
  Talia: "violet",
  ZAN: "violet",
  Allison: "orange",
  ERICA: "orange",
  INTERCOM: "grey",
  "DREAM VOICES": "magenta",
  default: "grey",
};

class Transcript extends Component {
  render() {
    const transcript = this.props.transcript;
    return (
      <div className={css(styles.transcript)}>

        {transcript.split('\n').map((line, count) => {
          let lineOutput = null;
          let characterSpeaking = false;

          if (line[0] === "=") {
            lineOutput = <div className={css(styles.midroll)} key={count}>
              {line.replace(/=/g, '')}
            </div>;
          } else if (line[0] === "{") {
            // Skip times for now, since idk what to do with them
            return;
          } else if (line[0] === "[") {
            lineOutput = <div className={css(styles.soundEffect)} key={count}>
              {line}
            </div>;
          } else if (!line.includes(":")) {
          lineOutput = <div className={css(styles.noSpeaker)} key={count}>
            {line}
          </div>;
          console.log(line);
        } else {

            const speaker = line.split(':')[0];
            const content = line.split(':')[1];
            let lineStyle = null;
            let speakerStyles = null;
            const speakerColour = speakerColours[speaker] || speakerColours.default;

            if (castList.indexOf(speaker) > -1) {
              // Cast speaking as themself
              // could add {castIndex[speaker]} to "speaker"
              speakerStyles = {color: colours[speakerColour]};
            } else {
              // Character Speaking
              characterSpeaking = true;
              speakerStyles = {color: colours[speakerColour + "Dark"], backgroundColor: colours[speakerColour + "Lighter"]};
            }
            lineOutput = <div className={css(styles.lineInterior)}>
              <div className={css(styles.speakerBox, characterSpeaking && styles.speakerBoxCharacter)}>
              <div
                className={css(styles.speaker, characterSpeaking && styles.characterSpeaker)}
                style={speakerStyles}
              >
                {speaker}:

              </div>
              </div>
              <div className={css(styles.content)}>
                {content}
              </div>
            </div>;
          }

          return <div className={css(styles.line, characterSpeaking && styles.characterSpeakerLine)} key={count}>
            {lineOutput}
          </div>;
        })}
      </div>
    );
  }
}

class Transcripts extends Component {
  render() {
    const episode = this.props.episode;
    let transcript = null;

    if (episode === 1) {
      transcript = ep1;
    } else if (episode === 2) {
      transcript = ep2;
    } else if (episode === 3) {
      transcript = ep3;
    } else if (episode === 4) {
      transcript = ep4;
    } else if (episode === 5) {
      transcript = ep5;
    } else {
      return null;
    }

    return (
      <div className={css(styles.container)}>
        <Transcript transcript={transcript}/>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  line: {
    paddingTop: 7,
    paddingBottom: 7,
  },
  lineInterior: {
    display: 'flex',
  },
  speakerBox: {
    minWidth: 60,
    marginRight: 10,
    textAlign: "right",
  },
  speakerBoxCharacter: {
    minWidth: 120,
  },
  speaker: {
    fontWeight: 'bold',
    position: 'relative',
  },
  soundEffect: {
    fontStyle: "italic",
    textAlign: 'center',
  },
  noSpeaker: {
  },
  midroll: {
    color: colours["greyLight"],
    backgroundColor: colours["greyDark"],
    padding: 5,
    display: 'block',
    textAlign: 'center',
    fontWeight: 'bold',
    borderRadius: 3,
  },
  castSpeaker: {

  },
  characterSpeakerLine: {
    marginLeft: 70,
    borderLeft: '5px solid rgba(120, 120, 120, 0.2)',
  },
  characterSpeaker: {
    display: "inline-block",
    //minWidth: 60,
    textAlign: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 3,
  },
  content: {
    flex: 1,
  },
});

export default Transcripts;
