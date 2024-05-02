import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import About from "./pages/About/About"
import Game from "./pages/Game/Game"
import Settings from "./pages/Options/Settings"
import Records from "./pages/Records/Records"
import NoMatch from "./pages/NoMatch/NoMatch"

export const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="game" element={<Game />} />
            <Route path="about" element={<About />} />
            <Route path="settings" element={<Settings />} />
            <Route path="records" element={<Records />} />
            <Route path="*" element={<NoMatch />} />
        </Routes>
    )
}
