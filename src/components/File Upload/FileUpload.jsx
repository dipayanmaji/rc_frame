import { useState } from 'react';

const FileUpload = () => {
    const [fileData, setFileData] = useState("");
    const [error, setError] = useState(false);

    const inputHandler = (e) => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");

        fileReader.onload = (e) => {
            try {
                setError(false);
                console.log("e.target.result", JSON.parse(e.target.result));
                setFileData(JSON.parse(e.target.result));
            }
            catch (err) {
                setError(true);
                setFileData("");
            }
        }
    }
    const downloadFile = (e) => {
        if (!fileData) {
            e.target.removeAttribute("href");
            e.target.removeAttribute("download");
            return;
        };
        let data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(fileData));
        e.target.setAttribute("href", "data:" + data);
        e.target.setAttribute("download", "data.json");
    }

    return (
        <div className="FileUpload">
            <input type='file' onChange={inputHandler} />
            {error && <div style={{ color: 'red' }}>Upload json file only</div>}
            <br />
            <a onClick={downloadFile} className='btn btn-primary'>Download</a>
        </div>
    );
}

export default FileUpload;