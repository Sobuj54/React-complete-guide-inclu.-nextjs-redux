import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
  const res = await fetch(url, config);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "something went wrong!");
  }
  return data;
}

export default function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  function clearData() {
    setData(initialData);
  }

  const sendRequest = useCallback(
    async function (data) {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, { ...config, body: data });
        setData(resData);
      } catch (error) {
        setError(error.message || "Something went wrong!");
      }
      setIsLoading(false);
    },
    [url, config],
  );

  useEffect(() => {
    if (config && (config.method === "GET" || !config.method || !config))
      sendRequest();
  }, [sendRequest, config]);

  return { data, isLoading, error, sendRequest, clearData };
}
