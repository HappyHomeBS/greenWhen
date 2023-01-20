import axios from "axios";
import { useEffect, useState, useContext } from "react";
import Select from "react-select";
import AuthContext from "../store/authContext";
import CreatableSelect from "react-select/creatable";

const DDD = (props) => {
    const { groupname, groupleader } = props.data;
    const [options, setOptions] = useState([]);
    const authCtx = useContext(AuthContext);
    const token = authCtx.token;
    const [fig, setFig] = useState(0);
  
    console.log('props. ' , props );
  
    useEffect( () => {

        const getTagList = async() => {
            let response = await axios.get(`/api/tag-list/${groupname}/${groupleader}`, {
                headers: {
                'Authorization': 'Bearer ' + token
                }
                });

            //불러온걸 바로 넣는게 아니라 생각해보니 tag를 value랑 label로 넣어야댐 !
            for (let i=0; i <= response.data.data.length; i++ ){
                let newOption = {value : response.data.data[i].tag, label : response.data.data[i].tag}
                console.log("불러온 taglist , " , newOption );

                setOptions(...options, newOption.filter(option => option.label !== '공지' ));

            }
            // setOptions(response.data.data.filter(option => option.tag !== '공지'));
            console.log("불러온 taglist , " , response.data.data.filter(option => option.tag !== '공지'));
        };
        getTagList();
    }, [fig]);
/*                                
    const options = [
        { value : "son", label : "Son"},
        { value : "dam", label : "Dam"},
        { value : "you", label : "You"},
    ];
*/
    //여러개 선택하면 selectedOption은 array,  하나면 object가 됨. 
  
    const handleChange = (selectedOption) => {
       console.log("handleChange", selectedOption);  
       if ( selectedOption.__isNew__ === true){
        const newOption = { no: Date.now(), groupnametag : groupname, tag : selectedOption.value};
        fetch('/api/addTag', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(newOption),
        });

       } else {
        console.log('deletemapping이 좋겟지? ');

       }
       setFig({fig} + 1);
        
    };
    return( 
    
    <CreatableSelect options={options} onChange={handleChange} />
    );
};

export default DDD;
