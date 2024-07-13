import { Route, Routes } from "react-router-dom"
import HomePage from "../pages/Home.page"
import EditPage from "../pages/Edit.page"
import ManualTypingPage from "../pages/ManualTyping.page"

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/edit" element={<EditPage />} />
        <Route path="/type-manually" element={<ManualTypingPage />} />
    </Routes>
  )
}

export default AppRoutes