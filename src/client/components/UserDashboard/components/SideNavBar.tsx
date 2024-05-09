import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import navScroll from "../../../images/SideNavScroll.png"
import NavButton from './NavButton';

const SideNavBar = () => {
    const [activePage, setActivePage] = useState("");
    const location = useLocation();
    useEffect(() => {
        setActivePage(location.pathname);
    }, [location]);
    return (
        <div>
            <Drawer
                PaperProps={{
                    sx: {
                        backgroundColor: "transparent",
                        backgroundImage: `url(${navScroll})`,
                        backgroundSize: "100% 100%",
                        width: 400,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                    }
                }}
                variant="permanent"
                anchor="left">
                <Toolbar />
                <Link to={"/story_teller/new_game"}>
                    <NavButton text={"New Game"} />
                </Link>
                <Link to="/story_teller/old_games">
                    <NavButton text={"Previous Games"} />
                </Link>
                <Link to="">
                    <NavButton text={"See Old Scripts"} />
                </Link>
            </Drawer>
        </div>
    );
}
export default SideNavBar
