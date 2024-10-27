import React from 'react';
import { Bot, Video } from 'lucide-react';

interface SidebarProps {
  selectedTool: string;
  setSelectedTool: (tool: string) => void;
}

const tools = [
  { id: 'llm', name: 'LLM Chat', icon: Bot },
  { id: 'video', name: 'Text to Video', icon: Video },
];

const Sidebar: React.FC<SidebarProps> = ({ selectedTool, setSelectedTool }) => {
  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <h2 className="text-2xl font-semibold text-center mb-6 flex items-center justify-center">
        <Bot className="mr-2" />
        AI Tools
      </h2>
      <nav>
        {tools.map((tool) => (
          <button
            key={tool.id}
            className={`block py-2.5 px-4 rounded transition duration-200 w-full text-left flex items-center ${
              selectedTool === tool.id ? 'bg-gray-700' : 'hover:bg-gray-700'
            }`}
            onClick={() => setSelectedTool(tool.id)}
          >
            <tool.icon className="mr-2" size={20} />
            {tool.name}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;