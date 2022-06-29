const canvas = document.getElementById("canvas1");
const c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let hue = 0;
let hsl = "";

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
            this.radius -= 0.1;
        }
    }
}

function update(){
    refrech();
    particles.forEach(particle => {
        
    });
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
            console.log(distance);

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
        

        if(particles[i].radius <= 0.3){
            particles.splice(i, 1);
            i--;
        }

        
    }

    hue++;
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
    c.fillStyle = 'rgb(0, 0, 0)';
    c.fillRect(0, 0, canvas.width, canvas.height);
    
}



