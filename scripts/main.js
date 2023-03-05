/* Scrolling if Windows too small variables */
let translateXvalue = 0;
let contWidth = document.getElementById("icon_container").offsetWidth;
let isMouse = true;

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    document.getElementById("favicon").href = "images/icon_light_mode.png";
    document.getElementById("icon_container").style.backgroundColor = "rgb(206, 206, 206)";
}

let wallpElem = document.getElementById("picsumImg");
let changedWallp = "url(" + window.localStorage.getItem("imgsetSave") + ")";
let changedWallpPreview = window.localStorage.getItem("imgsetSave");

if (window.localStorage.getItem("imgsetSave") == "nothing" || null || "") {
    document.body.style.backgroundImage = "url(https://picsum.photos/1920/1080)";
    document.getElementsByClassName("setting_showname_string")[0].innerHTML = "Picsum Photos (Dynamisch)";
} else {
    document.getElementsByClassName("setting_showname_string")[0].innerHTML = "Benutzerdefiniert: " + window.localStorage.getItem("imgsetSave");
}


if (window.localStorage.getItem("imgsetSave") !== "nothing" || null || "") {
    document.body.style.backgroundImage = changedWallp;
    for (i = 0; i < document.getElementsByClassName("setting_preview_img").length; i++) {
        document.getElementsByClassName("setting_preview_img")[i].src = changedWallpPreview;
    }
}

setTimeout(() => {
    if (wallpElem.complete === false || wallpElem.naturalWidth === 0) {
        picsumintErr();
    }
}, 4000);

function backgroundfunction() {
    setTimeout(function () { document.getElementsByClassName("wallpaperanim")[0].style.animationPlayState = "running"; }, 100);

}

function picsumintErr() {
    document.body.style.backgroundImage = "url(images/no_con_wallpaper.jpg)"
    for (i = 0; i < document.getElementsByClassName("setting_preview_img").length; i++) {
        document.getElementsByClassName("setting_preview_img")[i].src = "images/no_con_wallpaper.jpg";
    }
    backgroundfunction();
}

function intErr() {
    document.getElementById("netErrIcon").style.display = "block";
}

let f5isPressed = false;

window.onkeydown = function (e) {
    if (e.keyCode == 116) {
        e.preventDefault();
        e.stopPropagation();

        if (!f5isPressed) {
            smoothReload();
        }

    }
}

function smoothReload() {
    f5isPressed = true;
    document.getElementsByClassName("wallpaperanim")[0].style.animation = "none";
    setTimeout(function () {
        document.getElementsByClassName("wallpaperanim")[0].style.animation = "bgimganimation 600ms running linear reverse";
        for (i = 0; i < document.getElementsByClassName("widget").length; i++) {
            document.getElementsByClassName("widget")[i].style.animation = "widgetfadeout 200ms linear forwards";
            document.getElementsByClassName("widget")[i].style.animationPlayState = "running";
        }
        setTimeout(function () { window.location.reload() }, 575);
    }, 60);
}

let dragging = false;
let dragobj = null;
let dragOffsetX = 0;
let dragOffsetY = 0;

function createWidget(eve, obj, num) {
    document.getElementById("widget_section").innerHTML += document.getElementsByClassName("datawidget")[num].innerHTML;
    dragobj = document.getElementsByClassName("widget")[document.getElementsByClassName("widget").length - 1];
    dragging = true;
    dragOffsetX = eve.clientX - obj.offsetLeft - translateXvalue + dragobj.offsetWidth / 2.5;
    dragOffsetY = eve.clientY - obj.offsetTop + dragobj.offsetHeight / 3.5;
    dragobj.style.left = eve.clientX - dragOffsetX;
    dragobj.style.top = eve.clientY - dragOffsetY;

    dragobj.style.animationPlayState = "running";
    disableAnim(dragobj);

    for (i = 0; i < document.getElementsByClassName("widget").length; i++) {
        document.getElementsByClassName("widget")[i].style.zIndex = "1";
    }
    dragobj.style.zIndex = "3";
    for (i = 0; i < document.getElementsByClassName("widget").length; i++) {
        document.getElementsByClassName("widget")[i].style.boxShadow = "rgba(0, 0, 0, 0.75) 0 0 10px";
    }
    dragobj.style.boxShadow = "rgba(0, 0, 0, 0.75) 0 0 18px";

    for (i = 0; i < document.getElementsByClassName("editor_input").length; i++) {
        document.getElementsByClassName("editor_input")[i].value = window.localStorage.getItem("editor_value");
    }
}

