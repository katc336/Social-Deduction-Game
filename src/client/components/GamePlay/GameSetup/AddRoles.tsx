import Alert from '@mui/material/Alert';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import MobileTheme from '../../MobileTheme';
import scroll from "../../../images/scroll.png"
import { useAddNewRolesMutation } from "../../../../redux/api"
import ReturnDashButton from '../Shared/ReturnDashButton';

const AddRoles: React.FC<GameIdProps> = ({ gameId }) => {
    const [name, setName] = useState("");
    const [nameLengthError, setNameLengthError] = useState(false);
    const isMobile = MobileTheme();

    const [addRole] = useAddNewRolesMutation();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            const result = await addRole({ name, gameId });
            if (name.trim() === "" || name.length > 20) {
                setNameLengthError(true);
            } else
                if ("data" in result) {
                    setName("");
                    console.log(result);
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
                p: isMobile ? 5 : 10,
                mt: 10
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
                            sx={{ my: 1, mx: isMobile ? 70 : 5 }} />
                        <Typography sx={{ textAlign: "center" }}>
                            <button
                                className="auth-button"
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
                    sx={{ mx: 65, mt: 3 }}>
                    Please make sure the role is 1-20 characters
                </Alert>
            }
        </div>
    )
}
export default AddRoles