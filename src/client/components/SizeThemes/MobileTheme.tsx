import { createTheme, useTheme } from "@mui/material";
import { useMediaQuery } from "@mui/material";

const MobileTheme = () => {
   const theme = useTheme();
   const customTheme = createTheme(theme);
   const isMobile = useMediaQuery(customTheme.breakpoints.down("sm"));
   return { customTheme, isMobile };
}

export default MobileTheme;

