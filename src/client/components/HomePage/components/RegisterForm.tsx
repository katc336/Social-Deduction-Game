import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useRegisterMutation } from "../../../../redux/api";
import { useNavigate } from "react-router-dom";
import MobileTheme from "../../SizeThemes/MobileTheme";
import authScroll from "../../../images/scroll.png"
import authScrollMobile from "../../../images/scrollMobile.png";

const RegisterForm: React.FC<SwitchForm> = ({ switchForm }) => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [registerError, setRegisterError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [signup] = useRegisterMutation();
    const navigate = useNavigate();

    const { isMobile } = MobileTheme();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            if (username.trim() === "" || name.length > 30 || username.length > 30) {
                setNameError(true);
                setPasswordError(false);
            } else if (password.trim() === "" || password.length < 8 || password.length > 30) {
                setPasswordError(true);
                setNameError(false);
            } else {
                const result = await signup({ username, password })
                if ("data" in result) {
                    setRegisterError(false);
                    setNameError(false);
                    setPasswordError(false);
                    console.log("Success!");
                    navigate("/story_teller");
                } else {
                    setRegisterError(true);
                    setPasswordError(false);
                    setNameError(false);
                    console.error("Error in registration");
                }
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div>
            <Box sx={{ my: 10 }}>
                <Box sx={{
                    backgroundImage: isMobile ? `url(${authScrollMobile})` : `url(${authScroll})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    p: isMobile ? 10 : 5,
                }}>
                    <Typography
                        variant="h4"
                        sx={{
                            color: "#1E0542",
                            textAlign: "center",
                            fontFamily: "fantasy",
                            mb: 1
                        }}>
                        Sign Up
                    </Typography>
                    {
                        registerError &&
                        <Alert severity="error" >
                            There was an error. Please try again with another username.
                        </Alert>
                    }
                    {
                        nameError &&
                        <Alert severity="error" >
                            Please make sure your username and name are 1-30 characters long.
                        </Alert>
                    }
                    {
                        passwordError &&
                        <Alert severity="error" >
                            Please make sure your password is 8-30 characters long.
                        </Alert>
                    }
                    <Box sx={{ mx: isMobile ? 3 : 70 }}>
                        <form onSubmit={handleSubmit}>
                            <Stack direction="column">
                                <TextField
                                    fullWidth
                                    label="Username"
                                    value={username}
                                    onChange={(event) => setUsername(event.target.value)}
                                    size="small"
                                    color="secondary"
                                    sx={{ my: 1 }} />
                                <TextField
                                    fullWidth
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
                                            Sign Up
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
                        Have an account?
                    </Typography>
                    <Typography sx={{
                        textAlign: "center",
                    }}>
                        <button
                            onClick={switchForm}
                            className="blank-button">
                            <Typography sx={{
                                textDecoration: "underline",
                                color: "#1E0542",
                            }}>
                                Go to Login
                            </Typography>
                        </button>
                    </Typography>
                </Box>
            </Box>
        </div>
    )
}
export default RegisterForm