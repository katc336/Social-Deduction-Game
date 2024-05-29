import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom"
import { useState } from 'react';
import { useGetSingleGameQuery } from '../../../../redux/api';
import MobileTheme from '../../MobileTheme';
import scroll from "../../../images/scroll.png"
import ReturnDashButton from '../Shared/ReturnDashButton';

const RolePicker: React.FC = () => {
    const { gameId } = useParams();
    const id = Number(gameId);
    const [selectedRole, setSelectedRole] = useState(-1);
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

    const handleCardClick = (role: number) => {
        setSelectedRole(role);
    }

    return (
        <div>
            <ReturnDashButton />
            <Box sx={{
                backgroundImage: `url(${scroll})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                my: 10,
            }}>
                <Typography
                    variant="h3"
                    sx={{ my: 3, fontFamily: "fantasy", textAlign: "center" }}>
                    Select Your Character:
                </Typography>
                <Stack spacing={2}>
                    {data && data.roles.map((role: any) => (
                        <div onClick={() => handleCardClick(role)}>
                            <Card
                                elevation={selectedRole === role ? 10 : 1}
                                sx={{ width: 150, height: 150, borderRadius: 100 }}
                            >
                                {selectedRole === role && (
                                    <Typography
                                        key={role.roleId}
                                        sx={{
                                            fontFamily: "fantasy",
                                            textAlign: "center",
                                            my: 8
                                        }}>
                                        {role.name}
                                    </Typography>
                                )}
                            </Card>
                        </div>
                    ))}
                </Stack>
                <Box>
                </Box>
            </Box>
        </div>
    )
}
export default RolePicker
