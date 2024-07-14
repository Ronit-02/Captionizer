import { Route, Routes } from "react-router-dom"
import HomePage from "../pages/Home.page"
import EditPage from "../pages/Edit.page"
import ManualTypingPage from "../pages/ManualTyping.page"
import Layout from "./Layout"

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Layout />} >
            <Route path="/" element={<HomePage />} />
            <Route path="/edit" element={<EditPage />} />
            <Route path="/type-manually" element={<ManualTypingPage />} />
        </Route>
    </Routes>
  )
}

export default AppRoutes