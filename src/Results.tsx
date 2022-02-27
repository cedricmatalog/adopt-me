import Pet, { IPet } from "./Pet";

export default function Results({ pets }: { pets: IPet[] }) {
  return (
    <div className="search">
      {!pets.length ? (
        <h2>No Pets Found</h2>
      ) : (
        pets.map(({ id, name, animal, breed, images, city, state }) => (
          <Pet
            key={id}
            id={id}
            name={name}
            animal={animal}
            breed={breed}
            images={images}
            city={city}
            state={state}
          />
        ))
      )}
    </div>
  );
}
