import React, { useState } from 'react';
import * as fal from "@fal-ai/serverless-client";

interface ImageGeneratorProps {
  setGeneratedImage: (image: string | null) => void;
}

const ImageGenerator: React.FC<ImageGeneratorProps> = ({ setGeneratedImage }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async () => {
    setLoading(true);
    setError(null);
    try {
      fal.config({
        credentials: 'a99b0868-c3cb-493c-900c-43e1f0d736fe:ba78fa0c2de22635ff6157c00d631cc9',
      });

      const result = await fal.subscribe("fal-ai/fast-sdxl", {
        input: {
          prompt: prompt,
        },
        logs: true,
        onQueueUpdate: (update) => {
          if (update.status === "IN_PROGRESS") {
            update.logs.map((log) => log.message).forEach(console.log);
          }
        },
      });

      if (result && result.images && result.images[0]) {
        setGeneratedImage(result.images[0].url);
      } else {
        throw new Error('No image data received');
      }
    } catch (err) {
      setError('Failed to generate image. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-4">
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
          Enter your prompt:
        </label>
        <input
          type="text"
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="A futuristic city with flying cars"
        />
      </div>
      <button
        onClick={generateImage}
        disabled={loading || !prompt}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {loading ? 'Generating...' : 'Generate Image'}
      </button>
      {error && <p className="mt-2 text-red-600">{error}</p>}
    </div>
  );
};

export default ImageGenerator;