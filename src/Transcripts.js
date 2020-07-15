import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import ep1 from './transcripts/ep1-transcript';
import ep2 from './transcripts/ep2-transcript';
import ep3 from './transcripts/ep3-transcript';
import ep4 from './transcripts/ep4-transcript';
import ep5 from './transcripts/ep5-transcript';
import ep6 from './transcripts/ep6-transcript';
import {colours} from './helpers.js';
import emojiZan from './emoji/zan-mad.png';
import emojiJasmin from './emoji/jasmin-blush.png';
import emojiMax from './emoji/max-happy.png';
import emojiCody from './emoji/cody-happy.png';
import emojiErica from './emoji/erica-confused.png';
import emojiNula from './emoji/nula.png';
import emojiWindred from './emoji/windred.png';
import emojiLili from './emoji/lili.png';

const castIndex = {
  oliver: "DM",
  talia: "Zan",
  alice: "Jasmin",
  alan: "Cody",
  allison: "Erica",
  robot: "Max",
  everyone: null,
};
const castList = Object.keys(castIndex);

const speakerEmoji = {
  zan: emojiZan,
  jasmin: emojiJasmin,
  erica: emojiErica,
  cody: emojiCody,
  max: emojiMax,
  nula: emojiNula,
  windred: emojiWindred,
  lili: emojiLili,
};

const speakerColours = {
  alan: "red",
  cody: "red",
  alice: "green",
  jasmin: "green",
  robot: "blue",
  max: "blue",
  talia: "violet",
  zan: "violet",
  allison: "orange",
  erica: "orange",
  oliver: "grey",
  everyone: "grey",
  intercom: "grey",
  "dream voices": "magenta",
  default: "grey",
};

class Transcript extends Component {
  render() {
    const {darkMode, title, episode, debug} = this.props;
    const transcriptRaw = this.props.transcript;

    let transcript = transcriptRaw.replace(/:\n/g, ": ");

    return (
      <div className={css(styles.transcript)}>

      <div className={css(styles.title, debug && styles.noSelect)}>
        Episode {episode}: {title}
      </div>
      <div contentEditable={debug ? 'true' : 'false'}>
        {transcript.split('\n').map((line, count) => {
          line = line.trim();
          let lineOutput = null;
          let characterSpeaking = false;
          if  (line.length <= 1) {
            return null;
          } else if (line[0] === "=") {
            lineOutput = <div className={css(styles.midroll)} key={count}>
              {debug ? line : line.replace(/=/g, '')}
            </div>;
          } else if (line[0] === "{") {
            // Skip times for now, since idk what to do with them
            if (debug) {
              lineOutput = <div className={css(styles.soundEffect)} key={count}>
                {line}
              </div>;
            } else {
              return null;
            }
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

            let speaker = line.split(':')[0].toLowerCase();
            const content = line.split(':')[1];
            let speakerStyles = null;
            const speakerColour = speakerColours[speaker] || speakerColours.default;
            const emoji = speakerEmoji[speaker] || null;
            // Check for mistyped speakers:
            // if (speakerColour === speakerColours.default) {
            //   console.log(line);
            // }

            if (castList.indexOf(speaker) > -1) {
              // Cast speaking as themself
              // could add {castIndex[speaker]} to "speaker"
              speakerStyles = {color: colours[speakerColour]};
            } else {
              // Character Speaking
              characterSpeaking = true;
              speaker = speaker.toUpperCase();
              const colourDark = colours[speakerColour + "Dark"];
              const colourLighter = colours[speakerColour + "Lighter"];
              speakerStyles = {color: darkMode ? colourLighter : colourDark, backgroundColor: darkMode ? colourDark : colourLighter};
            }

            lineOutput = <div className={css(styles.lineInterior)}>
              <div className={css(styles.speakerBox, characterSpeaking && styles.speakerBoxCharacter)}>
              {characterSpeaking && emoji && <img alt="" src={emoji} className={css(styles.emoji)}/>}
              <div
                className={css(styles.speaker, characterSpeaking && styles.characterSpeaker)}
                style={speakerStyles}
              >
                {characterSpeaking ? speaker.toUpperCase() : speaker[0].toUpperCase() + speaker.slice(1)}:

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
      </div>
    );
  }
}

class Transcripts extends Component {
  render() {
    const {episode, darkMode, debug} = this.props;
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
    } else if (episode === 6) {
      transcript = ep6;
      title = "First Contact";
    } else {
      return null;
    }

    return (
      <div className={css(styles.container)}>
        <Transcript
          transcript={transcript}
          darkMode={darkMode}
          title={title}
          episode={episode}
          debug={debug}/>
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
  noSelect: {
    userSelect: 'none',
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
  emoji: {
    //maxWidth: 24,
    maxHeight: 24,
    display: "inline-block",
    verticalAlign: "middle",
    marginRight: 5,
    marginLeft: 5,
  }
});

export default Transcripts;
