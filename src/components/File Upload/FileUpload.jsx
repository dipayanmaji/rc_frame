import React, { useRef, useState } from 'react';
import './FileUpload.scss';

const FileUpload = ({ getFormData, setFormData, fileName }) => {
    const [importFileData, setImportFileData] = useState("");
    const [error, setError] = useState("");
    const inputRef = useRef();

    const uploadHandler = (event) => {
        setError("");

        //go back without choosing a file error handle
        if (!event.target.files.length) {
            setImportFileData("");
            setError("Choose a file");
            return;
        }

        const fileReader = new FileReader();
        fileReader.readAsText(event.target.files[0], "UTF-8");

        fileReader.onload = (e) => {
            try {
                setImportFileData(JSON.parse(e.target.result));

                // wrong json file upload error check
                try {
                    Object.keys(getFormData).map((key) => {
                        if (JSON.parse(e.target.result)[key] == undefined) {
                            throw new Error();
                        }
                    })
                }
                catch (err) {
                    event.target.value = null;
                    setError("Missing data in uploaded file");
                    setImportFileData("");
                }
            }
            catch (err) {
                // antoher file type upload error
                event.target.value = null;
                setError("Upload json file only");
                setImportFileData("");
            }
        }
    }

    // import upload file data into ui
    const importData = () => {
        //without choose file try to import error handle
        if (!importFileData) {
            setError("Choose a file first");
            return;
        }

        inputRef.current.value = null;
        setFormData(importFileData);
        setImportFileData("");
    }

    // download ui file data into local
    const downloadFile = (e) => {
        let data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(getFormData));
        e.target.setAttribute("href", "data:" + data);
        e.target.setAttribute("download", fileName + ".json");
    }

    return (
        <div className="file-upload">
            <div className='import'>
                <button onClick={importData} className='btn btn-primary'>Import</button>
                <div>
                    <input type='file' onChange={uploadHandler} ref={inputRef} />
                    <div style={{ color: 'red' }}>{error}</div>
                </div>
            </div>
            <a onClick={downloadFile} className='btn btn-primary' id="download-btn">Save</a>
        </div>
    );
}

export default FileUpload;