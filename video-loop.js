document.addEventListener('DOMContentLoaded', function() {
  var video = document.getElementById('bestVideo');
  if (!video) return;

  video.muted = true;
  video.setAttribute('muted', '');

  // 자동재생 시도
  var playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.catch(function() {
      // 자동재생 실패 시 클릭 재생 오버레이 표시
      showPlayButton();
    });
  }

  // 뷰포트 진입 시 재생 시도
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        video.play().catch(function(){});
      }
    });
  }, { threshold: 0.3 });
  observer.observe(video);

  function showPlayButton() {
    var parent = video.parentElement;
    parent.style.position = 'relative';
    parent.style.cursor = 'pointer';

    var btn = document.createElement('div');
    btn.style.cssText = 'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:80px;height:80px;background:rgba(0,0,0,0.6);border-radius:50%;display:flex;align-items:center;justify-content:center;z-index:5;';
    btn.innerHTML = '<svg width="32" height="32" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>';
    parent.appendChild(btn);

    parent.addEventListener('click', function() {
      video.muted = true;
      video.play().then(function() {
        btn.remove();
        parent.style.cursor = '';
      }).catch(function(){});
    }, { once: true });
  }
});
