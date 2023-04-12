const jsPsych = initJsPsych();

const createSpinner = function(canvas, spinnerData, score, sectors) {

  /* get context */
  const ctx = canvas.getContext("2d"); 

  /* get pointer */
  const pointer = document.querySelector("#spin");

  /* get score message */
  const scoreMsg = document.getElementById("score");

  /* get wheel properties */
  const wheelWidth = canvas.getBoundingClientRect()['width'];
  const wheelHeight = canvas.getBoundingClientRect()['height'];
  const wheelX = canvas.getBoundingClientRect()['x'] + wheelWidth / 2;
  const wheelY = canvas.getBoundingClientRect()['y'] + wheelHeight / 2;
  const tot = sectors.length; // total number of sectors
  const rad = wheelWidth / 2; // radius of wheel
  const PI = Math.PI;
  const arc = (2 * PI) / tot; // arc sizes in radians

  /* spin dynamics */
  const friction = 0.98;  // 0.995=soft, 0.99=mid, 0.98=hard
  const angVelMin = 5; // Below that number will be treated as a stop
  let angVelMax = 0; // Random ang.vel. to acceletare to 
  let angVel = 0;    // Current angular velocity

  /* state variables */
  let isGrabbed = false;       // true when wheel is grabbed, false otherwise
  let isDragging = false;      // true when wheel is being dragged, false otherwise
  let isSpinning = false;      // true when wheel is spinning, false otherwise
  let isAccelerating = false;  // true when wheel is accelerating, false otherwise
  let lastAngles = [0,0,0];    // store the last three angles
  let startAngle = null;       // angle of grab
  let oldAngle = 0;            // wheel angle prior to last perturbation
  let currentAngle = null;     // wheel angle after last perturbation


  /* define spinning functions */

  const onGrab = (x, y) => {
    if (!isSpinning) {
      isGrabbed = true;
      startAngle = calculateAngle(x, y);
    };
  };

  const calculateAngle =  (currentX, currentY) => {
    let xLength = currentX - wheelX;
    let yLength = currentY - wheelY;
    let angle = Math.atan2(xLength, yLength) * (180/Math.PI);
    return 360 - angle;
  };

  const onMove = (x, y) => {
    if(isGrabbed) { isDragging = true };
    if(!isDragging)
      return
    lastAngles.shift();
    let deltaAngle = calculateAngle(x, y) - startAngle;
    currentAngle = deltaAngle + oldAngle;
    lastAngles.push(currentAngle);
    render(currentAngle);
  };

  const render = (deg) => {
    canvas.style.transform = `rotate(${deg}deg)`;
  };

  const onRelease = function() {
    isGrabbed = false;
    if(isDragging){
      isDragging = false;
      oldAngle = currentAngle;
      let speed = lastAngles[2] - lastAngles[0];
      if (Math.abs(speed) > angVelMin) {
        isAccelerating = true;
        isSpinning = true;
        angVelMax = rand(25, 50);
        giveMoment(speed)
      };
    };   
  };

  const giveMoment = function(speed) {

    // stop accelerating when max speed is reached
    if (Math.abs(speed) >= angVelMax) isAccelerating = false;

    // accelerate
    if (isAccelerating) {
      speed *= 1.06; // Accelerate
      const req = window.requestAnimationFrame(giveMoment.bind(this, speed));
      oldAngle += speed;
      lastAngles.shift();
      lastAngles.push(oldAngle);
      render(oldAngle);
    }
    
    // decelerate and stop
    else {
      isAccelerating = false;
      speed *= friction; // Decelerate by friction  
      const req = window.requestAnimationFrame(giveMoment.bind(this, speed));
      if (Math.abs(speed) > angVelMin * .1) {
        // decelerate
        oldAngle += speed;
        lastAngles.shift();
        lastAngles.push(oldAngle);
        render(oldAngle);       
      } else {
        // stop spinner
        speed = 0;
        currentAngle = oldAngle;
        let sector = sectors[getIndex()];
        spinnerData.outcomes.push(parseFloat(sector.label));
        pointer.textContent = sector.label;
        pointer.style.background = sector.color;
        updateScore(parseFloat(sector.label), sector.color);
        window.cancelAnimationFrame(req);
      };
    };
  };

  /* generate random float in range min-max */
  const rand = (m, M) => Math.random() * (M - m) + m;

  const updateScore = (points, color) => {
    score += points;
    spinnerData.score = score;
    scoreMsg.innerHTML = `<span style="color:${color}; font-size:70px; font-weight: bold">${score}</span>`;
    setTimeout(() => {
      scoreMsg.innerHTML = `${score}`
      pointer.textContent = "Spin!";
      pointer.style.background = "grey";
      isSpinning = false;
    }, 1000);
  };

  const getIndex = () => {
    let normAngle = 0;
    let modAngle = currentAngle % 360;
    if (modAngle > 270) {
      normAngle = 360 - modAngle + 270;
    } else if (modAngle < -90) { 
      normAngle =  -modAngle - 90;
    } else {
      normAngle = 270 - modAngle;
    }
    let sector = Math.floor(normAngle / (360 / tot))
    return sector
  }

  //* Draw sectors and prizes texts to canvas */
  const drawSector = (sector, i) => {
    const ang = arc * i;
    ctx.save();
    // COLOR
    ctx.beginPath();
    ctx.fillStyle = sector.color;
    ctx.moveTo(rad, rad);
    ctx.arc(rad, rad, rad, ang, ang + arc);
    ctx.lineTo(rad, rad);
    ctx.fill();
    // TEXT
    ctx.translate(rad, rad);
    ctx.rotate(ang + arc / 2);
    ctx.textAlign = "center";
    ctx.fillStyle = "#fff";
    ctx.font = "bold 50px sans-serif";
    ctx.fillText(sector.label, rad - 80, 10);
    // RESTORE
    ctx.restore();
  };

  sectors.forEach(drawSector);

  /* add event listners */
  canvas.addEventListener('mousedown', function(e) {
      onGrab(e.clientX, e.clientY);
  });

  canvas.addEventListener('mousemove', function(e) {
      if(isGrabbed) { onMove(e.clientX, e.clientY) };
  });

  window.addEventListener('mouseup', onRelease);

}





    




