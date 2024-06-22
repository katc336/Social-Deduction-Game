import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useState } from "react"
import { useUpdatePlayerMutation } from "../../../../redux/api"
import MobileTheme from "../../SizeThemes/MobileTheme"

const UpdateRole: React.FC<PlayerIdProps> = ({ playerId, gameId, roleId, originalName }) => {
    const { isMobile } = MobileTheme();
    const [name, setName] = useState(originalName);
    const [role, setRole] = useState("");
    const [alert, setAlert] = useState(false);

    const [updatePlayer] = useUpdatePlayerMutation();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            if (name.trim() === "" || name.length > 20 || role.trim() === "" || role.length > 20) {
                setAlert(true);
            } else {
                const result = await updatePlayer({ playerId, name, roleName: role, gameId });
                setAlert(false);
                if ("data" in result) {
                    setName(originalName);
                    setRole("");
                    console.log(result);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Box sx={{
                backgroundColor: "#FFFBE8",
                borderRadius: "100px",
                boxShadow: isMobile ? "0px 0px 35px 40px #FFFBE8" : "0px 0px 60px 70px #FFFBE8",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                p: isMobile ? 1 : 5,
                mx: isMobile ? "20vw" : "40vw",
                mt: isMobile ? "20vh" : "30vh"
            }}>
                <form onSubmit={handleSubmit}>
                    <Stack direction={"column"}>
                        <TextField
                            label={`${originalName}'s Name`}
                            placeholder={`${originalName}'s Name`}
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            size="small"
                            color="secondary"
                            sx={{
                                mx: isMobile ? "165vw" : 70,
                                my: 1
                            }} />
                        <TextField
                            label={`${originalName}'s Role`}
                            placeholder={`${originalName}'s Role`}
                            value={role}
                            onChange={(event) => setRole(event.target.value)}
                            size="small"
                            color="secondary"
                            sx={{
                                mx: isMobile ? "165vw" : 70,
                                my: 1
                            }} />
                        <Box sx={{ mx: 80 }}>
                            <button
                                type="submit"
                                className="auth-button">
                                Update
                            </button>
                        </Box>
                    </Stack>
                </form>
                {isMobile
                    ?
                    <div />
                    :
                    <div>
                        {alert &&
                            <Alert severity="warning">
                                Name and Role must be filled in and not exceed 20 characters
                            </Alert>
                        }
                    </div>
                }
            </Box>
            {isMobile
                ?
                <div>
                    {alert &&
                        <Alert
                            sx={{ mt: isMobile ? 12 : 40 }}
                            severity="warning">
                            Name and Role must be filled in and not exceed 20 characters
                        </Alert>
                    }
                </div>
                :
                <div />
            }
        </div>
    )
}
export default UpdateRole