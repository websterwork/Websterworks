'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Play, Pause, Volume2 } from 'lucide-react';

// Dynamically import react-player with SSR disabled
const ReactPlayer = dynamic(
  () => import('react-player'), 
  { ssr: false }
);

export default function VideoShowcase({ title, description, videoUrl, thumbnail }) {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  // Clean the video URL (remove malformed parameters like '=example')
  const cleanVideoUrl = videoUrl ? videoUrl.replace(/=example$/, '') : '';

  return (
    <div className="relative rounded-2xl overflow-hidden border border-gray-300 dark:border-gray-700 bg-gray-900">
      {/* ... (keep your existing JSX structure for header, buttons, etc.) ... */}
      
      <div className="relative h-[300px] md:h-[400px] bg-black">
        <ReactPlayer
          url={cleanVideoUrl}
          playing={playing}
          muted={muted}
          controls={false}
          width="100%"
          height="100%"
          style={{ position: 'absolute', top: 0, left: 0 }}
          light={thumbnail || true}
          playIcon={
            <div className="flex items-center justify-center w-16 h-16 bg-white/90 rounded-full hover:bg-white transition-colors">
              <Play size={32} className="text-black ml-1" />
            </div>
          }
        />
      </div>
    </div>
  );
}