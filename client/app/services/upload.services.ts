export type UploadPromise<T> = Promise<T> & { abort: () => void };

type UploadResponse = {
    url: string;
};

export function uploadImage(file: File, onProgress: (progress: number) => void): UploadPromise<UploadResponse> {

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    const promise = new Promise((resolve, reject) => {
    xhr.open('POST', `${process.env.NEXT_PUBLIC_API_URL}/upload`, true);
    xhr.withCredentials = true;

    xhr.upload.onprogress = (event) => {
        const progress = (Math.round((event.loaded / event.total) * 100));
        onProgress(progress);
    }

    xhr.onload = () =>{
        if(xhr.status >= 200 && xhr.status < 300) resolve(xhr.response);
        else reject(xhr.response);
    }
    xhr.onerror = () =>{
        reject(xhr.response);
    }
    const myData = new FormData();
    myData.append('image', file);
    
    xhr.send(myData);

    }) as UploadPromise<UploadResponse>;

    promise.abort = () => xhr.abort();

    return promise;
};