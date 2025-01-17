import { useContext } from "react";
import { GlobalContext } from "../context";
import serverProvider from "../service";

const useUser = () => {
    const { state, update } = useContext(GlobalContext);

    const signUp = async (userData: any) => {
        const result = await serverProvider.signUp(userData);
        if (result.message === "SignUp Successfully") {
            alert("SignUp Successfully");
        } else {
            alert("SignUp Failed");
        }
    }

    const login = async (userData: any) => {
        
        const result = await serverProvider.login(userData);
        console.log(result);
        if (result.message === "Login Successfully") {
            localStorage.setItem("userData", JSON.stringify(result.data));
            getUserData();
        } else {
            alert("userName or password is incorrect");
        }
    }

    const logOut = () => {
        update({ userData: null });
        localStorage.removeItem("userData");
    }

    const getUserData = () => {
        const userData = localStorage.getItem("userData");
        if (userData) {
            const user = JSON.parse(userData);
            update({ userData: user });
        } else {
            update({ userData: null });
        }
    }

    return {
        userData: state.userData,
        signUp,
        login,
        logOut,
        getUserData
    }
}

export default useUser;