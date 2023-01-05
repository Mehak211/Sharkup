import React, { useRef, useState, useEffect } from "react";
import "./imageUpload.css";
import { Button } from "react-bootstrap";
import { MdModeEdit } from "react-icons/md";
const Imageupload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      props.setData((prev) => {
        return { ...prev, image: pickedFile };
      });
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div>
      <div className="form-controll center">
        <input
          id={props.id}
          ref={filePickerRef}
          style={{ display: "none" }}
          type="file"
          accept=".jpg,.png,.jpeg"
          onChange={pickedHandler}
        />
        <div className={`image-upload ${props.center && "center"}`}>
          <div className="image-upload__preview">
            {previewUrl && <img src={previewUrl} alt="Preview" />}
            {!previewUrl && (
              <div className="center">
                <Button
                  className="image-upload-button"
                  type="button"
                  onClick={pickImageHandler}
                >
                  +
                </Button>
              </div>
            )}
          </div>
          {previewUrl && (
            <div className="center">
              <Button
                className="image-upload-button"
                type="button"
                onClick={pickImageHandler}
              >
                <MdModeEdit className="icon" />
              </Button>
            </div>
          )}
        </div>
        {!isValid && <p>{props.errorText}</p>}
      </div>
    </div>
  );
};

export default Imageupload;
