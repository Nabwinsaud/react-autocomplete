import useAutoComplete from "../hooks/useAutocomplete";
import { ICountry } from "../types/Types";
import { useRef } from "react";
interface IProps {
  data: ICountry[];
}
export default function AutoCompleteSearch({ data }: IProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const {
    search,
    handleChange,
    suggestions,
    selectSuggestion,
    activeSelect,
    keyDown,
    handleClick,
  } = useAutoComplete(data);
  // console.log(search);

  return (
    <div className="searchContainer">
      <h1>Search all the country Name</h1>
      <input
        ref={inputRef}
        type="text"
        placeholder="Nepal"
        value={search}
        onChange={handleChange}
        onKeyDown={keyDown}
        // tabIndex={0}
        // tabIndex={0}
        // onKeyDown={keyDown}
      />

      {!suggestions.length && search.length && !selectSuggestion.length ? (
        <div className="notFound">
          <p>No thing to search 😒😒</p>
        </div>
      ) : (
        suggestions.map((countryName: ICountry, index: number) => (
          <div className="cardContainer" key={index}>
            <div
              onClick={() => handleClick(countryName.name.common)}
              // className="card"
              className={`card ${index === activeSelect - 1 ? "active" : ""}`}
            >
              <p>{countryName.name.common}</p>
              <img src={countryName.flags.png} alt={countryName.name.common} />
            </div>
          </div>
        ))
      )}
    </div>
  );
}
