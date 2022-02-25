interface IPet {
  name: string;
  animal: string;
  breed: string;
}

export default function Pet({ name, animal, breed }: IPet) {
  return (
    <div>
      <h2>{name}</h2>
      <h3>{animal}</h3>
      <h3>{breed}</h3>
    </div>
  );
}
