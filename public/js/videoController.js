var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var container = $('#portfolio-grid');

var VIMvideos = $('#portfolio-grid').find('.grid-item iframe.Vimeo');
$.each(VIMvideos, function(index, video){
  new VimeoVideo(video.id);
});

function onYouTubeIframeAPIReady() {
  var YTvideos = $('#portfolio-grid').find('.grid-item iframe.Youtube');
  $.each(YTvideos, function(index, video){
    new YoutubeVideo(video.id);
  });
  var wall = new freewall("#portfolio-grid");
  wall.reset({
    selector: '.grid-item',
    animate: true,
    cellW: 150,
    cellH: 'auto',
    gutterX: 10,
    gutterY: 10,
    onResize: function() {
      wall.fitWidth();
    }
  });
  wall.fitWidth();
};
