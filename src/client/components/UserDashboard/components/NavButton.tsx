import Typography from "@mui/material/Typography"
import MobileTheme from "../../MobileTheme"

const NavButton: React.FC<NavButtonProps> = ({ text }) => {
    const isMobile = MobileTheme();
    return (
        <div>
            {isMobile
                ?
                <div>
                    <button className="mobile-nav-button">
                        <Typography
                            variant="h6"
                            sx={{
                                textAlign: "center",
                                color: "#1E0542",
                                fontFamily: "fantasy"
                            }}>
                            {text}
                        </Typography>
                    </button>

                </div>
                :
                <div>
                    <button className="nav-button">
                        <Typography
                            variant="h5"
                            sx={{
                                textAlign: "center",
                                color: "#1E0542",
                                fontFamily: "fantasy"
                            }}>
                            {text}
                        </Typography>
                    </button>
                </div>
            }
        </div>
    )
}
export default NavButton