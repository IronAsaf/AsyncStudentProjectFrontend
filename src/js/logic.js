
export async function handleUserSignIn(userId, password)
{

    try {
        const response = await fetch("http://localhost:9000/is_authorize", {
            method: "get",
            headers: {'Authorization': 'Basic ' + btoa(`${userId}:${password}`)}
        })
        console.log(response)
        return response.ok;
    } catch (error) {
        return false;
    }
}

export function AddExpense(expenseData)
{
    alert('data:'+expenseData.expenseName+'\n'+
    expenseData.cost+'\n'+
    expenseData.category+'\n'+
    expenseData.description+'\n')
}