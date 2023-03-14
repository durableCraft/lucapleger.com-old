/* Main JS for lucapleger.com/projects */

/* Initial Check for window size */
dimensionchanges();

window.addEventListener("resize", dimensionchanges);

function dimensionchanges() {
    if (window.innerHeight <= 607) {
        document.getElementById("footer").style.opacity = 0;

        document.getElementById("notification_msg").innerHTML = "Please mind window-size for best experience!"
        document.getElementById("notification").style.display = "flex";
        document.getElementById("notification").style.animationPlayState = "running";

        setTimeout(() => {
            document.getElementById("notification").style.display = "none";
            document.getElementById("notification").style.animationPlayState = "paused";
        }, 5100);
    } else {
        document.getElementById("footer").style.opacity = 1;
    }

    if (window.innerWidth <= 1005) {
        document.getElementById("notification_msg").innerHTML = "Please mind window-size for best experience!"
        document.getElementById("notification").style.display = "flex";
        document.getElementById("notification").style.animationPlayState = "running";

        document.getElementById("btn_about").style.opacity = 0;
        document.getElementById("btn_github").style.opacity = 0;

        setTimeout(() => {
            document.getElementById("notification").style.display = "none";
            document.getElementById("notification").style.animationPlayState = "paused";
        }, 5100);

        setTimeout(() => {
            document.getElementById("btn_about").style.display = "none";
            document.getElementById("btn_github").style.display = "none";
        }, 400);
    } else {
        document.getElementById("btn_about").style.opacity = 1;
        document.getElementById("btn_github").style.opacity = 1;

        setTimeout(() => {
            document.getElementById("btn_about").style.display = "block";
            document.getElementById("btn_github").style.display = "block";
        }, 400);
    }

    if (window.innerWidth < 500) {
        document.getElementById("buttons_div_header").style.width = "136px";

        let main_projects_prev = document.getElementsByClassName("main_projects_prev");

        for (let index = 0; index < main_projects_prev.length; index++) {
            main_projects_prev[index].style.marginBottom = "150px";
        }
    } else {
        document.getElementById("buttons_div_header").style.width = "fit-content";

        let main_projects_prev = document.getElementsByClassName("main_projects_prev");

        for (let index = 0; index < main_projects_prev.length; index++) {
            main_projects_prev[index].style.marginBottom = "50px";
        }
    }
}

/* Stars generating */
function randomInt(max) {
    return Math.floor(Math.random() * max);
}

function createStars(width, height, spacing) {
    const stars = [];

    for (let x = 0; x < width; x += spacing) {
        for (let y = 0; y < height; y += spacing) {
            const star = {
                x: x + randomInt(spacing),
                y: y + randomInt(spacing),
                r: Math.random() * maxStarRadius
            };
            stars.push(star);
        }
    }
    return stars;
}

function fillCircle(ctx, x, y, r, fillStyle) {
    ctx.beginPath();
    ctx.fillStyle = fillStyle;
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
}

function render() {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
    stars.forEach(function (star, i) {
        const x = star.x;
        const y = star.y;
        fillCircle(ctx, x, y, star.r, `rgba(255, 255, 255, 0.1`);
    });

    requestAnimationFrame(render);
}

const backgroundColor = "rgba(5, 30, 68, 0)";
const width = window.innerWidth;
const height = window.innerHeight;
const maxStarRadius = 1.3;
const minStarOpacity = 0.1;
const maxStarOpacity = 0.7;
const stars = createStars(width, height, 50);

const canvas = document.querySelector("#main_background");
const ctx = canvas.getContext("2d");
canvas.width = width;
canvas.height = height;

render();

/* Fadeout animation */

function triggerfadeout() {
    document.getElementById("main_background").style.animationPlayState = "running";
}

function gethome() {
    triggerfadeout()

    setTimeout(() => {
        window.location.href = "../";
    }, 1800);
}

function getprojects() {
    /* Nothing should happten because you are at projects page */
}

function getabout() {
    triggerfadeout()

    setTimeout(() => {
        window.location.href = "about/";
    }, 1800);
}

function getgithub() {
    triggerfadeout()

    setTimeout(() => {
        window.location.href = "https://github.com/durableCraft";
    }, 1800);
}

/* arrow disappear on scroll */

function arrowdisappear() {
    document.getElementById("footer").style.opacity = 0;
    setTimeout(() => {
        document.getElementById("footer").style.display = "none";
    }, 1000);
}

function scrolldown() {
    document.getElementById("main").scrollBy({ top: 500, left: 0, behavior: "smooth" })
}