export interface IPet {
  id: string;
  name: string;
  animal: string;
  breed: string;
  images: any;
  city: string;
  state: string;
}

export default function Pet({
  id,
  name,
  animal,
  breed,
  images,
  city,
  state,
}: IPet) {
  let hero = "http://pets-images.dev-apis.com/pets/none.jpg";
  if (images.length) {
    const [image] = images;
    hero = image;
  }

  return (
    <a href={`/details/${id}`} className="pet">
      <div className="image-container">
        <img src={hero} alt={name} />
      </div>
      <div className="info">
        <h1>{name}</h1>
        <h2>
          {animal} - {breed} - {city} - {state}
        </h2>
      </div>
    </a>
  );
}