function disableAnim(oject) {
    setTimeout(() => {
        oject.style.animation = "none";
        oject.style.animationPlayState = "paused";
    }, 300);
}

function dragme(eve, obj) {
    dragobj = obj;
    dragging = true;
    dragOffsetX = eve.clientX - obj.offsetLeft;
    dragOffsetY = eve.clientY - obj.offsetTop;
    for (i = 0; i < document.getElementsByClassName("widget").length; i++) {
        document.getElementsByClassName("widget")[i].style.zIndex = "1";
    }
    dragobj.style.zIndex = "3";
    for (i = 0; i < document.getElementsByClassName("widget").length; i++) {
        document.getElementsByClassName("widget")[i].style.boxShadow = "rgba(0, 0, 0, 0.75) 0 0 10px";
    }
    dragobj.style.boxShadow = "rgba(0, 0, 0, 0.75) 0 0 18px";

    for (i = 0; i < document.getElementsByClassName("teaser__link").length; i++) {
    
        if (document.getElementsByClassName("teaser__link")[i].href == "file://wetter.tagesschau.de/deutschland/") {
            document.getElementsByClassName("teaser__link")[i].href = "https://wetter.tagesschau.de/deutschland/";
        }
    }
}

window.onmousemove = function (e) {
    if (dragging) {
        dragobj.style.left = e.clientX - dragOffsetX;
        dragobj.style.top = e.clientY - dragOffsetY;
    }
    if (dragging && e.clientY < 100) {
        document.getElementById("icon_link_open").style.zIndex = 2;
        document.getElementById("icon_link_open").style.opacity = 1;
    } else {
        document.getElementById("icon_link_open").style.zIndex = 0;
        document.getElementById("icon_link_open").style.opacity = 0;
    }
}

window.onmouseup = function (e) {
    if (e.clientY < 100 && dragging) {
        if (e.button == 1) {
            window.open(dragobj.getElementsByClassName("wid_navigator")[0].value);
            dragobj.style.display = "none";
            document.getElementById("icon_link_open").style.zIndex = 0;
            document.getElementById("icon_link_open").style.opacity = 0;
        } else {
            if (e.clientY < 1) {
                window.open(dragobj.getElementsByClassName("wid_navigator")[0].value);
                dragobj.style.display = "none";
                document.getElementById("icon_link_open").style.zIndex = 0;
                document.getElementById("icon_link_open").style.opacity = 0;
            } else {
                location.assign(dragobj.getElementsByClassName("wid_navigator")[0].value);
            }
        }
    }
    if (e.button == 1) {
        if (e.target.classList.contains("columns") || e.target.classList.contains("teaser__shorttext") || e.target.classList.contains("teaser__label") || e.target.classList.contains("teaser__topline") || e.target.classList.contains("teaser__headline")) {
            dragging = false;
            dragobj = null;
            return false;
        } else {
            dragobj.style.display = "none";
        }
    }
    if (dragging && dragobj.getElementsByClassName("maininput")[0]) {
        dragobj.getElementsByClassName("maininput")[0].focus();
    }
    dragging = false;
    dragobj = null;
}

let sec_deg = 0;
let min_deg = 0;
let hou_deg = 0;
let sec_deg_smooth;
let seconds_smooth;
let time_smooth;

