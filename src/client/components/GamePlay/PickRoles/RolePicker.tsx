import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from '@mui/material/TextField';
import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from 'react';
import { useGetSingleGameQuery } from '../../../../redux/api';
import MobileTheme from '../../SizeThemes/MobileTheme';
import calculateX from '../../SizeThemes/CalculateX';
import calculateY from '../../SizeThemes/CalculateY';
import calculateMobileX from '../../SizeThemes/CalculateMobileX';
import calculateMobileY from '../../SizeThemes/CalculateYMobile';
import ReturnDashButton from '../Shared/ReturnDashButton';
import { useAddNewPlayerMutation } from '../../../../redux/api';

const RolePicker: React.FC = () => {
    const { gameId } = useParams();
    const id = Number(gameId);
    const [selectedRole, setSelectedRole] = useState({});
    const [selectedRoleId, setSelectedRoleId] = useState(-1);
    const [playerName, setPlayerName] = useState("");
    const [openRoles, setOpenRoles] = useState([]);
    const [chosenRoles, setChosenRoles] = useState([]);
    const { isMobile } = MobileTheme();
    const [addPlayer] = useAddNewPlayerMutation();
    const { data, error, isLoading } = useGetSingleGameQuery(id);
    useEffect(() => {
        if (isLoading) {
            console.log("Loading...");
        }
        if (data) {
            const filteredRoles = data.roles.filter((role: any) => !chosenRoles.includes(role.roleId));
            setOpenRoles(filteredRoles);
        }
        if (error) {
            console.error(error);
        }
    }, [data, chosenRoles]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            const result = await addPlayer({ name: playerName, gameId: id, roleId: Number(selectedRoleId) });
            setSelectedRole({});
            setSelectedRoleId(-1);
            setPlayerName("");
            setChosenRoles([...chosenRoles, selectedRoleId]);
        } catch (error) {
            console.error(error);
        }
    };
    // Mobile Circle
    console.log(openRoles)
    console.log(data)
    return (
        <div>
            <ReturnDashButton />
            <Box sx={{
                my: { sx: 1, sm: 10 },
                py: { sx: 1, sm: 20 },
            }}>
                {openRoles.length !== 0
                    ?//If there are still roles...
                    <div>
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
                                    sx={{
                                        backgroundColor: "#FFFBE8",
                                        mt: isMobile ? "17vh" : 0,
                                        mx: isMobile ? "28vw" : 70
                                    }} />
                                <Typography
                                    sx={{
                                        textAlign: "center",
                                        mt: isMobile ? "20vh" : 0
                                    }}>
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
                    </div>
                    ://If all roles are selected...
                    <div>
                        <Typography sx={{ textAlign: "center" }}>
                            <Link to={`/story_teller/${id}`}>
                                <button
                                    className="return-button">
                                    <Typography variant="h4">
                                        Start Game
                                    </Typography>
                                </button>
                            </Link>
                        </Typography>
                    </div>
                }
                <Stack spacing={2}>
                    {openRoles && openRoles.map((role: any, index: number) => (
                        <div onClick={() => {
                            setSelectedRole(role);
                            setSelectedRoleId(role.roleId);
                        }}>
                            <Card
                                key={role.id}
                                elevation={10}
                                sx={{
                                    backgroundImage: "radial-gradient(circle,#ffdac4,#ffdac4,#ffdac4,#ffdac4, #ffdac4, #ffd9b7, #ffd8a9, #ffd99b, #ffda8d, #f8c27a, #f0ab6a, #e7935d, #c66156, #993550, #631348, #280138)",
                                    position: "absolute",
                                    left: isMobile ? calculateMobileX(index, data.roles.length) : calculateX(index, data.roles.length),
                                    top: isMobile ? calculateMobileY(index, data.roles.length) : calculateY(index, data.roles.length),
                                    width: isMobile ? 70 : 120,
                                    height: isMobile ? 70 : 120,
                                    borderRadius: 100
                                }}
                            >
                                {selectedRole === role && (
                                    <Typography
                                        key={role.roleId}
                                        sx={{
                                            fontFamily: "fantasy",
                                            textAlign: "center",
                                            my: isMobile ? 3 : 6,
                                            fontSize: isMobile ? 10 : 18
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
