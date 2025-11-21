// My Clock Project - JavaScript version
const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const showSecondsCheckbox = document.getElementById('showSeconds');
const use24Checkbox = document.getElementById('use24');

function two(n){ return n.toString().padStart(2,'0'); }

function updateClock(){
  const now = new Date(); // read system time

  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const use24 = use24Checkbox.checked;
  const showSeconds = showSecondsCheckbox.checked;

  let ampm = '';
  if(!use24){
    ampm = hours >= 12 ? ' PM' : ' AM';
    hours = hours % 12 || 12;
  }

  const timeStr = showSeconds
    ? `${two(hours)}:${two(minutes)}:${two(seconds)}${ampm}`
    : `${two(hours)}:${two(minutes)}${ampm}`;

  timeEl.textContent = timeStr;

  const options = {weekday:'short', year:'numeric', month:'short', day:'numeric'};
  dateEl.textContent = now.toLocaleDateString(undefined, options);

  // analog clock updates
  const secondAngle = (seconds / 60) * 360;
  const minuteAngle = (minutes / 60) * 360 + (seconds/60)*6;
  const hourAngle = ((now.getHours() % 12) / 12) * 360 + (minutes/60)*30;

  document.getElementById('second').setAttribute('transform', `rotate(${secondAngle} 100 100)`);
  document.getElementById('minute').setAttribute('transform', `rotate(${minuteAngle} 100 100)`);
  document.getElementById('hour').setAttribute('transform', `rotate(${hourAngle} 100 100)`);
}

// create hour marks once
(function createMarks(){
  const marks = document.getElementById('marks');
  for(let i=0;i<12;i++){
    const angle = i * 30;
    const x1 = 100 + Math.sin(angle*Math.PI/180) * 80;
    const y1 = 100 - Math.cos(angle*Math.PI/180) * 80;
    const x2 = 100 + Math.sin(angle*Math.PI/180) * 88;
    const y2 = 100 - Math.cos(angle*Math.PI/180) * 88;
    const line = document.createElementNS('http://www.w3.org/2000/svg','line');
    line.setAttribute('x1',x1);
    line.setAttribute('y1',y1);
    line.setAttribute('x2',x2);
    line.setAttribute('y2',y2);
    line.setAttribute('stroke','rgba(255,255,255,0.06)');
    line.setAttribute('stroke-width', (i%3===0)?3:1.5);
    marks.appendChild(line);
  }
})();

// Start updating immediately and every second aligned to clock
function start() {
  updateClock();
  // Align next tick to the next second boundary for better accuracy
  const now = new Date();
  const msToNextSecond = 1000 - now.getMilliseconds();
  setTimeout(function(){
    updateClock();
    setInterval(updateClock, 1000);
  }, msToNextSecond);
}
start();
