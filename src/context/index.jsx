import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);

  async function handleSubmit() {
    event.preventDefault();
    try {
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
      );

      const data = await res.json();
      if (data?.data?.recipes) {
        setRecipeList(data);
        setLoading(false);
        setSearchParam("");
      }

      console.log(data);

      //   setSearchParam(data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <GlobalContext.Provider
      value={{ searchParam, setSearchParam, handleSubmit }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
