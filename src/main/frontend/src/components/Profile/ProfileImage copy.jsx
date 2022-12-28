import axios from 'axios'
import React, { useRef, useState, useContext, useCallback } from 'react'
import '../../ProfileImagecss.css'
import AuthContext from '../../store/authContext';

const ProfileImage = () => {

  const [Image, setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
  const fileInput = useRef(null)
  const [file, setFile] = useState('');
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

const handleClick = useCallback(async () => {
  if (!file) return;

  const formData = new FormData();
  formData.append('file', file);

  const res = await axios.post(
    '/member/profileImg',
      formData,
      {
          headers: {
            'Authorization': 'Bearer ' + token,
              'Content-Type': 'multipart/form-data'
          }
      }
  );
  if (res.status === 201) console.log(res.data);
}, [file]);

const handleChange = useCallback((e) => {
  if (e.target.files === null) return;

  if (e.target.files[0]) {
      setFile(e.target.files[0]);
  }
}, []);

 
    return (
        < div >
            <h1>파일 업로드</h1>
            <form onSubmit={handleClick}>
                <h1>File Upload</h1>
                <input type="file" onChange={handleChange} name="file" />
                <button type="submit">Upload</button>
            </form>
        </div>
    )


}

export { ProfileImage }