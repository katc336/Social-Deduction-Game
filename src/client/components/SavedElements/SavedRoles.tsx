import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useGetAllRolesQuery } from "../../../redux/api"
import ReturnDashButton from '../GamePlay/Shared/ReturnDashButton';
import scroll from "../../images/scroll.png"
import MobileTheme from '../MobileTheme';
import DeleteRoleButton from './components/DeleteRoleButton';
const SavedRoles: React.FC = () => {
    const { data, error, isLoading } = useGetAllRolesQuery({});
    if (isLoading) {
        console.log("Loading...")
    }
    if (error) {
        console.log(error)
    }
    console.log(data);

    const isMobile = MobileTheme();
    return (
        <div>
            <ReturnDashButton />
            <Box>
                <Stack
                    direction="row"
                    flexWrap="wrap"
                >
                    {data && data.map((role: any) => (
                        <div key={role.roleId}>
                            <Box sx={{
                                backgroundImage: `url(${scroll})`,
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                width: 220,
                                p: 5,
                                m: 1,
                            }}>
                                <DeleteRoleButton gameId={role.roleId} />
                                <Typography
                                    sx={{ textAlign: "center" }}
                                    variant="h5">
                                    {role.name}
                                </Typography>
                                <Typography sx={{ textAlign: "center" }}>
                                    {role.descpription}
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