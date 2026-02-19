(function () {
  var canvas = document.getElementById('starfield');
  if (!canvas) return;

  var ctx = canvas.getContext('2d');
  var stars = [];
  var NUM_STARS = 150;

  function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createStar(randomY) {
    return {
      x: Math.random() * canvas.width,
      y: randomY !== undefined ? randomY : Math.random() * canvas.height,
      speed: randomBetween(0.2, 1.0),
      radius: randomBetween(0.5, 1.5),
      opacity: randomBetween(0.4, 1.0)
    };
  }

  function initStars() {
    stars = [];
    for (var i = 0; i < NUM_STARS; i++) {
      stars.push(createStar());
    }
  }

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initStars();
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,' + s.opacity + ')';
      ctx.fill();

      s.y += s.speed;

      if (s.y > canvas.height + 2) {
        stars[i] = createStar(0);
        stars[i].y = -2;
      }
    }

    requestAnimationFrame(draw);
  }

  resizeCanvas();
  draw();

  window.addEventListener('resize', resizeCanvas);
})();
