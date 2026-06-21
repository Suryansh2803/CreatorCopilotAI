import bgVideo from '../assets/Bg-Video.mp4';

export default function BgVideo() {
  return (
    <div className="bg-video-wrap">
      <video
        className="bg-video"
        src={bgVideo}
        autoPlay
        loop
        muted
        playsInline
      />
      {/* layered overlays for depth */}
      <div className="bg-video-overlay-1" />
      <div className="bg-video-overlay-2" />
    </div>
  );
}
