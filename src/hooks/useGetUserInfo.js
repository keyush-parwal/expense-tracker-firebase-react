export default function useGetUserInfo(){
    const {name, profilePhoto, isAuth, UserId}=JSON.parse(localStorage.getItem("auth")) || {};

    return {name, profilePhoto, isAuth, UserId};
}