import { useState,useEffect } from "react";
import { query, collection, where, orderBy, onSnapshot } from "firebase/firestore"
import { db } from "../config/firebase-config";
import useGetUserInfo from "./useGetUserInfo";

export default function useGetTransaction(){
    const [transaction, setTransaction]=useState([]);
    const [transactionTotal, setTransactionTotal]=useState({balance:0.0, income:0.0, expense:0.0});

    const transactionCollectionRef=collection(db, "transactions");
    const {UserId}=useGetUserInfo();

    const getTransaction=async()=>{
        let unscribe;
        try{
            const queryTransactions= query(transactionCollectionRef,
                where("UserId", "==", UserId),
                orderBy("created"));

                unscribe = onSnapshot(queryTransactions, (snapshot)=>{
                    let docs=[];
                    let totalIncome=0;
                    let totalExpense=0;
                    
                    snapshot.forEach((doc)=>{
                        const data=doc.data();
                        const id=doc.id;
                        docs.push({...data, id});

                        if(data.transactionType==="income"){
                            totalIncome+=parseFloat(data.transactionAmount);
                        }
                        else{
                            totalExpense+=parseFloat(data.transactionAmount);
                        }

                    });

                    setTransaction(docs);

                    let balance=totalIncome-totalExpense;
                    setTransactionTotal({balance, income:totalIncome, expense:totalExpense});
                });
        }
        catch(err){
            console.error(err);
        }

        return ()=>unscribe();
    };

    useEffect(()=>{
        getTransaction();
    },[]);

    return {transaction, transactionTotal};
}