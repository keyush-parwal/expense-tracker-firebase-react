import { auth,provider } from "../../config/firebase-config";
import {signInWithPopup} from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";
import useGetUserInfo from "../../hooks/useGetUserInfo";
import "./style.css";

export default function Auth() {
    const navigate=useNavigate();
    const {isAuth}=useGetUserInfo();

    const signInWithGoogle = async() => {
        const result= await signInWithPopup(auth,provider);

        const authInfo={
            name:result.user.displayName,
            UserId:result.user.uid,
            profilePhoto:result.user.photoURL,
            isAuth:true,
        };

        localStorage.setItem("auth",JSON.stringify(authInfo));
        navigate("/expense-tracker");
    }

    if(isAuth){
      return <Navigate to="/expense-tracker"/>
    }

  return (
    <div className="login-page">
        <p>Sign In With Google to Continue!</p>
        <button className="login-with-google-btn" onClick={signInWithGoogle}>
        Sign In with Google</button>
    </div>
  );
}