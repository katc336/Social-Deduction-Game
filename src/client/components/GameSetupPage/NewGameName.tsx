import Alert from '@mui/material/Alert';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAddNewGameMutation } from '../../../redux/api';
import MobileTheme from '../MobileTheme';
import scroll from "../../images/scroll.png"
import scrollMobile from "../../images/scrollMobile.png"


const NewGameName: React.FC = () => {
    const [name, setName] = useState("");
    const [nameLengthError, setNameLengthError] = useState(false);
    const [addGameName] = useAddNewGameMutation(name);

    const { isMobile } = MobileTheme();

    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            const result = await addGameName({ name });
            if (name.trim() === "" || name.length > 50) {
                setNameLengthError(true);
            } else
                if ("data" in result) {
                    const gameId = result.data.id;
                    navigate(`/story_teller/my_game/${gameId}`);
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
                my: 10
            }}>
                <Typography
                    variant={isMobile ? "h6" : "h4"}
                    sx={{
                        fontFamily: "fantasy",
                        textAlign: "center",
                        color: "#1E0542",
                        mb: 1
                    }}>
                    Step 1:  Name Your Game
                </Typography>
                {nameLengthError
                    &&
                    <Alert severity="error">
                        Please make sure your name is 1-50 characters
                    </Alert>
                }
                <Box sx={{ mx: isMobile ? 5 : 50 }}>
                    <form onSubmit={handleSubmit}>
                        <Stack direction="column">
                            <TextField
                                label="Add New Game's Name"
                                placeholder="Add New Game's Name"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                size="small"
                                color="secondary"
                                sx={{ my: 1 }} />
                            <Typography sx={{ textAlign: "center" }}>
                                <button
                                    className="auth-button"
                                    type="submit">
                                    <Typography sx={{ color: "#1E0542", }}>
                                        Create
                                    </Typography>
                                </button>
                            </Typography>
                        </Stack>
                    </form>
                </Box>
            </Box>
        </div>
    );
};


export default NewGameName;
