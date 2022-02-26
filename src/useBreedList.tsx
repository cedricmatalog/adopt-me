import { useState, useEffect } from "react";

const localCache: Record<string, any> = {};

export default function useBreedList(animal: string) {
  const [breedList, setBreedList] = useState<string[]>([]);
  const [status, setStatus] = useState("unloaded");

  useEffect(() => {
    async function requestBreedList() {
      setBreedList([]);
      setStatus("Loading");
      const res = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );

      const json = await res.json();

      localCache[animal] = json.breeds || [];
      setBreedList(localCache[animal]);
      setStatus("loaded");
    }

    if (!animal) {
      setBreedList([]);
    } else if (localCache[animal]) {
      setBreedList(localCache[animal]);
    } else {
      requestBreedList();
    }
  }, [animal]);

  return [breedList, status];
}
