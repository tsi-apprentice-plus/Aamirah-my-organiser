import { useState, useEffect } from "react";

const fieldMappings = {
  books: ["title", "author", "genre", "pages", "rating"],
  "currently-reading": ["title", "author", "genre", "pages", "progress"],
  "want-to-read": ["title", "author", "genre", "pages"],
};

export default function AddBookModal({
  isOpen,
  onClose,
  onSubmit,
  collection,
  initialData,
}) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    pages: "",
    progress: "",
    rating: "",
  });

  useEffect(() => {
    if (initialData) {
      const { title, author } = initialData;
      setFormData((prevData) => ({
        ...prevData,
        title: title || "",
        author: author || "",
      }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen || !fieldMappings[collection]) return null;

  const fields = fieldMappings[collection];

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="text-xl font-bold mb-4">Add to {collection}</h2>
        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field}>
              <label>{field[0].toUpperCase() + field.slice(1)}</label>
              <input
                type={
                  field === "pages" ||
                  field === "rating" ||
                  field === "progress"
                    ? "number"
                    : "text"
                }
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <div className="form-actions">
            <button type="button" className="cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
