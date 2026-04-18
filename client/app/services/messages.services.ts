export async function getMessages(conversationId: string | number | undefined){
    const res = await fetch(`http://localhost:3001/messages/${conversationId}`,{
        credentials: "include",
    });

    if(!res.ok) throw new Error();

    return res.json();
}

export async function sendMessages(conversationId: string | undefined, content: string){
    const res = await fetch(`http://localhost:3001/messages/`,{
        method: "POST",
        headers: { "Content-Type":"application/json" },
        credentials: "include",
        body: JSON.stringify({conversationId: conversationId, content: content}),
    });

    if(!res.ok) throw new Error();

    return res.json();
}