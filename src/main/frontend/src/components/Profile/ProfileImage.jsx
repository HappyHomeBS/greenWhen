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


  const handleSubmit = useCallback(async () => {
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
    //화면에 프로필 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files[0])
  }, []);

  const callProfile = (e) => {
    e.preventDefault();    
    axios.get('/member/callProfile', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then((res) => {
        const data = res.data;         
        setImage(data.profileData)
        console.log("이미지", data.profileData)

      });

  }


  return (
    < div >
      <img src={Image} className="image" alt="" onClick={() => { fileInput.current.click() }} />
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleChange} ref={fileInput} name="file" />
        <button type="submit">Upload</button>
        <button onClick={callProfile}>확인</button>
      </form>
    </div>
  )


}

export { ProfileImage }