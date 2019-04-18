export default function() {
  var width,
    height,
    largeHeader,
    canvas,
    ctx,
    circles,
    animateHeader = true

  // Main
  initHeader()
  addListeners()

  function initHeader() {
    width = window.innerWidth
    height = window.innerHeight

    largeHeader = document.getElementById('home-container')
    largeHeader.style.height = height + 'px'

    canvas = document.getElementById('video-canvas')
    canvas.width = width
    canvas.height = height
    ctx = canvas.getContext('2d')

    // create particles
    circles = []
    for (var x = 0; x < width * 0.5; x++) {
      var c = new Circle()
      circles.push(c)
    }
    animate()
  }

  // Event handling
  function addListeners() {
    window.addEventListener('scroll', scrollCheck)
    window.addEventListener('resize', resize)
  }

  function scrollCheck() {
    if (document.body.scrollTop > height) animateHeader = false
    else animateHeader = true
  }

  function resize() {
    width = window.innerWidth
    height = window.innerHeight
    largeHeader.style.height = height + 'px'
    canvas.width = width
    canvas.height = height
  }

  function animate() {
    if (animateHeader) {
      ctx.clearRect(0, 0, width, height)
      for (var i in circles) {
        circles[i].draw()
      }
    }
    requestAnimationFrame(animate)
  }

  // Canvas manipulation
  function Circle() {
    var _this = this

    // constructor
    ;(function() {
      _this.pos = {}
      init()
    })()

    function init() {
      _this.pos.x = Math.random() * width
      _this.pos.y = height + Math.random() * 100
      _this.alpha = 0.1 + Math.random() * 0.7
      _this.scale = 0.1 + Math.random() * 0.3
      _this.velocity = Math.random()
    }

    this.draw = function() {
      if (_this.alpha <= 0) {
        init()
      }
      var width = _this.scale * 17
      // var width = 30
      var height = width * 1.5
      var topCurveHeight = height * 0.3

      _this.pos.y -= _this.velocity
      _this.alpha -= 0.0005
      ctx.beginPath()

      ctx.moveTo(_this.pos.x, _this.pos.y + topCurveHeight)

      // top left curve
      ctx.bezierCurveTo(
        _this.pos.x,
        _this.pos.y,
        _this.pos.x - width / 2,
        _this.pos.y,
        _this.pos.x - width / 2,
        _this.pos.y + topCurveHeight
      )

      // bottom left curve
      ctx.bezierCurveTo(
        _this.pos.x - width / 2,
        _this.pos.y + (height + topCurveHeight) / 2,
        _this.pos.x,
        _this.pos.y + (height + topCurveHeight) / 2,
        _this.pos.x,
        _this.pos.y + height
      )

      // bottom right curve
      ctx.bezierCurveTo(
        _this.pos.x,
        _this.pos.y + (height + topCurveHeight) / 2,
        _this.pos.x + width / 2,
        _this.pos.y + (height + topCurveHeight) / 2,
        _this.pos.x + width / 2,
        _this.pos.y + topCurveHeight
      )

      // top right curve
      ctx.bezierCurveTo(
        _this.pos.x + width / 2,
        _this.pos.y,
        _this.pos.x,
        _this.pos.y,
        _this.pos.x,
        _this.pos.y + topCurveHeight
      )

      ctx.fillStyle = 'rgba(255,255,255,' + _this.alpha + ')'
      ctx.fill()
    }
  }
}
