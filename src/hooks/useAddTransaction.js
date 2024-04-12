import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "../config/firebase-config";
import useGetUserInfo from "./useGetUserInfo";

export default function useAddTransaction(){
    const transactionCollectionRef=collection(db, "transactions");
    const {UserId}=useGetUserInfo();

    const addTransaction=async({
        description,
        transactionAmount,
        transactionType,
    })=>{
        await addDoc(transactionCollectionRef,{
            UserId,
            description,
            transactionAmount,
            transactionType,
            created:serverTimestamp()
        });
    };

    return {addTransaction};
}