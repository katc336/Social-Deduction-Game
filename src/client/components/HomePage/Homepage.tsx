import LoginForm from "./components/LoginInForm"
import { useState } from "react"
import RegisterForm from "./components/RegisterForm";
const HomePage: React.FC = () => {
    const [login, setLogin] = useState(true);
    const [register, setRegister] = useState(false)

    const switchForm = () => {
        setLogin(!login);
        setRegister(!register);
    }

    return (
        <div>
            {login && <LoginForm switchForm={switchForm} />}
            {register && <RegisterForm switchForm={switchForm} />}

        </div>
    )
}
export default HomePage