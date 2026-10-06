// async function myFunction() {
//     const URL = "https://jsonplaceholder.typicode.com/users";
//     const res = await fetch(URL);

//     if (!res.ok) {
//         throw new Error(`HTTP Error: ${res.status}`);
//     }

//     const data = await res.json();

//     console.log(data);
// }

// myFunction();

async function myFunction() {
    const URL = "https://jsonplaceholder.typicode.com/users/1";

    try {
        const res = await fetch(URL);

        if (!res.ok) {
            throw new Error(`HTTP Error: ${res.status}`);
        }

        const data = await res.json();

        console.log(data);
        console.log(data.name);
        console.log(data.email);
        console.log(data.address.city);

    } catch (error) {
        console.error("Fetch error:", error);
    }
}

myFunction();

async function myFunction() {
    const URL = "https://jsonplaceholder.typicode.com/users";

    try {
        const res = await fetch(URL);

        if (!res.ok) {
            throw new Error(`HTTP Error: ${res.status}`);
        }

        const data = await res.json();

        console.log(data);
        console.log(data[1].name);
        console.log(data[1].email);
        console.log(data[1].address.city);

    } catch (error) {
        console.error("Fetch error:", error);
    }
}

myFunction();

async function getUsers() {
    const URL = "https://jsonplaceholder.typicode.com/users";

    try {
        const response = await fetch(URL);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const user = await response.json();

        const users = user.map(user => {
            const { name, email, address: { city } } = user;
            return { name, email, city };
        });
        return users;
    }
    catch (error) {
        console.error("Fetch error:", error);
    }
}
const users = getUsers();

console.log(users);

async function createUsers() {
    const url = "https://jsonplaceholder.typicode.com/users";

    try {
        const res = await fetch(url,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: "John Doe",
                    email: "john.doe@example.com"
                })
            }
        )

        if (!res.ok) {
            throw new Error(`HTTP Error: ${res.status}`);
        }
        const userData = await res.json();
        console.log(userData);
    }
    catch (error) {
        console.error("Fetch error:", error);
    }
}

createUsers();

async function updateUser() {
    const url = "https://jsonplaceholder.typicode.com/users/1";

    try {
        const res = await fetch(url, {
            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: "Rishabh"
            })
        });
        if (!res.ok) {
            throw new Error(`HTTP Error: ${res.status}`);
        }
        const data = await res.json();
        console.log(data);
    }
    catch (error) {
        console.error("Fetch error:", error);
    }
}

updateUser();

async function deleteUser() {
    const url = "https://jsonplaceholder.typicode.com/users/2";

    try {
        const res = await fetch(url, {
            method: "DELETE"
        });

        if (!res.ok) {
            throw new Error(`HTTP Error: ${res.status}`);
        }

        if (res.status !== 204) {
            const data = await res.json();
            console.log(data);
        }
    }
    catch (error) {
        console.error("Fetch error:", error);
    }
}

deleteUser();

async function patchUser() {
    const url = "https://jsonplaceholder.typicode.com/users/3";

    try {
        const res = await fetch(url, {
            method: "PATCH",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: "Rishabh"
            })

        })
        if (!res.ok) {
            throw new Error(`HTTP Error: ${res.status}`);
        }

        const data = await res.json();
        console.log(data);
    }
    catch (error) {
        console.error("Fetch error:", error);
    }
}

patchUser();

// Challenge — Query Parameters

async function getUsersWithQueryParams() {

    const params = new URLSearchParams({
        _limit: 6
    });
    const url1 = `https://jsonplaceholder.typicode.com/users?${params}`;

    try {
        const res = await fetch(url1);

        if (!res.ok) {
            throw new Error(`HTTP Error: ${res.status}`)
        }

        const data = await res.json();
        console.log(data);
    }
    catch (error) {
        console.error("Server Error:", error);
    }
}

getUsersWithQueryParams();

// async function request(url) {
//     try {
//         const res = await fetch(url);

