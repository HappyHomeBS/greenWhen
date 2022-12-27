import axios from 'axios'
import React, { useRef, useState, useContext } from 'react'
import '../../ProfileImagecss.css'
import AuthContext from '../../store/authContext';

const ProfileImage = () => {

  const [Image, setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
  const fileInput = useRef(null)
  const [file, setFile] = useState();
  const authCtx = useContext(AuthContext);

  const data = {
    'Image': Image,
    'file': file
  }
  const token = authCtx.token;

  const onChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0])
    } else { //업로드 취소할 시
      setImage("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
      return
    }
    //화면에 프로필 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        axios.post('member/profileImg', data, token)
        setImage(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files[0])
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios({
      method: "post",
      url: 'member/profileImg',
      data: data,
      headers: {token}
    });    
  };


  return (
    <div>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <img src={Image} className="image" alt="" onClick={() => { fileInput.current.click() }} />
        <input
          type='file'
          style={{ display: 'none' }}
          accept='image/jpg,impge/png,image/jpeg'
          name='profile_img'
          onChange={onChange}
          ref={fileInput} />        
        <button type='submit'>수정</button>
      </form>
    </div>
  )
}

export { ProfileImage }