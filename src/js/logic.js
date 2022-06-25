const BASE_URL = "http://localhost:9000"


export async function handleUserSignIn(userId, password) {

    try {
        const response = await fetch(`${BASE_URL}/is_authorize`, {
            method: "get",
            headers: {'Authorization': 'Basic ' + btoa(`${userId}:${password}`)}
        })
        //return true;
        return response.ok;
    } catch (error) {
        return false;
    }
}

export async function postNewExpense(userId, password, expense) {

    try {
        const response = await fetch(`${BASE_URL}/expense/user/${userId}`, {
            method: "POST",
            headers: {'Authorization': 'Basic ' + btoa(`${userId}:${password}`), 'Content-Type': 'application/json'},
            body: JSON.stringify({
                "cost": parseInt(expense.cost),
                "category": expense.category,
                "description": expense.description
            })
        })
        //return true;
        return response;
    } catch
        (error) {
        return false;
    }
}


export async function getExpensesById(userId, password) {

    try {
        const response = await fetch(`${BASE_URL}/expenses/user/${userId}`, {
            method: "get",
            headers: {'Authorization': 'Basic ' + btoa(`${userId}:${password}`)}
        })
        const res = await response.json()
        return res;
    } catch (error) {
        return false;
    }
}

export async function getExpensesByYear(userId, password, year) {

    try {
        const response = await fetch(`${BASE_URL}/expenses-statistics/user/${userId}/year/${year}`, {
            method: "get",
            headers: {'Authorization': 'Basic ' + btoa(`${userId}:${password}`)}
        })
        const res = await response.json()
        return res;
    } catch (error) {
        return false;
    }
}

export async function getExpensesByYearAndMonth(userId, password, year, month) {

    try {
        const response = await fetch(`${BASE_URL}/expenses-statistics/user/${userId}/year/${year}/month/${month}`, {
            method: "get",
            headers: {'Authorization': 'Basic ' + btoa(`${userId}:${password}`)}
        })
        const res = await response.json()
        return res;
    } catch (error) {
        return false;
    }
}

export async function getExpensesByCategory(userId, password, category) {

    try {
        const response = await fetch(`${BASE_URL}/expenses-statistics/user/${userId}/category/${category}`, {
            method: "get",
            headers: {'Authorization': 'Basic ' + btoa(`${userId}:${password}`)}
        })
        const res = await response.json()
        return res;
    } catch (error) {
        return false;
    }
}