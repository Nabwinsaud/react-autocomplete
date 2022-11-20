import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { ICountry } from "../types/Types";

export default function AutoComplete() {
  const url = "https://restcountries.com/v3.1/all";
  const inputSearchRef = useRef<HTMLInputElement | null>(null);
  const [suggestions, setSuggestions] = useState<ICountry[]>([]);
  const [selectSuggestion, setSelectSuggestion] = useState<string>("");
  const [activeSuggestion, setActiveSuggestion] = useState<number>(0);
  const [search, selectSearch] = useState<string>("");

  const [searchResult, setSearchResult] = useState<string[]>([]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value;
    const data = suggestions
      .filter((countryName) =>
        countryName.name.common
          .toLowerCase()
          .startsWith(searchText.toLowerCase())
      )
      .map((cname) => cname.name.common.toUpperCase());
    setSearchResult(data);
  };
  // handle key

  // focus on input search
  useEffect(() => {
    if (inputSearchRef.current) {
      inputSearchRef.current.focus();
    }
  }, []);

  useEffect(() => {
    // let isCanceled: boolean = false;
    const abortController = new AbortController();
    const handleData: () => Promise<void> = async () => {
      const res = await axios.get(url, { signal: abortController.signal });
      setSuggestions(res.data);
    };
    handleData();

    // hooks cleanup
    return () => {
      abortController.abort();
      //   isCanceled = true; // this also work
    };
  }, []);

  return (
    <>
      <input
        type="text"
        placeholder="Nepal"
        ref={inputSearchRef}
        onChange={handleChange}
      />

      <div>
        {searchResult?.map((result, index) => (
          <p key={index}>{result}</p>
        ))}
      </div>
    </>
  );
}
