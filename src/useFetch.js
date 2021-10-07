import { useState, useEffect } from "react";

function isCompatible(item) { // not sure if this does anything (error from browser)
  // https://web.dev/migrate-to-ua-ch/
  // In real life you most likely have more complex rules here
  return ['Chromium', 'Google Chrome', 'NewBrowser'].includes(item.brand);
}
if (navigator.userAgentData.brands.some(isCompatible)) {
  // browser reports as compatible
}

const useFetch = (url) => {

  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null); // we store the error in a state; to output to the browser

  useEffect(() => { // url will be the endpoint
    setTimeout(()=> {
      fetch(url)
      .then(res => {
        
        //console.log(res); // response object
  
        // this allows us to get back a "response" from the object
        // if the data does not exist, the response is not okay
        // ex. fetch('http://localhost:8000/blah blah blah')
        if(!res.ok) { // if response is NOT ok
          throw Error("could not fetch the data for that resource")
        }
        return res.json();
      })
      .then(data => {
        //console.log(data);
        setData(data);
        setIsPending(false); 
        setError(null); // here, we remove the loading message
      })
      .catch(err => { // this catch block catches network errors, it fires a function
        //console.log(err.message) this can catch some network errors but not all
        setIsPending(false);
        setError(err.message); // this sets our own custom error message but we need to get rid of the loading... message once it's loaded with  setError(null), above
      })
    }, 1000) // setTimeout is just a simulation so we simulate a longer timeframe to fetch data
   
  }, []);

  return {data, isPending, error} // this return allows us to use this object in the return component in the home.js file

}

export default useFetch;


