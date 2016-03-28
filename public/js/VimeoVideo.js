var VimeoVideo = function(videoId){
  var iframe = $('#' + videoId)[0];
  var player = $f(iframe);
  var status = $('.status');

  // When the player is ready, mute the video
  player.addEvent('ready', function() {
      player.api('setVolume', 0);
      player.api('play');
  });

};
VimeoVideo.prototype.constructor = VimeoVideo;
