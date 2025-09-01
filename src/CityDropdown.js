import react,{useState,useEffect} from 'react';
import Select from 'react-select';
import citydata from './data/city.json';

export default function CityDropdown({selecteCity,handleCityChangeParent}){
    const [options,setOption] = useState([]);
    useEffect(()=>{
        const formatedOption = citydata.map(city=> ({
            value : {lat:city.lat,lng:city.lng},
            label:`${city.state}, ${city.city}`
        }));
        setOption(formatedOption);    
    },[])
    function handleCityChange(selectedOption){
        handleCityChangeParent(selectedOption);
    }
    return (
        <>
        <Select
        options={options}
        value={selecteCity}
        onChange={handleCityChange}
        isClearable
        placeholder="Type to search for a city..."
        />
        </>
    );
}