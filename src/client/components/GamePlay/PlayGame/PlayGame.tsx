
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetSingleGameQuery } from "../../../../redux/api";
import calculateX from "../../SizeThemes/CalculateX";
import calculateY from "../../SizeThemes/CalculateY";
import calculateMobileX from "../../SizeThemes/CalculateMobileX";
import calculateMobileY from "../../SizeThemes/CalculateYMobile";
import MobileTheme from "../../SizeThemes/MobileTheme";
import ReturnDashButton from "../Shared/ReturnDashButton";
import UpdateRole from "./UpdateRole";
import UpdateDeath from "./UpdateDeath";

const PlayGame: React.FC = () => {
  const [updatePlayer, setUpdatePlayer] = useState(false);
  const { gameId } = useParams();
  const id = Number(gameId);
  const { isMobile } = MobileTheme();
  const { data, error, isLoading } = useGetSingleGameQuery(id);
  if (isLoading) {
    console.log("Loading...");
    return
  }
  if (data) {
    console.log("Hi!")
    console.log(data)
  }
  if (error) {
    console.error(error);
  }

  return (
    <div>
      <ReturnDashButton />
      <Typography
        variant="h3"
        sx={{ fontWeight: "bold", color: "#FFFBE8", fontFamily: "fantasy", textAlign: "center" }}>
        {data && data.name}
      </Typography>
      {data && data.players.map((player: any, index: number) => {
        const role = data.roles.find((role: any) => role.roleId === player.roleId);
        return (
          <div key={player.playerId}>
            <Box sx={{
              position: "absolute",
              top: isMobile  ? calculateMobileY (index, data.players.length) - 30 : calculateY(index, data.players.length) - 30,
              left: isMobile ? calculateMobileX(index, data.players.length) -35 : calculateX(index, data.players.length) - 35,
              zIndex: 1
            }}>
              <UpdateDeath playerId={player.playerId} />
            </Box>
            <Card
              onClick={() => {
                console.log(`Clicked on ${player.name}`);
                setUpdatePlayer(player.playerId); // Update here with player.playerId
              }}
              elevation={10}
              sx={{
                backgroundImage: "radial-gradient(circle,#ffdac4,#ffdac4,#ffdac4,#ffdac4, #ffdac4, #ffd9b7, #ffd8a9, #ffd99b, #ffda8d, #f8c27a, #f0ab6a, #e7935d, #c66156, #993550, #631348, #280138)",
                position: "absolute",
                left: isMobile ? calculateMobileX(index, data.roles.length) : calculateX(index, data.roles.length),
                top: isMobile ? calculateMobileY(index, data.roles.length) : calculateY(index, data.roles.length),
                width: isMobile ? 70 : 120,
                height: isMobile ? 70 : 120,
                borderRadius: 100
              }}>
              <Box
                sx={{
                  fontFamily: "fantasy",
                  textAlign: "center",
                  my: isMobile ? 1 : 3
                }}>
                <Typography
                  variant={isMobile ? "h6" : "h5"}
                  sx={{ fontFamily: "fantasy" }}>
                  {player.name}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "fantasy",
                    fontSize: isMobile ? 10 : 18
                  }}>
                  {role && role.name}
                </Typography>
              </Box>
            </Card>
            {updatePlayer === player.playerId &&
              <UpdateRole
                playerId={player.playerId}
                gameId={id}
                roleId={player.roleId}
                originalName={player.name}
              />}
          </div>
        );
      })}
    </div>
  )
}
export default PlayGame