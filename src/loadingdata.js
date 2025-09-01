import react,{useState,useEffect} from 'react';
export default function Loadingdata(){
    const [isLoading,setIsLoading] = useState(true);
    const [isError,setIsError] = useState(false);
    const [data,setData] = useState([]);

    useEffect(()=>{
        async function fetchData(){
            try{
                setIsLoading(true);
                setIsError(false);
                const response = await fetch('https://mocki.io/v1/0818e961-3960-4976-859e-2955c3c2a417'); 
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                  }
                const result = await response.json();
                setData(result);
            }catch(error){
                setIsError(true);
            }           
            finally{
                setIsLoading(false);
            }
        };
        fetchData();
    },[]);
    return (
        <>
          {isLoading && <p>Loading Data........</p>}
          {isError && !isLoading && (
            <p style={{ color: 'red' }}>Something went wrong, please try again later.</p>
          )}
          {!isError && !isLoading && (
            <ul>
              {data.map((res) => (
                <li key={res.id}>{res.name}</li>
              ))}
            </ul>
          )}
        </>
      );
}