var VimeoVideo = function(videoId){
  var iframe = $('#' + videoId)[0];
  var player = $f(iframe);
  var status = $('.status');
  var isInModal = videoId.startsWith('modal');

  // When the player is ready, mute the video
  player.addEvent('ready', function() {
    if(!isInModal){
      player.api('setVolume', 0);
      player.api('play');
    }
  });

  if(isInModal){
    $('.modal').on('hidden.bs.modal', function () {
      player.api('unload');
    });
  }
};
VimeoVideo.prototype.constructor = VimeoVideo;
