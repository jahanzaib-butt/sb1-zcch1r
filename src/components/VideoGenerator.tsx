import React, { useState } from 'react';
import Replicate from "replicate";

interface VideoGeneratorProps {
  setGeneratedVideo: (video: string | null) => void;
}

const VideoGenerator: React.FC<VideoGeneratorProps> = ({ setGeneratedVideo }) => {
  const [promptStart, setPromptStart] = useState('');
  const [promptEnd, setPromptEnd] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateVideo = async () => {
    setLoading(true);
    setError(null);
    try {
      const replicate = new Replicate({
        auth: process.env.REPLICATE_API_TOKEN,
      });

      const input = {
        prompt_start: promptStart,
        prompt_end: promptEnd,
        gif_ping_pong: true,
        output_format: "mp4",
        prompt_strength: 0.9,
        num_animation_frames: "25"
      };

      let videoUrl = null;
      for await (const event of replicate.stream("andreasjansson/stable-diffusion-animation:ca1f5e306e5721e19c473e0d094e6603f0456fe759c10715fcd6c1b79242d4a5", { input })) {
        videoUrl = event;
      }

      if (videoUrl) {
        setGeneratedVideo(videoUrl);
      } else {
        throw new Error('No video URL received');
      }
    } catch (err) {
      setError('Failed to generate video. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-4">
        <label htmlFor="promptStart" className="block text-sm font-medium text-gray-700 mb-2">
          Start prompt:
        </label>
        <input
          type="text"
          id="promptStart"
          value={promptStart}
          onChange={(e) => setPromptStart(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter start prompt"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="promptEnd" className="block text-sm font-medium text-gray-700 mb-2">
          End prompt:
        </label>
        <input
          type="text"
          id="promptEnd"
          value={promptEnd}
          onChange={(e) => setPromptEnd(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter end prompt"
        />
      </div>
      <button
        onClick={generateVideo}
        disabled={loading || !promptStart || !promptEnd}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {loading ? 'Generating...' : 'Generate Video'}
      </button>
      {error && <p className="mt-2 text-red-600">{error}</p>}
    </div>
  );
};

export default VideoGenerator;