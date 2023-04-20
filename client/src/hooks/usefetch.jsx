import { useState, useEffect } from "react";

const useFetch = (url, method = "GET") => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(method);

  useEffect(() => {
    const fetchData = async () => {
      const abortCont = new AbortController();
      setIsLoading(true);

      try {
        const response = await fetch(url, { method: method });
        if (!response.ok) {
          throw Error("could not fetch the data for that resource");
        }
        const data = await response.json();
        if (data.length === 0) {
          setData(null);
          throw Error("no customers available");
        }
        setData(data);
        setIsLoading(false);
        setError(null);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Fetch Aborted");
        }
        setIsLoading(false);
        setError(err.message);
        setData(null);
      }
      return () => abortCont.abort();
    };
    fetchData();
  }, [url, method]);
  return { data, isLoading, error };
};

export default useFetch;
