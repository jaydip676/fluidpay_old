import React, { useState, useEffect, useRef } from "react";
import { create, CID } from "ipfs-http-client";
import UploadHeroImage from "./Upload";
import "../styles/register.scss";

function Register() {
  const [heroImg, setHeroImage] = useState(null);
  const [uploadImage, setUploadedImage] = useState("No Image Found");

  const client = create("https://ipfs.infura.io:5001/api/v0");

  const heroImage = useRef(null);
  const inputRef = useRef(null);
  function reset() {
    setHeroImage(null);
  }

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  async function UploadImage(e) {
    const file = e.target.files[0];
    console.log(file);
    setHeroImage(file);

    try {
      const added = await client.add(file);
      const url = `https://ipfs.io/ipfs/${added.path}`;
      setUploadedImage(url);
      console.log(url);
      console.log(uploadImage);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  return (
    <>
      <div className="register-bg">
        <h1 className="register-header">Register</h1>
        <form className="register-main">
          <input
            ref={inputRef}
            className="register-item-1"
            type="text"
            placeholder="Platform Name"
          />
          <input
            className="register-item-2"
            type="text"
            placeholder="Charges Per Second"
          />
          <input
            className="register-item-3"
            type="text"
            placeholder="Address"
          />
          <div className="register-featured-image">
            {heroImg ? (
              <>
                <img src={uploadImage} className="register-uploaded-image" />
                <button
                  className="reg-img-cancelbtn"
                  onClick={(e) => {
                    reset();
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <div
                onClick={(e) => {
                  heroImage.current.click();
                }}
              >
                <UploadHeroImage />
              </div>
            )}
            <input
              type="file"
              name="hero-image"
              className="register-input-featured-image"
              ref={heroImage}
              onChange={(e) => {
                UploadImage(e);
              }}
              hidden
            />
          </div>
          <button className="register-btn">Register</button>
        </form>
      </div>
    </>
  );
}

export default Register;
