import React, { useState } from 'react'

const Upload = () => {
  const [fileInputState, setFileInputState] = useState('');
  const [selectedFile, setSelectedFile] = useState('');
  const [previewSource, setPreviewSource] = useState('');
  const [ finalImage, setFinalImage ] = useState(null);
  const handleSubmitFile = (e) => {
    console.log('hi');
    e.preventDefault();
    uploadImage(previewSource)
  }

  const handleFileInputChange = (e) => {
    e.preventDefault;
    const file = e.target.files[0];
    // console.log(file);
    previewFile(file);
  }

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setPreviewSource(reader.result);
    }
  }
 async function uploadImage (base64EncodedURL){
  console.log(base64EncodedURL);
  try {
    await fetch('/api/upload', {
      method: 'POST',
      body: JSON.stringify({ data: base64EncodedURL}),
      headers: {'Content-Type': 'application/json'}
    }).then(res => {
      const { url } = (res);
      setFinalImage(url);
    })
  } catch (error) {
    console.error(error);
  }
 }
  return (
    <>
      <h2>Upload</h2>

      <form onSubmit={handleSubmitFile}>
        <input type="file" name="image" id="image" onChange={handleFileInputChange} value={fileInputState} />
        <button type='submit'>Upload</button>
      </form>

      {/* {previewSource && <div>
        <img src={previewSource} alt="image" />
      </div>} */}

      {finalImage && 
      <section>
        <img src={finalImage} alt={finalImage} />
      </section>
      }
    </>
  )
}

export default Upload