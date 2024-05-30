import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from '@mui/material/TextField';
import { useParams } from "react-router-dom"
import { useState } from 'react';
import { useGetSingleGameQuery } from '../../../../redux/api';
import MobileTheme from '../../MobileTheme';
import scroll from "../../../images/scroll.png"
import ReturnDashButton from '../Shared/ReturnDashButton';
import { useAddNewPlayerMutation } from '../../../../redux/api';

const RolePicker: React.FC = () => {
    const { gameId } = useParams();
    const id = Number(gameId);
    const [selectedRole, setSelectedRole] = useState({});
    const [selectedRoleId, setSelectedRoleId] = useState(-1);
    const [playerName, setPlayerName] = useState("");
    const [playerNameError, setPlayerNameError] = useState(false);
    const isMobile = MobileTheme();

    const [addPlayer] = useAddNewPlayerMutation()

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
    console.log(selectedRoleId)
    console.log(selectedRole)
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            if (playerName.trim() === "" || playerName.length > 20) {
                setPlayerNameError(true);
            } else {
                const result = await addPlayer({ name: playerName, gameId: id, roleId: Number(selectedRoleId) });
                setSelectedRole({});
                setSelectedRoleId(-1);
                setPlayerName("");
            }
        } catch (error) {
            console.error(error);
        }
    };
    const calculateX = (index: number, total: number) => {
        const angle = (index / total) * Math.PI * 2;
        return Math.cos(angle) * 350 + 700; //radius
    }
    const calculateY = (index: number, total: number) => {
        const angle = (index / total) * Math.PI * 2;
        return Math.sin(angle) * 350 + 500; //radius
    }
    return (
        <div>
            <ReturnDashButton />
            <Box sx={{
                my: 10,
                py: 20
            }}>
                <Typography
                    variant="h4"
                    sx={{ fontWeight: "bold", color: "#FFFBE8", my: 5, fontFamily: "fantasy", textAlign: "center" }}>
                    Select Your Character
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Stack direction={"column"}>
                        <TextField
                            label="Player's Name"
                            placeholder="Add Your Name"
                            value={playerName}
                            onChange={(event) => setPlayerName(event.target.value)}
                            size="small"
                            variant="filled"
                            color="secondary"
                            sx={{backgroundColor:"white", mx: isMobile ? 70 : 5 }}
                        />
                        <Typography sx={{ textAlign: "center" }}>
                            <button
                                className="return-button"
                                type="submit">
                                <Typography sx={{ color: "#1E0542", }}>
                                    Add Player's Role
                                </Typography>
                            </button>
                        </Typography>
                    </Stack>
                </form>
                <Stack spacing={2}>
                    {data && data.roles.map((role: any, index: number) => (
                        <div onClick={() => {
                            setSelectedRole(role);
                            setSelectedRoleId(role.roleId);
                        }}>
                            <Card
                                key={role.id}
                                elevation={10}
                                sx={{
                                    position: "absolute",
                                    left: calculateX(index, data.roles.length),
                                    top: calculateY(index, data.roles.length),
                                    width: 120,
                                    height: 120,
                                    borderRadius: 100
                                }}
                            >
                                {selectedRole === role && (
                                    <Typography
                                        key={role.roleId}
                                        sx={{
                                            fontFamily: "fantasy",
                                            textAlign: "center",
                                            my: 6
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


export default RolePicker;
