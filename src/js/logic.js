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

export function handleUserSignIn(userData)
{
    alert(userData);
    var xhr = new XMLHttpRequest();
    xhr.open("GET","http://localhost:9000/is_authorize",true)
    console.log(userData)
    xhr.send()
    return xhr.responseType;

}

export function AddExpense(expenseData)
{
    alert('data:'+expenseData.expenseName+'\n'+
    expenseData.cost+'\n'+
    expenseData.category+'\n'+
    expenseData.description+'\n')
}