// import { useLocation } from "react-router-dom";

import { useLocation, useNavigate } from "react-router-dom";

const EditPage = () => {
    
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const link = queryParams.get('link');   
    const navigate = useNavigate();

    const handleTypeManually = () => {
        navigate(`/type-manually?link=${encodeURIComponent(link)}`);
    }

  return (
    <div className="w-full flex flex-col items-center gap-8">
        <h1 className="text-2xl">Provide captions to your video</h1>
        <video className="w-[500px]" controls>
            <source src={link} type="video/mp4" />
        </video>
        <div className="flex flex-col gap-4 items-center">
            <button onClick={handleTypeManually} className="px-4 py-2 text-white bg-blue-500 rounded-lg w-[150px]">Type Manually</button>
            <button className="px-4 py-2 text-white bg-blue-500 rounded-lg w-[150px]">Auto Sync</button>
            <button className="px-4 py-2 text-white bg-blue-500 rounded-lg w-[200px]">Auto Recommendation</button>
        </div>
    </div>
  )
}

export default EditPage;