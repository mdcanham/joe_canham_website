var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var container = $('#portfolio-grid');

var VIMvideos = $('#portfolio-grid').find('.grid-item iframe.Vimeo');
var ModalVIMvideos = $.find('iframe.modal-video.Vimeo');

$.each(VIMvideos, function(index, video){
  new VimeoVideo(video.id);
});

$.each(ModalVIMvideos, function(index, video){
  new VimeoVideo(video.id);
});

function onYouTubeIframeAPIReady() {
  var PreviewYTvideos = $('#portfolio-grid').find('.grid-item iframe.Youtube');
  var ModalYTVideos = $.find('iframe.modal-video.Youtube');

  $.each(PreviewYTvideos, function(index, video){
    new YoutubeVideo(video.id);
  });

  $.each(ModalYTVideos, function(index, video){
    new YoutubeVideo(video.id)
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
