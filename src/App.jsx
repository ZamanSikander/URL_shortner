/* eslint-disable no-unused-vars */
import  { useState } from "react";
import axios from "axios";

const UrlShortener = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_API_KEY;


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://api-ssl.bitly.com/v4/shorten",
        {
          long_url: longUrl,
        },
        {
          headers: {
            Authorization: ` Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      setShortUrl(response.data.link);
      setError("");
    } catch (err) {
      setError("Failed to shorten the URL. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        URL Shortener
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter long URL"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Shorten URL
        </button>
      </form>
      {shortUrl && (
        <div className="mt-6 text-center">
          <p className="text-lg text-green-600 font-semibold">Shortened URL:</p>
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline break-all"
          >
            {shortUrl}
          </a>
        </div>
      )}
      {error && (
        <p className="mt-4 text-center text-red-500">
          {error}
        </p>
      )}
    </div>
  </div>
  );
};

export default UrlShortener;
