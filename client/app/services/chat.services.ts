export async function getConversations(){
    const res = await fetch('http://localhost:3001/conversations',{
        credentials: "include",
    });

    if(!res.ok) throw new Error();

    return res.json();
}

export async function getUsers(query: string){
    const res = await fetch(`http://localhost:3001/users/search?query=${query}`,{
        credentials: "include",
    });

    if(!res.ok) throw new Error('Failed to fetch users');

    return res.json();
}

export async function createConversation(memberId: string, username: string){
    const res = await fetch('http://localhost:3001/conversations',{
        method: "POST",
        headers: { "Content-Type":"application/json" },
        credentials: "include",
        body: JSON.stringify({members: [memberId], title: username, is_group: false}),
    });

    if(!res.ok) throw new Error();

    return res.json();
}