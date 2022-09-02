import { Routes, Route } from "react-router-dom"
import DashBoardHome from "../pages/DashBoardHome"



export default function DashBoardRoutes(){

    return(
        <>

        <Routes>
            <Route path="/" element={<DashBoardHome />} />

        </Routes>
        
        </>
    )
}