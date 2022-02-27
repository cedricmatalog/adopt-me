import { useState, useEffect } from "react";
import Results from "./Results";

import useBreedList from "./useBreedList";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

export default function Search() {
  const [currentLocation, setCurrentLocation] = useState<string>("");
  const [currentAnimal, setCurrentAnimal] = useState<string>("");
  const [currentBreed, setCurrentBreed] = useState<string>("");
  const [pets, setPets] = useState([]);
  const [breeds] = useBreedList(currentAnimal);

  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${currentAnimal}&location=${currentLocation}$breed=${currentBreed}`
    );

    const json = await res.json();

    setPets(json.pets);
  }

  useEffect(() => {
    requestPets();
  }, [currentLocation, currentAnimal, currentBreed]);

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            type="text"
            id="location"
            placeholder="location"
            value={currentLocation}
            onChange={(e) => setCurrentLocation(e.target.value)}
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={currentAnimal}
            onChange={(e) => setCurrentAnimal(e.target.value)}
            onBlur={(e) => setCurrentAnimal(e.target.value)}
          >
            <option value=""> </option>
            {ANIMALS.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            value={currentBreed}
            onChange={(e) => setCurrentBreed(e.target.value)}
            onBlur={(e) => setCurrentBreed(e.target.value)}
          >
            <option value=""> </option>
            {Array.isArray(breeds) &&
              breeds.map((value: string) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
          </select>
        </label>
        <button
          type="button"
          onClick={() => {
            requestPets();
          }}
        >
          Submit
        </button>
      </form>

      <Results pets={pets} />
    </div>
  );
}
