import Box from "@mui/material/Box";
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";
import { useGetAllRolesQuery } from "../../../redux/api";
import ReturnDashButton from '../GamePlay/Shared/ReturnDashButton';
import scroll from "../../images/scroll.png"
import MobileTheme from '../SizeThemes/MobileTheme';
import DeleteRoleButton from "../GamePlay/GameSetup/DeleteRoleButton";
import NoGameAddNewRole from "./components/NoGameAddNewRole";
const SavedRoles: React.FC = () => {
    const { data, error, isLoading } = useGetAllRolesQuery({});
    if (isLoading) {
        console.log("Loading...")
    }
    if (error) {
        console.log(error)
    }
    if (data) {
        console.log(data);
    }
    const { isMobile } = MobileTheme();
    return (
        <div>
            <ReturnDashButton />
            <Box>
                <NoGameAddNewRole />
                <Stack
                    direction="row"
                    flexWrap="wrap">
                    {data && data.map((role: any) => (
                        <div key={role.roleId}>
                            <Box sx={{
                                backgroundImage: `url(${scroll})`,
                                backgroundSize: "contain",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                width: 250,
                                p: 5,
                                m: 1,
                            }}>
                                <DeleteRoleButton roleId={role.roleId} />
                                <Typography
                                    sx={{ textAlign: "center" }}
                                    variant="h5">
                                    {role.name}
                                </Typography>
                                <Typography sx={{ textAlign: "center" }}>
                                    {role.description}
                                </Typography>
                                <Typography sx={{ textAlign: "center" }}>
                                </Typography>
                            </Box>
                        </div>
                    ))}
                </Stack>
            </Box>
        </div>
    )
}
export default SavedRoles