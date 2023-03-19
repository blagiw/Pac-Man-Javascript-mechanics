var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width / 2 - 25;
var y = canvas.height / 2 - 25;
var speed = 5;
var mouthOpen = false;
var blocks = [];
var blockWidth = 20;
var blockHeight = 20;
var score = 0;
var numBlocks = 10;

// Generate random blocks
function generateBlocks(numBlocks) {
  for (var i = 0; i < numBlocks; i++) {
    var blockX = Math.floor(Math.random() * (canvas.width - blockWidth));
    var blockY = Math.floor(Math.random() * (canvas.height - blockHeight));
    blocks.push({
      x: blockX,
      y: blockY,
      width: blockWidth,
      height: blockHeight
    });
  }
}
generateBlocks(numBlocks);

// Handle keyboard input
document.addEventListener("keydown", function(event) {
  if (event.key === "w") {
    y -= speed;
  } else if (event.key === "a") {
    x -= speed;
  } else if (event.key === "s") {
    y += speed;
  } else if (event.key === "d") {
    x += speed;
  }
  checkCollisions();
});

// Check for collisions between the player and blocks
function checkCollisions() {
  for (var i = 0; i < blocks.length; i++) {
    var block = blocks[i];
    if (x < block.x + block.width &&
        x + 50 > block.x &&
        y < block.y + block.height &&
        y + 50 > block.y) {
      // collision detected, increase score and remove block
      score += 10;
      document.getElementById("score").innerHTML = "Score: " + score;
      blocks.splice(i, 1);
      numBlocks--;
      break;
    }
  }
}

// Draw the game
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw blocks
  for (var i = 0; i < blocks.length; i++) {
    ctx.fillStyle = "yellow";
    ctx.fillRect(blocks[i].x, blocks[i].y, blocks[i].width, blocks[i].height);
  }

  // Draw Pac-Man
  if (mouthOpen) {
    ctx.beginPath();
    ctx.arc(x + 25, y + 25, 25, 0.15 * Math.PI, 1.85 * Math.PI);
    ctx.lineTo(x + 25, y + 25);
    ctx.closePath();
    ctx.fillStyle = "yellow";
    ctx.fill();
  } else {
    ctx.beginPath();
    ctx.arc(x + 25, y + 25, 25, 0.25 * Math.PI, 1.75 * Math.PI);
    ctx.lineTo(x + 25, y + 25);
    ctx.closePath();
    ctx.fillStyle = "yellow";
    ctx.fill();
  }

  mouthOpen = !mouthOpen;

  // Request another animation frame
  requestAnimationFrame(draw);
}

draw();
