// 🚀 START
document.addEventListener('DOMContentLoaded', () => {
    initWebNetwork();
    initSkillsOrbit();
    initScrollReveal();
});


// 🌌 WEB NETWORK (NO MOUSE)
function initWebNetwork() {
    const canvas = document.getElementById('web-canvas');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.2 + 0.5,
            vx: (Math.random() - 0.5) * 0.2,
            vy: (Math.random() - 0.5) * 0.2,
            isRed: Math.random() > 0.5
        });
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;

            for (let j = i + 1; j < particles.length; j++) {
                let p2 = particles[j];
                const dist = Math.hypot(p.x - p2.x, p.y - p2.y);

                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);

                    const opacity = 1 - (dist / 120);
                    ctx.strokeStyle = p.isRed 
                        ? `rgba(255, 42, 42, ${opacity * 0.2})`
                        : `rgba(0, 210, 255, ${opacity * 0.2})`;

                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.isRed 
                ? 'rgba(255, 42, 42, 0.5)' 
                : 'rgba(0, 210, 255, 0.5)';
            ctx.fill();
        }

        requestAnimationFrame(draw);
    }

    draw();
}


// 🧠 SKILLS ORBIT
function initSkillsOrbit() {
    const nodes = document.querySelectorAll('.skill-node');
    let time = 0;

    function renderOrbit() {
        time += 1;

        nodes.forEach(node => {
            const radius = parseFloat(node.getAttribute('data-radius'));
            const speed = parseFloat(node.getAttribute('data-speed'));
            const startAngle = parseFloat(node.getAttribute('data-angle'));

            const currentAngle = (startAngle * Math.PI / 180) + (time * speed);

            const x = Math.cos(currentAngle) * radius;
            const y = Math.sin(currentAngle) * radius;

            node.style.left = `calc(50% + ${x}px)`;
            node.style.top = `calc(50% + ${y}px)`;
            node.style.transform = `translate(-50%, -50%)`;
        });

        requestAnimationFrame(renderOrbit);
    }

    renderOrbit();
}


// 🔥 SCROLL REVEAL
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    function revealOnScroll() {
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;

            if (elementTop < windowHeight - 100) {
                el.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
}


// 🤖 LOADER FIX (SAFE VERSION)
setTimeout(() => {
    const loader = document.getElementById("loader");
    if (loader) {
        loader.style.display = "none";
    }
}, 2000);