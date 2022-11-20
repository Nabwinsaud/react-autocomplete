import { useState } from "react";
import { ICountry } from "../types/Types";
import { ArrowKeys } from "../utils/index";
export default function useAutoComplete(data: ICountry[]) {
  const [suggestions, setSuggestions] = useState<ICountry[]>([]);
  const [search, setSearch] = useState<string>("");
  const [selectSuggestion, setSelectSuggestion] = useState("");
  const [activeSelect, setActiveSelect] = useState<number>(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value;
    // we need to filter countryName from data
    // and set the data to suggestion array
    // and we wil fetch suggestion and render into tsx
    if (searchText !== "") {
      const response = data.filter((result) =>
        result.name.common
          .toString()
          .toLowerCase()
          .startsWith(searchText.toString().toLowerCase())
      );

      //   setSuggestions(response as React.SetStateAction<ICountry[]>);
      setSuggestions(response); // don't need to give above type
      setSearch(searchText);
    } else {
      setSuggestions([]);
      setSearch("");
      setActiveSelect(0);
      setSelectSuggestion("");
    }
  };
  const keyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case ArrowKeys.ARROWDOWN:
        if (activeSelect < suggestions.length) {
          setActiveSelect(activeSelect + 1);
          // console.log(event.key);
        }
        break;
      case ArrowKeys.ARROWUP:
        if (activeSelect > 1) {
          setActiveSelect(activeSelect - 1);
          // console.log(event.key);
        }
        break;

      case ArrowKeys.ENTER:
        setSearch(suggestions[activeSelect - 1].name.common);
        setSelectSuggestion(suggestions[activeSelect - 1].name.common);
        setSuggestions([]);
        setActiveSelect(0);
        break;

      // default:
      //   setSearch("");
      //   setSelectSuggestion("");
      //   setSuggestions([]);
      //   setActiveSelect(0);
    }
  };
  const handleClick = (text: string) => {
    setSearch(text);
    setSelectSuggestion(text);
    setSuggestions([]);
    setActiveSelect(0);
  };

  return {
    suggestions,
    search,
    selectSuggestion,
    activeSelect,
    handleChange,
    keyDown,
    handleClick,
  };
}
