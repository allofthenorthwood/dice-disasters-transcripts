let fs = require('fs');

let {google} = require('googleapis');

let drive = google.drive({version: 'v3', auth: 'AIzaSyDW1FOsPBXhY-70FHxtoJjiypkgr6CS5C4'});
let transcriptsFolder = '1p7MEc6WvBN76VIKWz2NreqJngBKaDpB1';

function stringify(str) {
  return '`' + str.replace(/\\|`|\${/g, '\\$&') + '`';
}

async function main() {
  let {data: {files}} = await drive.files.list({q: `'${transcriptsFolder}' in parents`});
  for (let file of files) {
    let match = /^Episode (\d+) transcript$/.exec(file.name);
    if (!match) {
      console.warn('Unexpected file title [%s]; ignoring', file.name);
      continue;
    }
    let episodeNumber = +match[1];
    console.warn('Processing transcript for episode %s', episodeNumber);
    let transcript = (await drive.files.export({
      fileId: file.id,
      mimeType: 'text/plain',
    })).data;
    transcript = transcript.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n');
    fs.writeFileSync(
      `src/transcripts/ep${episodeNumber}-transcript.js`,
      'export default ' + stringify(transcript) + ';\n',
    );
  }
}

main();
