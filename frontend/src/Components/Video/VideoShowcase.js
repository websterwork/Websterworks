'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Play, Pause, Volume2 } from 'lucide-react';

// Dynamically import react-player with no SSR
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />
      
      <div className="relative z-20 p-6 md:p-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">{title}</h2>
          <p className="text-gray-300 mb-6 md:mb-8">{description}</p>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setPlaying(!playing)}
              className="flex items-center gap-2 px-5 py-2.5 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-colors"
            >
              {playing ? (
                <>
                  <Pause size={18} />
                  Pause
                </>
              ) : (
                <>
                  <Play size={18} />
                  Play Video
                </>
              )}
            </button>
            
            <button
              onClick={() => setMuted(!muted)}
              className="p-2.5 border border-gray-600 rounded-xl hover:bg-gray-800/50 transition-colors"
              aria-label={muted ? 'Unmute' : 'Mute'}
            >
              <Volume2 size={20} className={muted ? 'text-gray-500' : 'text-white'} />
            </button>
          </div>
        </div>
      </div>

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