import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaRoad,
  FaTint,
  FaTrash,
  FaLightbulb,
  FaShieldAlt,
  FaClipboardList,
} from "react-icons/fa";

const categories = [
  { id: "road", name: "Road Damage", icon: <FaRoad size={24} /> },
  { id: "water", name: "Water Supply", icon: <FaTint size={24} /> },
  { id: "garbage", name: "Garbage Collection", icon: <FaTrash size={24} /> },
  { id: "light", name: "Street Light", icon: <FaLightbulb size={24} /> },
  { id: "safety", name: "Public Safety", icon: <FaShieldAlt size={24} /> },
  { id: "other", name: "Other", icon: <FaClipboardList size={24} /> },
];

const CategoryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!selectedCategory) return;

    navigate("/details", {
      state: { category: selectedCategory },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Report an Issue
        </h1>

        <p className="text-gray-500 mb-8">
          Select the category that best describes your issue.
        </p>

        <div className="grid grid-cols-2 gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-5 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-3
              ${
                selectedCategory === category.id
                  ? "border-blue-600 bg-blue-50 scale-105 shadow-md"
                  : "border-gray-200 bg-white hover:border-blue-300"
              }`}
            >
              <div className="text-blue-600">{category.icon}</div>

              <span className="text-sm font-medium text-gray-700 text-center">
                {category.name}
              </span>
            </button>
          ))}
        </div>

        <button
          disabled={!selectedCategory}
          onClick={handleContinue}
          className={`w-full mt-10 py-4 rounded-xl text-white font-semibold transition-all
          ${
            selectedCategory
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default CategoryPage;