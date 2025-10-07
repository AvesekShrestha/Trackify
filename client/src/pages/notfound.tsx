import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-white text-gray-800">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold">404</h1>
        <p className="text-xl">
          Sorry, the page you're looking for cannot be found.
        </p>
        <Link
          to="/dashboard"
          className="inline-block mt-4 px-6 py-3 bg-blue-500 text-white font-medium rounded-md shadow hover:bg-blue-600 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

