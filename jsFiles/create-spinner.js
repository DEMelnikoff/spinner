const jsPsych = initJsPsych();

const createSpinner = function(canvas, spinnerData, sectors) {

  /* get context */
  const ctx = canvas.getContext("2d"); 

  /* generate random float in range min-max */
  const rand = (m, M) => Math.random() * (M - m) + m;

  /* define spinner features */
  ctx.canvas.width = 500;
  ctx.canvas.height = 500;

  /*
  const sectors = [
    {color:"#b0f", label:"100"} ,
    {color:"#f0b", label:"5", },
    {color:"#bf0", label:"500"},
  ];
  */
  const tot = sectors.length;
  const elSpin = document.querySelector("#spin");
  const dia = ctx.canvas.width;
  const rad = dia / 2;
  const PI = Math.PI;
  const TAU = 2 * PI;
  const arc = TAU / tot;
  const friction = 0.985;  // 0.995=soft, 0.99=mid, 0.98=hard
  const angVelMin = 0.002; // Below that number will be treated as a stop
  let angVelMax = 0; // Random ang.vel. to acceletare to 
  let angVel = 0;    // Current angular velocity
  let ang = 0;       // Angle rotation in radians
  let isSpinning = false;
  let isAccelerating = false;
  let click = false;

  /* get index of current sector */
  const getIndex = () => Math.floor(tot - ang / TAU * tot) % tot;

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
   // ctx.translate(rad + (Math.cos(ang + arc / 2) * rad * .8), rad + (Math.sin(ang + arc / 2) * rad * .8));
    ctx.translate(rad, rad);
    ctx.rotate(ang + arc / 2);
    ctx.textAlign = "center";
    ctx.fillStyle = "#fff";
    ctx.font = "bold 50px sans-serif";
    ctx.fillText(sector.label, rad - 80, 10);
    //
    ctx.restore();
  };

  //* CSS rotate CANVAS Element */
  const rotate = () => {
    const sector = sectors[getIndex()];
    ctx.canvas.style.transform = `rotate(${ang - PI / 2}rad)`;
    elSpin.textContent = !click ? "SPIN" : sector.label;
    elSpin.style.background = !click ? "grey" : sector.color;
  };

  const frame = () => {
    if (!isSpinning) return;

    if (angVel >= angVelMax) isAccelerating = false;

    // Accelerate
    if (isAccelerating) {
      angVel ||= angVelMin; // Initial velocity kick
      angVel *= 1.06; // Accelerate
    }
    
    // Decelerate
    else {
      isAccelerating = false;
      angVel *= friction; // Decelerate by friction  

      // SPIN END:
      if (angVel < angVelMin) {
        isSpinning = false;
        angVel = 0; 
        const sector = sectors[getIndex()];
        spinnerData.outcome = sector.label;
      }
    }

    ang += angVel; // Update angle
    ang %= TAU;    // Normalize angle
    rotate();      // CSS rotate!
  };

  const engine = () => {
    frame();
    requestAnimationFrame(engine)
  };

  
  elSpin.addEventListener("click", () => {
    if (click) return;
    click = true;
    isSpinning = true;
    isAccelerating = true;
    angVelMax = rand(0.25, 0.40);
  });

  

  // INIT!
  sectors.forEach(drawSector);
  rotate(); // Initial rotation
  engine(); // Start engine!

}





    




