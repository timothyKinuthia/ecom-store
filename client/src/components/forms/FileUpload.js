import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";
import { Spin } from "antd";

const FileUpload = ({loading, setLoading, values, setValue}) => {
  const { user } = useSelector((state) => ({ ...state }));

  const fileUploadAndResize = evt => {
      
    const files = evt.target.files;
    const allUploadedFiles = values.images;
    if (files) {
        setLoading(true);

        for (let i = 0; i < files.length; i++){
            Resizer.imageFileResizer(files[i], 720, 720, 'JPEG', 100, 0, uri => {
                axios.post('http://localhost:5000/api/uploadimages', { image: uri }, {
                    headers: {
                        authtoken: user ? user.token : ''
                    }
                }).then(res => {
                    setLoading(false);
                    allUploadedFiles.push(res.data)
                    setValue({ ...values, images: allUploadedFiles });
                }).catch(err => {
                    setLoading(files);
                    console.log(err);
                })
            }, 'base64')
        }
    }
    // resize
    // send back to server to upload to cloudinary
    // set url to images[] in the parent component - PRODUCTCREATE
  };
  return (
    <>
        <div className="row">
        <label className="btn btn-primary btn-raised">
          Choose File
          <input
            type="file"
            accept="images/*"
            multiple
            hidden
            onChange={fileUploadAndResize}
          />
        </label>
      </div>
      <br />
      {loading ? <Spin/> : ''}
    </>

  );
};

export default FileUpload;
