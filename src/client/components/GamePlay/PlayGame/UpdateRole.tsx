
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useState } from "react"
import { useUpdatePlayerMutation } from "../../../../redux/api"
import MobileTheme from "../../MobileTheme"
import scroll from "../../../images/scroll.png"

const UpdateRole: React.FC<PlayerIdProps> = ({ playerId, gameId, roleId, originalName }) => {
    const isMobile = MobileTheme();
    const [name, setName] = useState("");
    const [role, setRole] = useState("");

    const [updatePlayer] = useUpdatePlayerMutation();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
       try {
           event.preventDefault();
           const result = await updatePlayer({ playerId, name, roleName: role, gameId }); // Update roleName to role
           if ("data" in result) {
               setName("");
               setRole(""); // Reset role state as well
               console.log(result);
           }
       } catch (error) {
           console.error(error);
       }
    };
    
    return (
        <div>
            <Box sx={{
                backgroundImage: `url(${scroll})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                p: isMobile ? 5 : 10,
                mt: "30vh"
            }}>
                <form onSubmit={handleSubmit}>
                    <Stack direction={"column"}>
                        <TextField
                            label={`Update ${originalName}'s Name`}
                            placeholder={`Update ${originalName}'s Name`}
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            size="small"
                            color="secondary"
                            sx={{ mx: 70, my: 1 }} />
                        <TextField
                            label={`Update ${originalName}'s Role`}
                            placeholder={`Update ${originalName}'s Role`}
                            value={role}
                            onChange={(event) => setRole(event.target.value)}
                            size="small"
                            color="secondary"
                            sx={{ mx: 70, my: 1 }} />
                        <Box sx={{ mx: 80 }}>
                            <button
                                type="submit"
                                className="auth-button">
                                Update
                            </button>
                        </Box>
                    </Stack>
                </form>
            </Box>
        </div>
    )
}
export default UpdateRole