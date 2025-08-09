import React from "react";
import { Clipboard, Copy } from "lucide-react";
const DemoBanner = () => {
  return (
    <>
      <div className="w-full -top-1 border p-2 bg-accent text-white text-center flex flex-wrap items-center justify-center gap-4 absolute  shadow-sm">
        <strong>Demo Login:</strong>

        <div className="flex items-center gap-1">
          <span>Email:</span>
          <code className="bg-black/20 px-1 rounded">test@test.com</code>
          <button
            className="bg-black/30 px-2 py-1 rounded text-xs hover:bg-black/50 flex gap-1"
            onClick={() => navigator.clipboard.writeText("test@test.com")}
          >
            <Copy size={14} /> <span>Copy</span>
          </button>
        </div>

        <div>|</div>

        <div className="flex items-center gap-1">
          <span>Password:</span>
          <code className="bg-black/20 px-1 rounded">testtest</code>
          <button
            className="bg-black/30 px-2 py-1 rounded text-xs hover:bg-black/50 flex gap-1"
            onClick={() => navigator.clipboard.writeText("testtest")}
          >
            <Copy size={14} /> <span>Copy</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default DemoBanner;
