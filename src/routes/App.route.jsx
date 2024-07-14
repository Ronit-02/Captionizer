import { Route, Routes } from "react-router-dom"
import HomePage from "../pages/Home.page"
import EditPage from "../pages/Edit.page"
import ManualTypingPage from "../pages/ManualTyping.page"
import Layout from "./Layout"
import NotFoundPage from "../pages/NotFound.page"
import ComingSoonPage from "../pages/ComingSoon.page"

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Layout />} >
            <Route path="/" element={<HomePage />} />
            <Route path="/edit" element={<EditPage />} />
            <Route path="/type-manually" element={<ManualTypingPage />} />
            <Route path="/auto-sync" element={<ComingSoonPage />} />
            <Route path="/auto-recommend" element={<ComingSoonPage />} />
        </Route>
          <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRoutes