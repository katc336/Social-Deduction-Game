import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Alert from '@mui/material/Alert';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from "react";
import MobileTheme from '../../SizeThemes/MobileTheme';
import scroll from "../../../images/scrollMobile.png"
import { useAddNewRolesMutation } from '../../../../redux/api';

const NoGameAddNewRole: React.FC = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [nameLengthError, setNameLengthError] = useState(false);
    const { isMobile } = MobileTheme();

    const [addRole] = useAddNewRolesMutation();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            if (name.trim() === "" || name.length > 20) {
                setNameLengthError(true);
            } else {
                const result = await addRole({ name, description });
                setNameLengthError(false);
                if ("data" in result) {
                    setName("");
                    setDescription("");
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
                backgroundImage: `url(${scroll})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                p: isMobile ? 3 : 5,
                mt: isMobile ? 1 : 10,
                mx: isMobile ? "10vw" : "20vw" ,
                width: isMobile ? "60vw" : "50vw"

            }}>
                <Accordion
                    elevation={0}
                    sx={{ backgroundColor: "transparent" }}>
                    <AccordionSummary
                        expandIcon={<KeyboardArrowDownIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography
                            variant={isMobile ? "h6" : "h4"}
                            sx={{
                                fontFamily: "fantasy",
                                textAlign: "center",
                                color: "#1E0542",
                                mb: 1
                            }}>
                            Add Playable Role
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <form onSubmit={handleSubmit}>
                            <Stack direction="column">
                                <TextField
                                    label="Role Name"
                                    placeholder="Role Name"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    size="small"
                                    color="secondary"
                                    sx={{
                                        my: 1,
                                        position: "abosolute",
                                    }} />
                                <TextField
                                    label="Role Description"
                                    placeholder="Role Description"
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                    size="small"
                                    color="secondary"
                                    sx={{
                                        my: 1,
                                        position: "abosolute",
                                    }} />
                                <Typography sx={{ fontFamily: "fantasy" }}>
                                    Upload Image: Coming Soon!
                                </Typography>
                                <Typography sx={{ textAlign: "center" }}>
                                    <button
                                        className={isMobile ? "nav2-mobile-button" : "nav2-button"}
                                        type="submit">
                                        <Typography sx={{ color: "#1E0542", }}>
                                            Add Role
                                        </Typography>
                                    </button>
                                </Typography>
                            </Stack>
                        </form>
                    </AccordionDetails>
                </Accordion>
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
export default NoGameAddNewRole