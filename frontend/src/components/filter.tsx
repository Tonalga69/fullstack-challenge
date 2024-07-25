import useCategoriesStore from "../states/categories";
import axios from "axios";
import { stat } from "fs";
import { useEffect } from "react";
import "./styles/select.css";

export default function Filter() {
  const addCategories = useCategoriesStore((state) => state.addCategories);
  const setSelectedCategory = useCategoriesStore(
    (state) => state.setSelectedCategory
  );
  const selectedCategory = useCategoriesStore((state) => state.selectedCategory);
  const categories = useCategoriesStore((state) => state.categories);
  useEffect(() => {
    axios.get("http://localhost:3000/categories").then((response) => {
      addCategories(response.data);
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryName = e.target.value;
    const selectedCategory = categories.find((category) => category.name === selectedCategoryName);
    if (selectedCategoryName === "None") {
      setSelectedCategory(undefined);
      return;
    }
    setSelectedCategory(selectedCategory);
  };

  return (
    <div>
      <select className="custom-select" name="categoryFilter" id="categoryFilter" value={selectedCategory?.name} onChange={handleChange}>
        <option className="custom-option" value="None">None</option>
        {categories.map((category) => (
          <option className="custom-option" value={category.name} key={category.id}>{category.name}</option>
        ))}
      </select>
    </div>
  );
}
