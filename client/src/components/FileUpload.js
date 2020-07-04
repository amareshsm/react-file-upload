import React,{Fragment,useState}from 'react'
import axios from 'axios'

const FileUpload = () => {

    const [file,setFile] = useState('');
     const [filename,setFilename] = useState('Choose File')
     const [uploadFile,setUploadedFile] = useState({})

    const onChange =(e) =>{
        setFile(e.target.files[0])
        setFilename(e.target.files[0].name)
    }

    const onSubmit = async    (e) =>{
        e.preventDefault();
        const formData=new FormData();
        formData.append('file',file) //backend - req.files.file

      try{
          const res = await axios.post('http://localhost:5000/upload',formData,{
              headers:{
                  'Content-Type':'multipart/form-data'
              }
          });
          const {fileName,filePath} = res.data;
          setUploadedFile({fileName, filePath});
      }catch(err){
             if(err.response.status ===500){
                 console.log('Problem with server')
             }else{
                 console.log(err.response.data.msg)
             }
      }
    };

    return (
        <Fragment>
            <form onSubmit={onSubmit}>
                <div className="custom-file">
                      <input type="file" className="cutom-file-input" id="customFile" onChange={onChange}/>
                      <label className="custom-file-label" htmlFor="customFile">{filename}</label>
                      
                </div>
                <input type="submit" value="Upload" className="btn btn-primary btn-block mt-4"/>
            </form>
        </Fragment>
    )
}

export default FileUpload