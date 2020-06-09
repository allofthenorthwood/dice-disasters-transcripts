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
    const {transcript, darkMode, title, episode} = this.props;
    return (
      <div className={css(styles.transcript)}>

      <div className={css(styles.title)}>
        Episode {episode}: {title}
      </div>
        {transcript.split('\n').map((line, count) => {
          let lineOutput = null;
          let characterSpeaking = false;
          if  (line.length <= 1) {
            return null;
          } else if (line[0] === "=") {
            lineOutput = <div className={css(styles.midroll)} key={count}>
              {line.replace(/=/g, '')}
            </div>;
          } else if (line[0] === "{") {
            // Skip times for now, since idk what to do with them
            return null;
          } else if (line[0] === "[") {
            lineOutput = <div className={css(styles.soundEffect)} key={count}>
              {line}
            </div>;
          } else if (!line.includes(":")) {
          lineOutput = <div className={css(styles.noSpeaker)} key={count}>
            {line}
          </div>;
          //console.log(line);
        } else {

            const speaker = line.split(':')[0];
            const content = line.split(':')[1];
            let speakerStyles = null;
            const speakerColour = speakerColours[speaker] || speakerColours.default;

            if (castList.indexOf(speaker) > -1) {
              // Cast speaking as themself
              // could add {castIndex[speaker]} to "speaker"
              speakerStyles = {color: colours[speakerColour]};
            } else {
              // Character Speaking
              characterSpeaking = true;
              const colourDark = colours[speakerColour + "Dark"];
              const colourLighter = colours[speakerColour + "Lighter"];
              speakerStyles = {color: darkMode ? colourLighter : colourDark, backgroundColor: darkMode ? colourDark : colourLighter};
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
    let title = null;

    if (episode === 1) {
      transcript = ep1;
      title = "A Cold, White Floor";
    } else if (episode === 2) {
      transcript = ep2;
      title = "Continued Calibration";
    } else if (episode === 3) {
      transcript = ep3;
      title = "Breaking the Loop";
    } else if (episode === 4) {
      transcript = ep4;
      title = "Beards and Bards";
    } else if (episode === 5) {
      transcript = ep5;
      title = "Spooky Scary Skeletons";
    } else {
      return null;
    }

    return (
      <div className={css(styles.container)}>
        <Transcript transcript={transcript} darkMode={this.props.darkMode} title={title} episode={episode}/>
      </div>
    );
  }
}

const borderColour = 'rgba(120, 120, 120, 0.2)';

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    borderBottom: `5px solid ${borderColour}`,
    marginTop: 15,
    marginBottom: 15,
    paddingBottom: 5,
  },
  line: {
    paddingTop: 7,
    paddingBottom: 7,
  },
  lineInterior: {
    display: 'flex',
    '@media (max-width: 600px)': {
      display: 'block',
    }
  },
  speakerBox: {
    minWidth: 60,
    marginRight: 10,
    textAlign: "right",
    '@media (max-width: 600px)': {
      textAlign: 'left',
    }
  },
  speakerBoxCharacter: {
    minWidth: 120,
    '@media (max-width: 600px)': {
      minWidth: 'none',
    }
  },
  speaker: {
    fontWeight: 'bold',
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
    borderLeft: `5px solid ${borderColour}`,
    '@media (max-width: 600px)': {
      marginLeft: 0,
      paddingLeft: 10,
    }
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
