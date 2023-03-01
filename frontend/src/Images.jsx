import React, { useState, useEffect } from 'react'

const Images = () => {
  const [ imageURL, setImageURL ] = useState([]);

  const getImages = async() => {
    const images = await fetch('/images');
    // console.log(images);
    const data = await images.json();
    data.map(url => {
      console.log(url.url);
    })
    setImageURL(data)
  }
  console.log(imageURL);
  useEffect(() => {
    getImages();
  },[])
  return (
    <div>
      { imageURL &&
     imageURL.map(image => {
      const { url } = image;

      return <img src={url} alt="" />
     })
      }
    </div>
  )
}

export default Images