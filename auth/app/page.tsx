export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 space-y-4 border border-black rounded-lg">
        <h1 className="text-4xl font-extrabold text-center">
          Image Gallery App
        </h1>
        <ul className="space-y-2 text-center">
          <li>
            <a
              className="underline text-blue-600 hover:text-red-800"
              href="/signup"
            >
              Sign up
            </a>
          </li>
          <li>
            <a
              className="underline text-blue-600 hover:text-red-800"
              href="/login"
            >
              Log in
            </a>
          </li>
          <li>
            <a
              className="underline text-blue-600 hover:text-red-800"
              href="/gallery"
            >
              Go to Gallery
            </a>
          </li>
        </ul>
      </div>
    </main>
  );
}
