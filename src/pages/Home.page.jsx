import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Features from "../components/Features";
import ExportCaptions from "../assets/images/easy-export.jpg";
import ChooseLanguage from "../assets/images/choose-language.png";
// import { isURLValid } from "../utils/helper";

const HomePage = () => {

    const navigate = useNavigate();
    const [link, setLink] = useState('');
    // const [message, setMessage] = useState('');
    // const url = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";

    const handleSubmit = (e) => {
        e.preventDefault();

        // validate link
        // if(isURLValid(link))
        //   setMessage('Invalid url')
        
        // send it to edit page
        navigate(`/edit?link=${encodeURIComponent(link)}`);
    };

  return (
    <div className="flex flex-col items-center w-full gap-24">
        <section className="flex flex-col items-center gap-8">
            <h1 className="w-full text-5xl leading-tight text-center font-primaryBlack">Create Captions for Video</h1>
            <h3 className="text-xl text-gray-600 font-primaryLight">Use our advanced tool to create your captions superfast</h3>
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-full gap-8 md:flex-row">
                <input type="text" className="flex-auto w-full px-4 py-2 border border-gray-400 rounded-md" placeholder="Enter video url" value={link} onChange={(e) => setLink(e.target.value)} />
                <button type="submit" className="flex-none px-4 py-2 text-white bg-blue-500 rounded-lg w-[100px]">Submit</button>
            </form>
        </section>
        <section className="flex flex-col gap-8">
            <Features 
                title = "Caption your videos in any language"
                image = {ChooseLanguage}
                reverse = {false}
                />
            <Features 
                title = "Export your captions in latest format"
                image = {ExportCaptions}
                reverse = {true}
            />
        </section>
        {/* {
          message && <div className="italic text-gray-400">{message}</div>
        } */}
    </div>
  )
}

export default HomePage