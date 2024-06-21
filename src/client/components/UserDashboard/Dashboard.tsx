import Box from "@mui/material/Box";
import SideNavBar from "./components/SideNavBar"
import MobileTheme from "../SizeThemes/MobileTheme"
import Typography from "@mui/material/Typography";
import { useGetUserQuery } from "../../../redux/api";

const Dashboard: React.FC = () => {
    const { isMobile } = MobileTheme();
    const { data, error, isLoading } = useGetUserQuery({});
    if (isLoading) {
        console.log("Loading...");
    }
    if (error) {
        console.error(error);
    }
    if (data) {
        console.log(data);
    }
    return (
        <div>
            <SideNavBar />
            <Box sx={{ ml: { xs: 22, sm: 50 } }}>
                <Typography
                    sx={{ 
                        fontFamily: "fantasy", 
                        color: "white",
                        fontSize: { xs: 20, sm: 70 }
                     }}
                >
                    Hello {data && data.username}
                </Typography>
            </Box>
        </div>
    )
}
export default Dashboard