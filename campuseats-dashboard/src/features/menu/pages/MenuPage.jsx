import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useFetch } from "../hooks/useFetch";
import MenuList from "../components/MenuList";

function MenuPage() {
  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, 400);

  const { data: dishes, isLoading, error } = useFetch("/menu.json");

  // 1. Loading state
  if (isLoading) return <p>Loading menu...</p>;

  // 2. Error state
  if (error) return <p>Could not load menu: {error}</p>;

  // 3. Success state
  const filtered = dishes.filter((d) =>
    d.name.toLowerCase().includes(debounced.toLowerCase()),
  );

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search dishes..."
      />
      <MenuList dishes={filtered} />
    </div>
  );
}

export default MenuPage;
