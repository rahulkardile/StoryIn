import React, { ChangeEvent, useState } from 'react'
import { storege } from "../firebase"
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const Upload = () => {
    const [uploading, SetUploading] = useState<boolean>(false);


    async function handleImg(e: ChangeEvent<HTMLInputElement>) {
        const img: File | undefined = e.target.files?.[0];

        if (img !== undefined) {
            SetUploading(true);
            if(img){
                const storegeRef = ref(storege, `poster/${Date.now() + "_" +img.name}`);
                await uploadBytes(storegeRef, img);
                const dowloadurl = await getDownloadURL(storegeRef);
                console.log(dowloadurl);
            }
        }
    }

    return (
        <div className='my-14 mx-auto p-8 flex flex-col items-center gap-6 bg-slate-100'>
            <h3>Upload Image in firebase</h3>
            <input type="file" accept='image/*' onChange={handleImg} />
            <button type='submit' className='p-3 rounded-md bg-slate-300'>Upload</button>
        </div>
    )
}

export default Upload;