import { useState, useEffect } from "react";

/*
function isCompatible(item) { // not sure if this does anything (error from browser)
  // https://web.dev/migrate-to-ua-ch/
  // In real life you most likely have more complex rules here
  return ['Chromium', 'Google Chrome', 'NewBrowser'].includes(item.brand);
}
if (navigator.userAgentData.brands.some(isCompatible)) {
  // browser reports as compatible
}
*/

const useFetch = (url) => {

  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null); // we store the error in a state; to output to the browser

  useEffect(() => { // url will be the endpoint
    const abortCont = new AbortController();

    setTimeout(() => {
      fetch(url, { signal: abortCont.signal })
        .then(res => {

          //console.log(res); // response object

          // this allows us to get back a "response" from the object
          // if the data does not exist, the response is not okay
          // ex. fetch('http://localhost:8000/blah blah blah')
          if (!res.ok) { // if response is NOT ok
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

          // when we fetch for errors, we need to clean up by updating the state; only if we get an "AbortError" error
          if (err.name === "AbortError") {
            console.log("fetch aborted") // now we don't get the error message because fetch was aborted
          } else {
            setIsPending(false);
            setError(err.message);
          }
          // this sets our own custom error message but we need to get rid of the loading... message once it's loaded with  setError(null), above
        })
    }, 1000) // setTimeout is just a simulation so we simulate a longer timeframe to fetch data

    // the router can miss the fetch command so we can stop it here
    //return () => console.log('cleanup')
    return () => abortCont.abort();
  }, []);

  return { data, isPending, error } // this return allows us to use this object in the return component in the home.js file

}

export default useFetch;
//npm install react-router-dom@5


