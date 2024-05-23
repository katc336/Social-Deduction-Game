import Alert from '@mui/material/Alert';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom"
import { useGetSingleGameQuery } from '../../../../redux/api';
import MobileTheme from '../../MobileTheme';
import scroll from "../../images/scroll.png"
import scrollMobile from "../../images/scrollMobile.png"


const RolePicker: React.FC = () => {
    const { gameId } = useParams();
    const id = Number(gameId);

    const isMobile = MobileTheme();

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
    return (
        <div>
                {data && data.roles.map((role: any) => (
                    <Typography
                        key={role.roleId}
                        sx={{
                            fontFamily: "fantasy",
                            textAlign: "center",
                            my: 1
                        }}>
                        {role.name}
                    </Typography>
                ))}
        </div>
    )
}
export default RolePicker