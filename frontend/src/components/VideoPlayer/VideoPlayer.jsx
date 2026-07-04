function VideoPlayer({ videoUrl }) {
  if (!videoUrl) {
    return <p>No video available for this session.</p>;
  }

  return (
    <div>
      <h3>Game Video</h3>

      <video key={videoUrl} width="100%" controls>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default VideoPlayer;