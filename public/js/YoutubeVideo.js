var YoutubeVideo = function(videoId){

  var player = new YT.Player(videoId, {
    playerVars: {
      controls: 0,
      modestbranding: 1,
      showinfo: 0,
      rel: 0
    },
    events: {
      'onReady': onPlayerReady
    }
  });

  function onPlayerReady(event) {
    event.target.mute();
    event.target.playVideo();
  };

  function stopVideo() {
    player.stopVideo();
  };
};
YoutubeVideo.prototype.constructor = YoutubeVideo;
