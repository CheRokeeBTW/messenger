export async function uploadImage(file: File){
    const formData = new FormData();

    formData.append("image", file);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`,{
        method: "POST",
        credentials: "include",
        body: formData,
    });

    if(!res.ok) throw new Error();

    return res.json();
};