import { useEffect, useState } from "react";
import { ICountry } from "../types/Types";
const url = "https://restcountries.com/v3.1/all";
import axios from "axios";
import AutoCompleteSearch from "./AutoCompleteSearch";
export default function AutoCompleteWrapper() {
  const [data, setData] = useState<ICountry[]>([]);

  useEffect(() => {
    const abortController = new AbortController();
    const handleData: () => Promise<void> = async () => {
      const res = await axios.get(url, { signal: abortController.signal });
      setData(res.data);
    };
    handleData();

    return () => {
      abortController.abort();
    };
  }, []);
  return (
    <div>
      <AutoCompleteSearch data={data} />
    </div>
  );
}
