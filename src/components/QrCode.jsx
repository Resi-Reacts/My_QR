import React from 'react'
import { useState } from 'react'

const QrCode = () => {

const [Img, setImg] = useState('')
const [Loading, setLoading] = useState(false);
const [qrData, setqrData] = useState("");
const [QrSize, setQrSize] = useState('')

const generateQr = async()=>{
  setLoading(true);
  try {
    const url= `https://api.qrserver.com/v1/create-qr-code/?size=${QrSize}x${QrSize}&data=${encodeURIComponent(qrData)}`;
      setImg(url);
  }
  catch(error){
    console.error('Error in Generating QR',error);
  }
  finally{
    setLoading(false);
  }}

  const downloadQr = ()=>{
    fetch(Img).then((response)=> response.blob())
    .then((blob)=>{
      const link = document.createElement("a");
      link.href= URL.createObjectURL(blob);
      link.download ="qrcode.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch((error)=>{
      console.error("Error in Downloading QR code",error)
    });
  }



  return (


    <div className='app-container'>

        <h1>QR Code Generator</h1>
        {Loading && <p>Please Wait..........</p>}

        {Img && <img src= {Img} className='.qr-code-image' alt='image error' />}

        <div>
            <label htmlFor='dataInput' className='input-lable'> 
                Data for QR

            </label>
           <input type='text' id='dataInput' placeholder='Enter Data for QR' value={qrData} onChange={(e)=>setqrData(e.target.value)}/>
           <label htmlFor='sizeInput' className='input-lable' > 
            Image size (eg:,150)

            </label>
        <input type='text' id='sizeInput' placeholder='Enter image size' value={QrSize} onChange={(e)=>setQrSize(e.target.value)}/><br></br>
            <button className='GB' disabled={Loading} onClick={generateQr}> Generate QR</button>
            <button className='DB'onClick={downloadQr} >Download QR</button>
        </div>
        <p className='footer'> Designed by Resivanth</p>
    </div>
  )
}

export default QrCode