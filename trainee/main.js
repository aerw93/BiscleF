const btn = document.querySelector('button');

function random(number) {
   return Math.floor(Math.random() * (number+1));
 }

function bgChange() {
  const rndCol = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
  document.body.style.backgroundColor = rndCol;
}

btn.onclick = bgChange;

var sect = document.querySelector('section')
var para = document.createElement('p')
para.textContent = 'we hope you enjoy the ride'
sect.appendChild(para)
var text = document.createTextNode('sdfsdfsdfd sdfdsfdf')
var linkPara = document.querySelector('p')
linkPara.appendChild(text)
para.setAttribute('class', 'highlight')