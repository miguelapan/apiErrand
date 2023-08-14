const DATABASE_URL = 'http://localhost:3000'

const handleHttpError = (error) => console.error(error);
const handleResponse = (response) => {
    if(!response.ok) {
        return handleHttpError();
    }
    return response.json()
};

export const httpService = {
    get: async () => {
        const response = await fetch(`${DATABASE_URL}/cases`);
        if(!response.ok){
            return handleHttpError();
        }
        return response.json()
    },
    post: async (data, email, message) => {
        const response = await fetch(`${DATABASE_URL}/comments`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"task": `${data}`, "email": `${email}`, "message": `${message}`})
        });
        console.log("POST COMPLETED");
        return handleResponse(response)
    },
    patch: async (id, task, comment, completed) => {
        const response = await fetch(`${DATABASE_URL}/cases/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"task": `${task}`, "comments": `${comment}`, "status": `${completed}`})
        });
        console.log("PATCH COMPLETE");
        return handleResponse(response)
    },
    delete: async (id) => {
        const response = await fetch(`${DATABASE_URL}/cases/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('DELETE COMPLETE')
        return handleResponse(response)
    }
}