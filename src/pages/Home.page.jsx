import { useState } from "react"
import { useNavigate } from "react-router-dom";
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
    <div className="w-full flex flex-col items-center gap-8">
        <h1 className="text-2xl">Enter Your Video URL</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 items-center">
            <input type="text" className="px-4 py-2 border border-gray-400 rounded-xl w-[500px]" placeholder="Enter url..." value={link} onChange={(e) => setLink(e.target.value)} />
            <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-lg w-[100px]">Submit</button>
        </form>
        {/* {
          message && <div className="text-gray-400 italic">{message}</div>
        } */}
    </div>
  )
}

export default HomePage