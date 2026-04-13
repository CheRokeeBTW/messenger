export async function registerUser(email: string, username: string, password: string){
    const res = await fetch('http://localhost:3001/auth/register',{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password })
    })

    const data = await res.json();

    if(!res.ok){
        throw new Error(data.message || 'Failed to register user')
    }

    return data
};

export async function loginUser(email: string, password: string){
    const res = await fetch('http://localhost:3001/auth/login',{
        method: "POST",
        headers: { "Content-Type":"application/json"},
        credentials: "include",
        body: JSON.stringify( {email, password} ),
    })

    const data = await res.json();

    if(!res.ok){
        throw new Error(data.message || "Failed to login")
    }

    return data
}

export async function checkAuth(){
      const res = await fetch("http://localhost:3001/auth/me", {
        credentials: "include",
      });

      if (!res.ok) throw new Error();

      const user = await res.json();
      console.log("User:", user);
      return user;
}