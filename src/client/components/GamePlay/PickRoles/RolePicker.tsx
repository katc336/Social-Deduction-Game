import Alert from '@mui/material/Alert';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AddRoles from "./GameSetup/AddRoles"
import { useParams } from "react-router-dom"
import { useGetSingleGameQuery } from "../../../redux/api";
import MobileTheme from "../MobileTheme";
import scroll from "../../images/scroll.png"
import scrollMobile from "../../images/scrollMobile.png"


const RolePicker: React.FC = () => {
    const { gameId } = useParams();
    const id = Number(gameId);

    const isMobile = MobileTheme();

    const { data, error, isLoading } = useGetSingleGameQuery(id);
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
            <AddRoles gameId={id} />
            <button>
                Confirm Script
            </button>
            <Box sx={{
                backgroundImage: `url(${scrollMobile})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                minHeight: 800,
                maxWidth: 350,
                my: 10,
                mx: 70
            }}>
                <Typography
                    variant={isMobile ? "h6" : "h4"}
                    sx={{
                        fontFamily: "fantasy",
                        textAlign: "center",
                        color: "#1E0542",
                        mb: 1,
                        pt: 7
                    }}>
                    All Roles
                </Typography>
                {data && data.roles.map((role: any) => (
                    <Typography
                        key={role.roleId}
                        sx={{
                            fontFamily: "fantasy",
                            textAlign: "center",
                            my: 1
                        }}>
                        {role.name}
                    </Typography>
                ))}
            </Box>
        </div>
    )
}
export default RolePicker