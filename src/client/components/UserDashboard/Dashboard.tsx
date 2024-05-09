import Box from "@mui/material/Box";
import SideNavBar from "./components/SideNavBar"
import MobileTheme from "../MobileTheme"
import { Typography } from "@mui/material";

const Dashboard: React.FC = () => {
    const isMobile = MobileTheme();
    return (
        <div>
            <SideNavBar />
            <Box sx={{ ml: 40 }}>
                <Typography sx={{ color: "white" }}>
                    Hello
                </Typography>
            </Box>

        </div>
    )
}
export default Dashboard