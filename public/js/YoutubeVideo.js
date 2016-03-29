var YoutubeVideo = function(videoId){

  var isInModal = videoId.startsWith('modal');

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
    if (!isInModal) {
      event.target.mute();
      event.target.playVideo();
    }
  };

  function stopVideo() {
    player.stopVideo();
  };

  if(isInModal){
    $('.modal').on('hidden.bs.modal', function () {
      stopVideo();
    });
  }
};
YoutubeVideo.prototype.constructor = YoutubeVideo;