time_smooth = new Date();
seconds_smooth = time_smooth.getSeconds();
sec_deg_smooth = seconds_smooth * 6 + 90;

setInterval(() => {
    time_smooth = new Date();
    seconds_smooth = time_smooth.getSeconds();
    sec_deg_smooth = seconds_smooth * 6 + 90;
}, 1000);

setInterval(() => {
    sec_deg_smooth += 0.075;
    for (i = 0; i < document.getElementsByClassName("sekundenzeiger").length; i++) {
        document.getElementsByClassName("sekundenzeiger")[i].style.transform = 'rotate(' + sec_deg_smooth + 'deg)';
    }
}, 12.5);

/* Load Clock and orientate, on first load */
clock_load_time();

setInterval(function () {
    clock_load_time();
}, 500)

function clock_load_time() {
    let time = new Date();

    let houre = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    let houre_display = houre.toString();
    let minutes_display = minutes.toString();
    let seconds_display = seconds.toString();

    if (houre_display.length < 2) {
        houre_display = "0" + houre_display;
    }
    if (minutes_display.length < 2) {
        minutes_display = "0" + minutes_display;
    }
    if (seconds_display.length < 2) {
        seconds_display = "0" + seconds_display;
    }

    for (i = 0; i < document.getElementsByClassName("clock_display_b").length; i++) {
        document.getElementsByClassName("clock_display_b")[i].innerHTML = houre_display + ":" + minutes_display + ":" + seconds_display;
    }

    hou_deg = houre * 30 + minutes * 0.5 + 90;
    min_deg = minutes * 6 + 90;
    /* sec_deg = seconds * 6 + 90; */

    for (i = 0; i < document.getElementsByClassName("stundenzeiger").length; i++) {
        document.getElementsByClassName("stundenzeiger")[i].style.transform = 'rotate(' + hou_deg + 'deg)';
    }
    for (i = 0; i < document.getElementsByClassName("minutenzeiger").length; i++) {
        document.getElementsByClassName("minutenzeiger")[i].style.transform = 'rotate(' + min_deg + 'deg)';
    }
}

let wikiStrings = ["Wiki", "United States", "Dog", "Search", "Eminem", "Steve Jobs", "Animal", "Star Wars", "Elon Musk", "Cat", "Dolphin", "Religion", "Relativity", "Deutschland", "England", "America", "Minecraft", "Nyancat", "Kollosseum", "JavaScript", "This is", "God", "Duden", "New York", "Boston", "California", "TheJoCraft", "Paris", "Pisa", "Eifelturm", "Restaurant", "BastiGHG", "Alec", "Benjamin", "Alec Benjamin"];

let wikiLeft = []; let wikiTop = [];
let wikiText = []; let wikiSpd = [];

setInterval(function () {
    wikibackground = document.getElementsByClassName("wiki_canvas");

    if (Math.random() < 0.03 && wikiText.length < 10) {
        wikiLeft.push(-50 + Math.random() * 470);
        wikiTop.push(275);
        wikiText.push(wikiStrings[Math.round(Math.random() * (wikiStrings.length - 1))]);
        wikiSpd.push(0.5 + Math.random());
    }

    tmpoff = 0;
    while (tmpoff < wikiText.length) {
        wikiTop[tmpoff] -= wikiSpd[tmpoff];
        if (wikiTop[tmpoff] < -10) {
            wikiText.splice(tmpoff, 1);
            wikiTop.splice(tmpoff, 1);
            wikiLeft.splice(tmpoff, 1);
            wikiSpd.splice(tmpoff, 1);
        } else {
            tmpoff++;
        }
    }

    for (i = 0; i < wikibackground.length; i++) {
        let canvas = wikibackground[i];
        let ctx = canvas.getContext("2d");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, 420, 275);
        ctx.fillStyle = "#d8d8d8";
        ctx.font = '20px arial';
        for (j = 0; j < wikiText.length; j++) {
            ctx.fillText(wikiText[j], wikiLeft[j], wikiTop[j]);
        }
    }
}, 16);

