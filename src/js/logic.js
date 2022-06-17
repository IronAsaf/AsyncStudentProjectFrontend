import ReactDOM from "react-dom/client";
import { useNavigate } from "react-router-dom";


const root = ReactDOM.createRoot(
    document.getElementById("root")
  );

export function LoadDash()
{
    //let navigate = useNavigate(); 
    //let path = 'dashboard'; 
    //navigate(path);
}

export function AddExpense(expenseData)
{
    alert('data:'+expenseData.expenseName+'\n'+
    expenseData.cost+'\n'+
    expenseData.category+'\n'+
    expenseData.description+'\n')
}

const Logic = props => {}

export default Logic;