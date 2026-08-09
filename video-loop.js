document.addEventListener('DOMContentLoaded', function() {
  var video = document.getElementById('bestVideo');
  if (!video) return;

  video.muted = true;
  video.setAttribute('muted', '');

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        video.play().catch(function(){});
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.3 });

  observer.observe(video);
});
