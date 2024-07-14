import { useEffect, useRef, useState } from "react";
import { convertIntoSeconds, convertIntoVttTimeFormat, createBlobURL, generateVTTContent } from "../utils/helper";
import Slider from "rc-slider";
import "rc-slider/assets/index.css"
import { useLocation } from "react-router-dom";

const ManualTypingPage = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const link = queryParams.get('link');   
    
    const initialState = {
        id: Date.now(),
        captionText: '',
        startTime: '00:00:00.000',
        endTime: '00:00:00.000'
    }
    const [captions, setCaptions] = useState(JSON.parse(localStorage.getItem('captions')) || [initialState]);
    const [language, setLanguage] = useState(localStorage.getItem('language') || 'English')
    const [url, setUrl] = useState('');
    const [message, setMessage] = useState('');
    const videoRef = useRef(null);
    // main slider
    // const [currentTime, setCurrentTime] = useState(0);


    // Clear message after 3 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage('');
        }, 3000)
        
        return () => clearTimeout(timer);
    }, [message]);

    // Save captions
    useEffect(() => {
        localStorage.setItem('captions', JSON.stringify(captions));
    }, [captions])


    // Button Handlers
    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const newCaptions = captions.map((caption , i) => (
            i === index ? {...caption, [name]: value} : caption
        ));
        setCaptions(newCaptions);
    };

    const addCaptionAbove = (index) => {
        const newCaptions = [...captions];
        const newCaption = {
            id: Date.now(),
            captionText: '',
            startTime: captions[index].startTime,
            endTime: captions[index].startTime
        };
        newCaptions.splice(index, 0, newCaption);
        setCaptions(newCaptions);
    };

    const addCaptionBelow = (index) => {
        const newCaptions = [...captions];
        const newCaption = {
            id: Date.now(),
            captionText: '',
            startTime: captions[index].endTime,
            endTime: captions[index].endTime
        };
        newCaptions.splice(index+1, 0, newCaption);
        setCaptions(newCaptions);
    };

    const deleteCaption = (index) => {
        // lastcaption 
        if(captions.length === 1){
            const newCaptions = [initialState];
            setCaptions(newCaptions);
        }
        else{
            const newCaptions = [...captions];
            newCaptions.splice(index, 1);
            setCaptions(newCaptions);
        }
    };
    // const handleVideoTimeUpdate = () => {
    //     setCurrentTime(videoRef.current.currentTime);
    // };  

    const handleSubmit = () => {
        const vttContent = generateVTTContent(captions);
        console.log(vttContent);
        const url = createBlobURL(vttContent);
        setUrl(url);
        setMessage('Saved Successfully, You can now play your video');
    };  

    const handleSliderChange = (index, values) => {
        const newCaptions = captions.map((caption, i) => (
            i === index ? { ...caption, startTime: convertIntoVttTimeFormat(parseInt(values[0])), endTime: convertIntoVttTimeFormat(parseInt(values[1])) } : caption
        ));
        setCaptions(newCaptions);
    };

    const handleReset = () => {
        setCaptions([initialState]);
        localStorage.removeItem('captions');
    };

    const handleExport = () => {
        const vttContent = generateVTTContent(captions);
        const fileURL = createBlobURL(vttContent);
        const link = document.createElement('a');
        link.href = fileURL;
        link.download = 'captions.vtt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleLanguage = (e) => {
        setLanguage(e.target.value)
        localStorage.setItem('language', e.target.value);
    }

    // View Instructions
    // const openInstructions = () => {
        
    // }

  return (
    <div className="flex flex-col items-center w-full h-full gap-12">
        <h1 className="text-2xl sm:text-3xl">Manually Type Your Captions</h1>
        {/* <button onClick={openInstructions} className="fixed text-blue-400 bg-white top-10 right-10">View Instructions</button> */}
        <main className="flex flex-wrap justify-center w-full gap-12">
            <section className="flex-col flex-none flex w-full gap-8 max-w-[500px] justify-start items-end">
                <video 
                    ref={videoRef} 
                    // onTimeUpdate={handleVideoTimeUpdate} 
                    className="w-full h-[200px] sm:h-[300px] object-fill" 
                    controls
                >
                    <source src={link} type="video/mp4" />
                    {
                        url && (
                            language === "French" 
                            ? <track label="French" kind="subtitles" src={url} srcLang="fr" default />
                            : language === "Hindi"
                            ? <track label="Hindi" kind="subtitles" src={url} srcLang="hi" default />
                            : language === "Spanish"
                            ? <track label="Spanish" kind="subtitles" src={url} srcLang="es" default />
                            : <track label="English" kind="subtitles" src={url} srcLang="en" default />
                        )
                    }
                </video>
                <div className="flex flex-wrap justify-between w-full gap-4">
                    <select onChange={handleLanguage} defaultValue={language} className="border-b-2 border-gray-200">
                        <option value="English">English</option>
                        <option value="French">French</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Spanish">Spanish</option>
                    </select>
                    <div className="flex flex-wrap gap-4">
                        <button 
                            className="border-2 w-[100px] border-blue-500 text-blue-500 px-4 py-2 rounded-lg"
                            onClick={handleExport}>
                            Export
                        </button>
                        <button 
                            className="px-4 py-2 text-white bg-blue-500 rounded-lg w-[100px]"
                            onClick={handleSubmit}>
                                Save
                        </button>
                    </div>
                </div>
                {
                    message && <div className="italic text-gray-400">{message}</div>
                }
            </section>
            <section className="flex-auto flex max-w-[500px] flex-col gap-8">
                <div className="flex flex-col w-full gap-8 ">
                <button onClick={handleReset} className="w-[80px]">Reset All</button>
                {
                    captions.map((cap, index) => (

                        <div className="flex flex-col gap-4" key={cap.id}>
                            <button onClick={() => addCaptionAbove(index)} className="text-blue-400 w-[50px]">Add</button>
                            <div className="flex flex-wrap gap-4">
                                <textarea 
                                    className="flex-auto px-4 py-2 border border-gray-400 rounded-xl sm:w-18" 
                                    type="text" 
                                    rows={3}
                                    placeholder="caption text here..."
                                    name="captionText"
                                    value={cap.captionText} 
                                    onChange={(e) => handleChange(index, e)} 
                                />
                                <div className="flex flex-col gap-4">
                                    <input 
                                        className="flex-none px-4 py-2 border border-gray-400 rounded-xl w-[150px]" 
                                        type="text" 
                                        placeholder="hh:mm:ss"
                                        name="startTime"
                                        value={cap.startTime} 
                                        onChange={(e) => handleChange(index, e)} 
                                        disabled
                                    />
                                    <input 
                                        className="flex-none px-4 py-2 border border-gray-400 rounded-xl w-[150px]" 
                                        type="text" 
                                        placeholder="hh:mm:ss"
                                        name="endTime"
                                        value={cap.endTime} 
                                        onChange={(e) => handleChange(index, e)} 
                                        disabled
                                    /> 
                                </div>
                            </div>
                            <Slider
                                className="w-full"
                                range
                                min={0}
                                max={videoRef.current ? videoRef.current.duration : 100}
                                value={[convertIntoSeconds(cap.startTime), convertIntoSeconds(cap.endTime)]}
                                onChange={(values) => handleSliderChange(index, values)}
                            />
                            <div className="flex gap-4">
                                <button onClick={() => addCaptionBelow(index)} className="text-blue-400 w-[50px]">Add</button>
                                <button onClick={() => deleteCaption(index)} className="text-red-400 w-[50px]">Delete</button>
                            </div>
                        </div>
                    ))
                }
                </div>
            </section>
        </main>
    </div>
  )
}

export default ManualTypingPage;