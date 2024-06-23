export default function Home() {
  return (
    <div className="main-page">
      <h1>Welcome to My Organiser</h1>
      <p>Select a category to manage your items:</p>
      <ul>
        <li>
          <a href="/my-library">My Library</a>
        </li>
        <li>
          <a href="/to-do">To-do List</a>
        </li>
        <li>
          <a href="/my-recipes">My Recipes</a>
        </li>
      </ul>
    </div>
  );
}
