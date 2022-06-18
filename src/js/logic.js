import ReactDOM from "react-dom/client";
import { useNavigate } from "react-router-dom";
import Dashboard from "./dashboard";

const root = ReactDOM.createRoot(
    document.getElementById("root")
  );

export function LoadDash()
{
    //let navigate = useNavigate(); 
    //let path = 'dashboard'; 
    //navigate(path);

    root.render(<Dashboard/>);
}

let temp = false;
export async function handleUserSignIn(userData)
{
    //do things
    //if ok loadDash
    //if not, throw alert.

    if(temp)
    {
        LoadDash();
    }
}

export function AddExpense(expenseData)
{
    alert('data:'+expenseData.expenseName+'\n'+
    expenseData.cost+'\n'+
    expenseData.category+'\n'+
    expenseData.description+'\n')
}