setInterval(() => {
    if (document.getElementById("easteregg").value == "easteregg") {
        document.getElementById("easteregg").value = "";
        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    }
}, 1000);

/* Cookies Section */

let wallpTemp = "";

/* Save Wallpaper */

function settingPreview() {
    for (i = 0; i < document.getElementsByClassName("setting_preview_img").length; i++) {
        document.getElementsByClassName("setting_preview_img")[i].src = wallpTemp;
    }

    for (i = 0; i < document.getElementsByClassName("setting_save_btn").length; i++) {
        document.getElementsByClassName("setting_save_btn")[i].style.display = "flex";
    }
}

async function settingPreviewCopied() {
    const text = await navigator.clipboard.readText();
    wallpTemp = text.toString();

    console.log(wallpTemp);

    for (i = 0; i < document.getElementsByClassName("setting_preview_img").length; i++) {
        document.getElementsByClassName("setting_preview_img")[i].src = wallpTemp;
    }

    for (i = 0; i < document.getElementsByClassName("setting_save_btn").length; i++) {
        document.getElementsByClassName("setting_save_btn")[i].style.display = "flex";
    }
}

function settingSave() {
    window.localStorage.setItem("imgsetSave", wallpTemp);
    smoothReload();
}

function settingReset() {
    window.localStorage.setItem("imgsetSave", "nothing");
    smoothReload();
}

/* Editor Section */

let editor_valueof = "";

function editor_save() {
    window.localStorage.setItem("editor_value", editor_valueof);

    for (i = 0; i < document.getElementsByClassName("editor_input").length; i++) {
        document.getElementsByClassName("editor_input")[i].value = window.localStorage.getItem("editor_value");
    }
}

/* If Windows to small: Scrolling left and right */

document.getElementById("icon_container").addEventListener("wheel", event => {
    const delta = Math.sign(event.deltaY);
    contWidth = document.getElementById("icon_container").offsetWidth;

    if (event.deltaY > 90 || event.deltaY < -90) {
        isMouse = true;
    } else {
        isMouse = false;
    }

    if (isMouse) {
        document.getElementById("icon_container").style.transitionDuration = "350ms";
    } else {
        document.getElementById("icon_container").style.transitionDuration = "0ms";
    }

    if (contWidth > document.body.offsetWidth) {
        if (delta == 1) { /* Mausrad \/ */
            translateXvalue = translateXvalue + event.deltaY;
            if (translateXvalue > 0) {
                translateXvalue = 0;
            }
            document.getElementById("icon_container").style.transform = "translateX(" + translateXvalue + "px)";
        } else { /* Mausrad /\ */
            translateXvalue = translateXvalue + event.deltaY;
            let valueminus = -Math.abs(contWidth - document.body.offsetWidth);
            if (translateXvalue < valueminus) {
                translateXvalue = valueminus;
            }
            document.getElementById("icon_container").style.transform = "translateX(" + translateXvalue + "px)";
        }
    };
});

window.addEventListener("resize", function resize() {
    translateXvalue = 0;
    document.getElementById("icon_container").style.transitionDuration = "350ms";
    document.getElementById("icon_container").style.transform = "translateX(" + translateXvalue + "px)";
})

/* Tagesschau */
tagesschau_load();

function tagesschau_load() {
    let request = new XMLHttpRequest();
    request.open("GET", "https://www.tagesschau.de/", true);
    request.onload = () => {
        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(request.responseText, "text/html");

        let link_parser = xmlDoc.getElementsByClassName("teaser teaser--small");

        for (let i = 0; i < link_parser.length; i++) {
            document.getElementsByClassName("tagesschau_widget_main")[0].innerHTML += link_parser[i].innerHTML;
        };
    }
    request.send();
}

document.body.onmousedown = (e) => {
    if (e.button === 1) {
        e.preventDefault();
        return false;
    }
}