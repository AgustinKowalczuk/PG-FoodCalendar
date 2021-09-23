import React, {useState} from "react";



export default function UploadImage ({onChange}) {
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState('')

    async function uploadImage (e){
        const files = e.target.files
        const data = new FormData();
        data.append('file', files[0])
        data.append('upload_preset', 'foodCalendar')
        setLoading(true)
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/jojordan/image/upload',
            {
                method: 'POST',
                body: data
            }
        )
        const file = await res.json()
        setImage(file.secure_url)
        onChange(file.secure_url)
        setLoading(false)
    }

    return (
        <div>
            <input
            type="file"
            name="file"
            placeholder='Sube tu imagen acá'
            onChange={uploadImage}
             />
             {loading ? (
                 <h3>Cargando...</h3>
             ): (
                 <img src={image} style={{width: '300px'}}/>
             )}
        </div>
    );
}