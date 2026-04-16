export async function getMessages(conversationID: string | undefined){
    const res = await fetch(`http://localhost:3001/messages/${conversationID}`,{
        credentials: "include",
    });

    if(!res.ok) throw new Error();

    return res.json();
}

export async function sendMessages(conversationID: string | undefined, content: string){
    const res = await fetch(`http://localhost:3001/messages/`,{
        method: "POST",
        headers: { "Content-Type":"application/json" },
        credentials: "include",
        body: JSON.stringify({conversationId: conversationID, content: content}),
    });

    if(!res.ok) throw new Error();

    return res.json();
}