import { useState } from "react";

// Define the field mappings for each collection type
const fieldMappings = {
  read: ["title", "author", "genre", "pages", "rating"],
  "currently-reading": ["title", "author", "genre", "pages", "progress"],
  "want-to-read": ["title", "author", "genre", "pages"],
};

export default function AddBookModal({ isOpen, onClose, onSubmit, collection }) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    pages: "",
    progress: "",
    rating: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  // Ensure collection is defined and valid
  if (!isOpen || !fieldMappings[collection]) return null;

  const fields = fieldMappings[collection];

  return (
    <div className="modal">
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-bold mb-4">Add to {collection}</h2>
          <form onSubmit={handleSubmit}>
            {fields.map((field) => (
              <div key={field} className="mb-2">
                <label className="block text-sm font-medium">{field[0].toUpperCase() + field.slice(1)}</label>
                <input
                  type={field === "pages" || field === "rating" || field === "progress" ? "number" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            ))}
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 text-white py-1 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white py-1 px-4 rounded"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