//         if (!res.ok) {
//             throw new Error(`HTTP Error: ${res.status}`);
//         }
//         return await res.json();
//     }
//     catch (error) {
//         console.error("Server Error:", error); // Can work without try and catch when we call the function in another try and catch block. But it is better to handle the error in the function itself.
//     }
// }

async function request(url) {

    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status}`);
    }
    return await res.json();

}

async function getUserRequest() {
    const getUsersReq = await request("https://jsonplaceholder.typicode.com/users");
    console.log(getUsersReq);
}

getUserRequest();

async function createUserRequest(url, userData) {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })
    if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status}`);
    }
    return await res.json();
}

async function createUser() {
    const userData = {
        name: "John Doe",
        email: "john.doe@example.com"
    };
    const newUser = await createUserRequest("https://jsonplaceholder.typicode.com/users", userData);
    console.log(newUser);
}
createUser();

async function request(url, options = {}) {

    const {
        method = "GET",
        headers = {},
        body
    } = options;

    const config = {
        method,
        headers: {
            "Content-Type": "application/json",
            ...headers
        }
    };

    if (body !== undefined) {
        config.body = JSON.stringify(body);
    }

    const res = await fetch(url, config);

    if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status}`);
    }

    if (res.status === 204) {
        return null;
    }

    return await res.json();
}

async function newUser() {
    const newUser = await request(
        "https://jsonplaceholder.typicode.com/users",
        {
            method: "POST",

            body: {
                name: "John Doe",
                email: "john.doe@example.com"
            }
        }
    );
    console.log(newUser);
}

newUser();

async function requestUser(url, options = {}) {
    const {
        method = "GET",
        headers = {},
        body,
        params = {}
    } = options;

    const config = {
        method,
        headers: {
            "Content-Type": "application/json",
            ...headers
        }
    };

    const queryparams = new URLSearchParams(params);
    const paramUrl = queryparams.toString() ? `${url}?${queryparams}` : url;

    if (body !== undefined) {
        config.body = JSON.stringify(body);
    }

    const res = await fetch(paramUrl, config);

    if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status}`);
    }

    if (res.status === 204) {
        return null;
    }

    return await res.json();
}

async function getUserRequest() {

    const getUsersReq = await requestUser("https://jsonplaceholder.typicode.com/users", {
        params: {
            _limit: 5
        }
    });
    console.log(getUsersReq);
}

getUserRequest();

// Authorisation vs Authentication 

function fakeLoginAPI(email, password) {
    return new Promise((resolve, reject) => {
        if (
            email === "admin@test.com" &&
            password === "123456"
        ) {
            resolve({
                accessToken: "demo-token-123",
                user: {
                    id: 1,
                    name: "Admin"
                }
            });
        } else {
            reject(new Error("Invalid credentials"));
        }
    });
}

async function login(email, password) {
    try {
        const response = await fakeLoginAPI(email, password);

        if(!response.accessToken) {
            throw new Error("Invalid credentials");
        }
        console.log("Login successful:", response);
        return response;
    }
    catch (error) { 
        console.error("Login error:", error);
        throw error;
    }
}

login("admin@test.com", "123456");

function fakeProfileAPI(token) {
    return new Promise((resolve, reject) => {

        if (token === "demo-token-123") {
            resolve({
                id: 1,
                name: "Admin",
                email: "admin@test.com"
            });
        } else {
            reject(new Error("Unauthorized"));
        }

    });
}

async function getProfile(token) {
    // call fakeProfileAPI(token)
    // return profile

    const profile = await fakeProfileAPI(token);
    return profile;
}

getProfile("demo-token-123").then(profile => {
    console.log("Profile:", profile);
}).catch(error => {
    console.error("Error:", error);
});


async function main() {

    try {

        const loginResult = await login(
            "admin@test.com",
            "123456"
        );

        const profile = await getProfile(
            loginResult.accessToken
        );

        console.log(profile);

    } catch (error) {

        console.error(error.message);

    }
}

main();