import React, {useContext, useState}  from "react";
import Announcement from "../components/ServiceCenter/Announcement";
import FAQ from "../components/ServiceCenter/FAQ";
import AuthContext from "../store/authContext";
import InquiryList from "../components/Inquiry/InquiryListComponent";


const ServiceCenter =() => {
    const [which, setWhich] = useState(0);


    return(


        <>
        고객센터 페이지
        <button onClick={() => setWhich(0)}>공지사항</button>
        <button onClick={() => setWhich(1)}>FAQ</button>
        <button onClick={() => setWhich(2)}>1:1문의</button>
        

        <div>
        {which === 0 && <Announcement /> }
        </div>
        <div>
        {which === 1 && <FAQ /> }
        </div>
        <div>
        {which === 2 && <InquiryList />}
        </div>

        </>
    )
}

export default ServiceCenter;