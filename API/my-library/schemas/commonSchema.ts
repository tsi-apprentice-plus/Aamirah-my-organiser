const commonSchema = {
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String },
  pages: { type: Number },
};

export default commonSchema;
