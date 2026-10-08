import { listDishes } from "../lib/store";
import MenuExplorer from "./MenuExplorer";

export const revalidate = 3600;

export const metadata = {
  title: "Our Menu",
  description: "Explore our full menu of authentic Ethiopian dishes, freshly prepared with traditional berbere spices and injera.",
};

export default function MenuPage() {
  const allDishes = listDishes();
  const categories = ["All", ...new Set(allDishes.map((dish) => dish.category))];

  return <MenuExplorer initialDishes={allDishes} categories={categories} />;
}