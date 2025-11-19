const path = document.getElementById("navPath");
const dot = document.getElementById("dot");
const waypoints = document.querySelectorAll(".waypoint");

// Position each waypoint on the curve
waypoints.forEach((wp, index) => {
    let pos = Number.parseFloat(wp.dataset.pos);
    let length = path.getTotalLength() * pos;
    let point = path.getPointAtLength(length);
    wp.setAttribute("cx", point.x);
    wp.setAttribute("cy", point.y);
    
    // Position the text slightly right of the circle
    const label = document.getElementById(`wp${index + 1}Label`);
    if (index == 2) {
        label.setAttribute("x", point.x - 125);  // 15px to the right
        label.setAttribute("y", point.y + 4);   // vertically centered

    }
    else {
        label.setAttribute("x", point.x + 15);  // 15px to the right
        label.setAttribute("y", point.y + 4);   // vertically centered
    }
    label.addEventListener("click", () => moveDotTo(length));
    wp.addEventListener("click", () => moveDotTo(length));
    const targetId = wp.dataset.target;
    wp.addEventListener("click", () => {
        document.getElementById(targetId).scrollIntoView({
            behavior: "smooth"
        });
    });
    label.addEventListener("click", () => {
        document.getElementById(targetId).scrollIntoView({
            behavior: "smooth"
        });
    });


});

const heroSections = document.querySelectorAll(".hero");
const positions = [...waypoints].map(wp => parseFloat(wp.dataset.pos));

// Observe hero visibility
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const index = [...heroSections].indexOf(entry.target);
            const targetLength = path.getTotalLength() * positions[index];
            moveDotTo(targetLength);
        }
    });
}, {
    threshold: 0.6  // section must be 60% visible
});

// Watch each hero section
heroSections.forEach(sec => observer.observe(sec));

let current = 0; // where the dot is now
let target = 0;
const first = waypoints[0];
dot.setAttribute("cx", first.getAttribute("cx"));
dot.setAttribute("cy", first.getAttribute("cy"));
current = path.getTotalLength() * Number(first.dataset.pos);

function moveDotTo(lenTarget) {
    target = lenTarget;
    animate();
}

function animate() {
    if (Math.abs(target - current) < 1) return;

    current += (target - current) * 0.06; // smooth easing

    let pt = path.getPointAtLength(current);
    dot.setAttribute("cx", pt.x);
    dot.setAttribute("cy", pt.y);

    requestAnimationFrame(animate);
}