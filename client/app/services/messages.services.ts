export async function getMessages(
  conversationId: string | number | undefined,
  cursor?: string
) {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/messages/${conversationId}`;

  if (cursor) {
    url += `?cursor=${encodeURIComponent(cursor)}`;
  }

  const res = await fetch(url, {
    credentials: "include",
  });

  if (!res.ok) throw new Error();

  return res.json();
}

export async function sendMessages( {
  conversationId,
  content,
  type = "text",
  attachments,
  replyTo,
  }: {
    conversationId: string | undefined,
    content: string,
    type: "text" | "sticker" | "image",
    attachments?: {file_url: string, file_type: string}[],
    replyTo?: string
  }){
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages/`, {
        method: "POST",
        headers: { "Content-Type":"application/json" },
        credentials: "include",
        body: JSON.stringify({ conversationId, content, type, attachments, replyTo }),
    });

    if(!res.ok) throw new Error();

    return res.json();
};