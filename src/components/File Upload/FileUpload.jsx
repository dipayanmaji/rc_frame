import React, { useRef, useState } from 'react';
import './FileUpload.scss';

const FileUpload = ({ getFormData, setFormData }) => {
    const [importFileData, setImportFileData] = useState("");
    const [error, setError] = useState("");
    const inputRef = useRef();

    const importData = () => {
        if (!importFileData) {
            setError("Choose a file first");
            return;
        }
        inputRef.current.value = null;
        setFormData(importFileData);
        setImportFileData("");
    }

    const uploadHandler = (event) => {
        setError("");
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
                try {
                    Object.keys(JSON.parse(e.target.result)).map((key) => {
                        if (getFormData[key] == undefined) {
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
                event.target.value = null;
                setError("Upload json file only");
                setImportFileData("");
            }
        }
    }

    const downloadFile = (e) => {
        let data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(getFormData));
        e.target.setAttribute("href", "data:" + data);
        e.target.setAttribute("download", "data.json");
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
            <a onClick={downloadFile} className='btn btn-primary' id="download-btn">Download</a>
        </div>
    );
}

export default FileUpload;