// import { useLocation } from "react-router-dom";

import { useLocation, useNavigate } from "react-router-dom";

const EditPage = () => {
    
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const link = queryParams.get('link');   
    const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center w-full gap-12 text-center text-balance">
        <h1 className="text-2xl sm:text-3xl">Select one of the options below</h1>
        <video className="w-[500px]" controls>
            <source src={link} type="video/mp4" />
        </video>
        <div className="flex flex-col items-center w-full gap-4 max-w-[300px]">
            <button onClick={() => navigate(`/type-manually?link=${encodeURIComponent(link)}`)} className="w-full px-4 py-2 text-black border-2 rounded-lg">Type Manually</button>
            <button onClick={() => navigate(`/auto-sync`)} className="w-full px-4 py-2 text-black border-2 rounded-lg">Auto Sync</button>
            <button onClick={() => navigate(`/auto-recommend`)} className="w-full px-4 py-2 text-black border-2 rounded-lg">Auto Recommendation</button>
        </div>
    </div>
  )
}

export default EditPage;