import Select from "react-select";
import CreatableSelect from "react-select/creatable";

const DDD = () => {
    const options = [
        { value : "son", label : "Son"},
        { value : "dam", label : "Dam"},
        { value : "you", label : "You"},
    ];


    //여러개 선택하면 selectedOption은 array,  하나면 object가 됨. 
    const handleChange = (selectedOption) => {
       console.log("handleChange", selectedOption);  
    };
    return( 
    
    <CreatableSelect options={options} onChange={handleChange} />
    );
};

export default DDD;
