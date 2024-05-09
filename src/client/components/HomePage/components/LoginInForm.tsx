import Alert from '@mui/material/Alert';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../../../redux/api';
import MobileTheme from "../../MobileTheme";
import authScroll from "../../../images/scroll.png"
import authScrollMobile from "../../../images/scrollMobile.png"


const LoginForm: React.FC<SwitchForm> = ({ switchForm }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(false);
    const [login] = useLoginMutation();
    const navigate = useNavigate();

    const { isMobile } = MobileTheme();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            const result = await login({ username, password });
            if ("data" in result) {
                // Successful login
                setLoginError(false);
                console.log("Success!");
                navigate("/story_teller");
            } else if ('error' in result) {
                // Error occurred
                setLoginError(true);
                console.log("Incorrect login credentials");
            } else {
                // Handle other cases if needed
                setLoginError(true);
                console.log("Unknown error occurred");
            }
        } catch (error) {
            console.error(error);
            setLoginError(true);
        }
    };


    return (
        <div>
            <Box sx={{
                backgroundImage: isMobile ? `url(${authScrollMobile})` : `url(${authScroll})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                p: isMobile ? 10 : 5,
                my: 10
            }}>
                <Typography
                    variant="h4"
                    sx={{
                        fontFamily: "fantasy",
                        textAlign: "center",
                        color: "#1E0542",
                        mb: 1
                    }}>
                    Login
                </Typography>
                {loginError && <Alert severity="error">Incorrect username or password. Please try again</Alert>}
                <Box sx={{ mx: isMobile ? 3 : 70 }}>
                    <form onSubmit={handleSubmit}>
                        <Stack direction="column">
                            <TextField
                                label="Username"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                size="small"
                                color="secondary"
                                sx={{ my: 1 }} />
                            <TextField
                                label="Password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                size="small"
                                color="secondary"
                                sx={{ my: 1 }} />
                            <Typography sx={{ textAlign: "center" }}>
                                <button
                                    className="auth-button"
                                    type="submit">
                                    <Typography sx={{ color: "#1E0542", }}>
                                        Login
                                    </Typography>
                                </button>
                            </Typography>
                        </Stack>
                    </form>
                </Box>
                <Typography sx={{
                    color: "#1E0542",
                    textAlign: "center",
                    mt: 1
                }}>
                    Don't have an account?
                </Typography>
                <Typography sx={{ textAlign: "center " }}>
                    <button
                        onClick={switchForm}
                        className="blank-button">
                        <Typography sx={{
                            color: "#1E0542",
                            textAlign: "center",
                            textDecoration: "underline"
                        }}>
                            Sign Up!
                        </Typography>
                    </button>
                </Typography>
            </Box>
        </div>
    );
};


export default LoginForm;
