import React, { useState } from 'react';
import { ImageIcon, MessageSquare, Video } from 'lucide-react';
import ImageGenerator from './components/ImageGenerator';
import VideoGenerator from './components/VideoGenerator';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';

function App() {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [selectedTool, setSelectedTool] = useState<string>('llm');

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <ImageIcon className="mr-2" />
              AI Playground
            </h1>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="flex flex-col md:flex-row gap-8 h-[calc(100vh-200px)]">
                <div className="w-full md:w-1/2 flex flex-col h-[calc(100vh-200px)]">
                  <h2 className="text-2xl font-semibold mb-4 flex items-center">
                    <ImageIcon className="mr-2" />
                    Text to Image
                  </h2>
                  <div className="flex-grow flex flex-col">
                    <ImageGenerator setGeneratedImage={setGeneratedImage} />
                    {generatedImage && (
                      <div className="mt-8 flex-grow flex flex-col">
                        <h3 className="text-xl font-semibold mb-4">Generated Image:</h3>
                        <div className="flex-grow overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-100">
                          <img 
                            src={generatedImage} 
                            alt="Generated" 
                            className="w-full h-auto rounded-lg shadow-lg"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-full md:w-1/2 flex flex-col">
                  {selectedTool === 'llm' ? (
                    <>
                      <h2 className="text-2xl font-semibold mb-4 flex items-center">
                        <MessageSquare className="mr-2" />
                        Chat with llama-3.2-90b-text-preview
                      </h2>
                      <div className="flex-grow overflow-hidden">
                        <Chat model="llama-3.2-90b-text-preview" />
                      </div>
                    </>
                  ) : (
                    <>
                      <h2 className="text-2xl font-semibold mb-4 flex items-center">
                        <Video className="mr-2" />
                        Text to Video
                      </h2>
                      <div className="flex-grow flex flex-col">
                        <VideoGenerator setGeneratedVideo={setGeneratedVideo} />
                        {generatedVideo && (
                          <div className="mt-8 flex-grow flex flex-col">
                            <h3 className="text-xl font-semibold mb-4">Generated Video:</h3>
                            <div className="flex-grow overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-100">
                              <video 
                                src={generatedVideo} 
                                controls 
                                className="w-full h-auto rounded-lg shadow-lg"
                              >
                                Your browser does not support the video tag.
                              </video>
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;