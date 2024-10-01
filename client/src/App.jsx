import  { useState } from 'react';

function App() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      setShortUrl(data.shortUrl);
    } catch (error) {
      console.error('Error shortening URL:', error);
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">URL Shortener</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-96">
        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Shorten
        </button>
      </form>
      {shortUrl && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-md w-96">
          <h2 className="text-xl font-semibold text-gray-800">Shortened URL:</h2>
          <p className="text-gray-600">{shortUrl}</p>
        </div>
      )}
    </div>
  );
}

export default App;
