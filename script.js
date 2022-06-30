const canvas = document.getElementById("canvas1");
const c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let hue = 0;
let hsl = "";

let maxParticleInScene = 150;
let screenRefrechOpacity = '150';
let colorChangeSpeed = 1;


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
        let distance = 0;
        let xDist = 0;
        let yDist = 0;
        let cDist = 0;
        for(z = i; z < particles.length; z++){
            xDist = particles[i].x - particles[z].x;
            yDist = particles[i].y - particles[z].y;
            cDist = (xDist * xDist + yDist * yDist);
            
            distance = Math.sqrt(cDist);

            if(distance < 100){
                c.strokeStyle = particles[i].color;
                c.beginPath();
                c.lineWidth = 0.7;
                c.moveTo(particles[i].x, particles[i].y);
                c.lineTo(particles[z].x, particles[z].y);
                c.stroke();
                c.closePath();
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
    
    particles.push(new Particle(mouse.x, mouse.y, hsl));
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



const tailLenghtInput = document.getElementById('tailLenghtInput');

function updateInputVar(){
    maxParticleInScene == parseInt(tailLenghtInput.innerHTML());
    requestAnimationFrame(updateInputVar);
}
updateInputVar();
