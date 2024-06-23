import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div>
      <header>
        <h1>My Organiser</h1>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/my-library">My Library</Link>
          <Link href="/to-do">To-Do List</Link>
          <Link href="/my-recipes">My Recipes</Link>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
