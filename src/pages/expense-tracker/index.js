import { useState } from "react";
import useAddTransaction from "../../hooks/useAddTransaction"
import useGetTransaction from "../../hooks/useGetTransaction";
import useGetUserInfo from "../../hooks/useGetUserInfo";
import "./style.css";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase-config";

export default function ExpenseTracker() {
    const {addTransaction}=useAddTransaction();
    const {transaction, transactionTotal}=useGetTransaction();

    const {name, profilePhoto}=useGetUserInfo();
    const navigate=useNavigate();

    const [description, setDescription]=useState("");
    const [transactionAmount, setTransactionAmount]=useState(0);
    const [transactionType, setTransactionType]=useState("expense");

    const {balance,income,expense}=transactionTotal;

    const handelSubmit=(e)=>{
        e.preventDefault();
        addTransaction({description, transactionAmount, transactionType});

        setDescription("");
        setTransactionAmount("");
    }

    function capitalizeEachWord(string) {
        return string
          .toLowerCase()
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      }

      let newName=capitalizeEachWord(name);

      const signUserOut=async()=>{
        try{
            await signOut(auth);
            localStorage.clear();
            navigate("/");
        }
        catch(err){
            console.error(err);
        
        }

      }

    return(
        <>
        <div className="expense-tracker">
        <div className="container">
        {/* <img src="http://expenditure-tracker.com/wp-content/uploads/2016/05/expenseTrackerName.png"/> */}
            <h1> {newName} Expense Tracker</h1>
            <div className="balance">
                <h3>Your Balance</h3>
                {balance>=0? <h2>${balance}</h2>: <h2> -${balance*-1}</h2>}
            </div>
            <div className="summary">
                <div className="income">
                    <h4>Income</h4>
                    <p>${income}</p>
                </div>
                <div className="expense">
                    <h4>Expense</h4>
                    <p>${expense}</p>
                </div>
            </div>

            <form className="add-transaction" onSubmit={handelSubmit}>
                <input type="text" placeholder="Description" value={description} required
                onChange={(e)=>setDescription(e.target.value)}/>

                <input type="number" placeholder="Amount" value={transactionAmount} required
                onChange={(e)=>setTransactionAmount(e.target.value)}/>

                <input type="radio" id="expense" value="expense"
                onChange={(e)=>setTransactionType(e.target.value)}
                checked={transactionType==="expense"}/>
                <label htmlFor="expense">Expense</label>

                <input type="radio" id="income" value="income"
                onChange={(e)=>setTransactionType(e.target.value)}
                checked={transactionType==="income"}/>
                <label htmlFor="income">Income</label>

                <button type="submit">Add Transaction</button>

            </form>

        </div>

        {profilePhoto && (<div className="profile">
            <img className="profile-photo" src={profilePhoto}/>

            <button className="sign-out-button" onClick={signUserOut}>Sign Out</button>
            </div>)}

        </div>

        <div className="transaction">
            <h3>Transaction</h3>

            <ul>
                {transaction.map((t)=>{
                    const {transactionAmount,description,transactionType}=t;

                    return(
                        <li>
                            <h4>{description}</h4>
                            <p>${transactionAmount}     
                            • <label style={{color: transactionType ==="expense"?"red":"green"}}>{transactionType}</label></p>
                        </li>
                    )
                })}
            </ul>

        </div>
        </>
    )
}