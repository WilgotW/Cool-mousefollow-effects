const canvas = document.getElementById("canvas1");
const c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let hue = 0;
let scale = "";
let colorCode;

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
    }
    draw(){
        c.fillStyle = 'red';
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
    particles.forEach(particle => {
        
    });
    for(i = 0; i < particles.length; i++){
        particles[i].draw();
        particles[i].update();
        if(particles[i].radius <= 0.3){
            particles.splice
        }
    }
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
    
    hue++;
    particles.push(new Particle(mouse.x, mouse.y, hue));
})



function refrech(){
    // hue++;
    // scale = hue.toString() + '%';
    
    // if(hue >= 360){
    //     hue = 0;
    // }

    c.fillStyle = 'rgba(0, 0, 0, 0.02)';
    c.fillRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(refrech);
}
refrech();


