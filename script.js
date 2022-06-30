const canvas = document.getElementById("canvas1");
const c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let hue = 0;
let hsl = "";

let maxParticleInScene = 1000;
let screenRefrechOpacity = '1';
let colorChangeSpeed = 1;
let maxLineLenght = 100;
let particleAmount = 1;

let linesOn = true;

let e;

const mouse = {
    x: undefined,
    y: undefined
};


class Particle{
    constructor(x, y, color){
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 10 + 6;
        this.xVelocity = Math.random() * 3 - 1.5;
        this.yVelocity = Math.random() * 3 - 1.5;
        this.color = color;
        this.shrinkRate = 0.1;
    }
    draw(){
        
        c.fillStyle = this.color;
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fill();
    }
    update(){
        this.x += this.xVelocity;
        this.y += this.yVelocity;
        if(this.radius > 0.2){
            this.radius -= this.shrinkRate;
        }
    }
}

function update(){
    refrech();
    for(i = 0; i < particles.length; i++){
        particles[i].draw();
        particles[i].update();
        if(linesOn){
            let distance = 0;
            let xDist = 0;
            let yDist = 0;
            let cDist = 0;
            for(z = i; z < particles.length; z++){
                xDist = particles[i].x - particles[z].x;
                yDist = particles[i].y - particles[z].y;
                cDist = (xDist * xDist + yDist * yDist);
                
                distance = Math.sqrt(cDist);

                if(distance < maxLineLenght){
                    c.strokeStyle = particles[i].color;
                    c.beginPath();
                    c.lineWidth = 0.7;
                    c.moveTo(particles[i].x, particles[i].y);
                    c.lineTo(particles[z].x, particles[z].y);
                    c.stroke();
                    c.closePath();
                }
                
            }
        }
        
        
        if(particles.length > maxParticleInScene){
            particles[i].shrinkRate = 0.5;
        }
        if(particles[i].radius <= 0.6){
            particles.splice(i, 1);
            i--;
        }
        
        
    }

    hue += colorChangeSpeed;
    if(hue >= 360){
        hue = 0;
    }
    hsl = 'hsl(' + hue + ', 100%, 50%)';
    
    requestAnimationFrame(update);
}
update();


window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    
    for(i = 0; i < particleAmount; i++){
        particles.push(new Particle(mouse.x, mouse.y, hsl));
    }
    
});

window.addEventListener('click', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    
    for(i = 0; i < 40; i++){
        particles.push(new Particle(mouse.x, mouse.y, hsl));
    }
    
});

function refrech(){
    c.fillStyle = 'rgba(0, 0, 0, '+ screenRefrechOpacity + ')';
    c.fillRect(0, 0, canvas.width, canvas.height);
    
}
function removePaint(){
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
}
function switchLinesOn(){
    switch (linesOn) {
        case true:
            linesOn = false;
            linesOnBtn.innerHTML = "Lines: Off"
            break;
        case false:
            linesOn = true;
            linesOnBtn.innerHTML = "Lines: On"
            break;
        default:
            linesOn = true;
            break;
    }
}

const tailLenghtInput = document.getElementById('tailLenghtInput');
const particleShadowInput = document.getElementById('particleShadow');
const changeColorInput = document.getElementById('colorChange');
const lineLenghtInput = document.getElementById('lineLenght');
const particleSpawnAmountInput = document.getElementById('particleAmount');

const removePaintBtn = document.getElementById('removePaintButton');
const linesOnBtn = document.getElementById('linesOnButton');
removePaintBtn.addEventListener('click', removePaint);
linesOnBtn.addEventListener('click', switchLinesOn);

function updateInputVar(){
    let temp = tailLenghtInput.value;
    if(temp == ""){
        temp = maxParticleInScene;
    }
    maxParticleInScene = parseFloat(temp);

    let temp2 = particleShadowInput.value;
    if(temp2 == "" || temp2 == 0){
        temp2 = screenRefrechOpacity;
    }
    screenRefrechOpacity = temp2;

    let temp3 = changeColorInput.value;
    if(temp3 == "" || 0){
        temp3 = 1;
    }
    colorChangeSpeed = parseFloat(temp3);

    let temp4 = lineLenghtInput.value;
    if(temp4 == ""){
        temp4 = 100;
    }
    maxLineLenght = parseFloat(temp4);
    
    let temp5 = particleSpawnAmountInput.value;
    if(temp5 == ""){
        temp5 = 1;
    }
    particleAmount = parseFloat(temp5);

    requestAnimationFrame(updateInputVar);
}
updateInputVar();
