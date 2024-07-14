import { NavLink } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-primaryBlack">404 Page Not Found</h1>
        <h3 className="text-base text-gray-500 sm:text-xl">
            Go Back to <NavLink className="text-blue-500" to="/">Homepage</NavLink>
        </h3>
    </div>
  )
}

export default NotFoundPage;