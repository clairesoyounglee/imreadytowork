document.addEventListener('DOMContentLoaded', function() {
  var videos = document.querySelectorAll('[data-loop-video]');
  videos.forEach(function(v) {
    v.muted = true;
    v.setAttribute('muted', '');
    v.setAttribute('playsinline', '');
    v.loop = true;
    
    function tryPlay() {
      var playPromise = v.play();
      if (playPromise !== undefined) {
        playPromise.catch(function() {
          setTimeout(tryPlay, 1000);
        });
      }
    }
    
    v.addEventListener('ended', function() {
      setTimeout(function() {
        v.currentTime = 0;
        v.play();
      }, 800);
    });

    if (v.readyState >= 2) {
      tryPlay();
    } else {
      v.addEventListener('loadeddata', tryPlay);
    }
  });
});
