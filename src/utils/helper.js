const isURLValid = (string) => {
    try{
        new URL(string);
        return true;
    }
    catch(err){
        return false;
    }
}

const generateSRTContent = (captions) => {
    
    const content = captions.map((caption, index) => {
        const { startTime, endTime, captionText } = caption;
        return `${index + 1}\n${startTime} --> ${endTime}\n${captionText}\n`;
    }).join('\n');

    return content;
}

const generateVTTContent = (captions) => {

    const body = captions.map((caption, index) => {
        const { startTime, endTime, captionText } = caption;
        return `${index + 1}\n${startTime} --> ${endTime}\n${captionText}\n`;
    }).join('\n');

    const head = 'WEBVTT';
    const content = head + `\n\n` + body;
    return content;
}

const createBlobURL = (content) => {
    const blob = new Blob([content], { type: 'text/vtt' });
    return URL.createObjectURL(blob);
}

const convertIntoVttTimeFormat = (sec) => {

    let seconds = 0;
    let minutes = 0;
    let hours = 0;

    // retrieve seconds
    seconds = sec % 60;
    
    // retrieve minutes
    minutes = Math.floor(sec / 60);

    // retrieve hours
    hours = Math.floor(minutes / 60);
    if(hours > 0) minutes = Math.floor(minutes % 60);

    // format and send
    const stringSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    const stringMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const stringHours = hours < 10 ? `0${hours}` : `${hours}`;

    const formatedTime = `${stringHours}:${stringMinutes}:${stringSeconds}.000`;
    return formatedTime;
}

const convertIntoSeconds = (format) => {

    const cleanFormat = format.split('.')
    const time = cleanFormat[0].split(':');
    const hours = parseInt(time[0])
    const minutes = parseInt(time[1])
    const seconds = parseInt(time[2]);
    const sec = hours*60*60 + minutes*60 + seconds;
    return `${sec}`;
}


export {isURLValid, generateSRTContent, generateVTTContent, createBlobURL, convertIntoVttTimeFormat, convertIntoSeconds};