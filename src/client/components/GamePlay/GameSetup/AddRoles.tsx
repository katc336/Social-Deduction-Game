import Alert from '@mui/material/Alert';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import MobileTheme from '../../SizeThemes/MobileTheme';
import scroll from "../../../images/scroll.png"
import { useAddNewRolesMutation } from "../../../../redux/api"
import ReturnDashButton from '../Shared/ReturnDashButton';

const AddRoles: React.FC<GameIdProps> = ({ gameId }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [nameLengthError, setNameLengthError] = useState(false);
    const { isMobile } = MobileTheme();

    const [addRole] = useAddNewRolesMutation();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            if (name.trim() === "" || name.length > 20) {
                setNameLengthError(true);
            } else {
                const result = await addRole({ name, description, gameId: Number(gameId) });
                setNameLengthError(false);
                if ("data" in result) {
                    setName("");
                    console.log(result);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };
 
    return (
        <div>
            <ReturnDashButton />
            <Box sx={{
                backgroundImage: `url(${scroll})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                p: isMobile ? 5 : "5vw",
                mt: isMobile ? 1 : 10
            }}>
                <Typography
                    variant={isMobile ? "h6" : "h4"}
                    sx={{
                        fontFamily: "fantasy",
                        textAlign: "center",
                        color: "#1E0542",
                        mb: 1
                    }}>
                    Step 1:  Add Role
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Stack direction="column">
                        <TextField
                            label="Add Character's Name"
                            placeholder="Add Characters Name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            size="small"
                            color="secondary"
                            sx={{
                                my: 1,
                                position: "abosolute",
                                mx: isMobile ? "10vw" : "30vw"
                            }} />
                        <Typography sx={{ textAlign: "center" }}>
                            <button
                                className={ isMobile ? "nav2-mobile-button" : "nav2-button"}
                                type="submit">
                                <Typography sx={{ color: "#1E0542", }}>
                                    Add
                                </Typography>
                            </button>
                        </Typography>
                    </Stack>
                </form>
            </Box>
            {nameLengthError
                &&
                <Alert
                    severity="error"
                    sx={{
                        position: "abosolute",
                        mx: isMobile ? "1vw" : "30vw",
                        mt: isMobile ? 0 : 3
                    }}>
                    Make sure the role is 1-20 characters.
                </Alert>
            }
        </div>
    )
}
export default AddRoles