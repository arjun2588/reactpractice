import react,{useState,useEffect} from 'react';
import CityDropdown from './CityDropdown';

export default function Weather() {
    
    const [isLoading,setIsLoading] = useState(true);
    const [error,setIsError] = useState(false);
    const [data,setData] = useState([]);
    const [selecteCity,setSelectedCity] = useState({value:{lat:40.7128,lng:-74.0060},label:'NY, New York'});

    useEffect(()=>{
        async function fetchDta(){
            try{
                setIsLoading(true);
                let lat = selecteCity.value.lat || 52.52;
                let lng = selecteCity.value.lng || 13.41;
                const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude='+`${lat}`+'&longitude='+`${lng}`+'&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m');
                if(!response.ok){
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
            }catch(error){
                setIsError(true);
            }finally{
                setIsLoading(false);
            }
        }
        fetchDta();
    },[selecteCity]);

    function handleCityChangeParent(selectedOption){
        setSelectedCity(selectedOption)
    }
    

    function Card({data}){
        return (
            <div className="panel">
                <div className="panel-heading">
                    <h2>Today's Temprature -  {data.current.temperature_2m}{data.current_units.temperature_2m}</h2>
                </div>
                <div className="panel-body">
                    <h3>Wind Speed - {data.current.wind_speed_10m}{data.current_units.wind_speed_10m}</h3>
                </div>
                <div className="panel-footer">
                    <h4>Hourly Wather</h4>
                    <table border="1" cellPadding="10" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Time</th>
                                <th>Temperature ({data.hourly_units.temperature_2m})</th>
                                <th>Humidity ({data.hourly_units.relative_humidity_2m})</th>
                                <th>Wind Speed ({data.hourly_units.wind_speed_10m})</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.hourly.time.slice(0,24).map((time,index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{time}</td>
                                    <td>{data.hourly.temperature_2m[index]}</td>
                                    <td>{data.hourly.relative_humidity_2m[index]}</td>
                                    <td>{data.hourly.wind_speed_10m[index]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
    return (
        <>
            <h1>Weather Report</h1>
            <CityDropdown selecteCity={selecteCity} handleCityChangeParent={handleCityChangeParent} />
            {isLoading && <p>Loading Data.......</p>}  
            {!isLoading && error && <p style={{color:'red'}}>Something went wrong, please try again later.</p>}
            {!isLoading && !error && <Card data={data} />}
            
        </>
      );
}

