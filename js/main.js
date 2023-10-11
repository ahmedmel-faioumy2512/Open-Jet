// Up Button
let upSpan = document.querySelector(".up");

window.onscroll = function (){
    this.scrollY >= 1000 ? upSpan.classList.add("show") : upSpan.classList.remove("show");
};

upSpan.onclick = function (){
    window.scrollTo ({
        top: 0,
        behavior: "smooth",
    })
};


//Settings Toggle
document.querySelector(".toggle-settings .fa-cog").onclick = function (){
    this.classList.toggle("fa-spin");

    document.querySelector(".settings").classList.toggle("open");
};

//check if local storage is empty or not
let mainColor = localStorage.getItem("color_option");
if (mainColor !== null) {
    document.documentElement.style.setProperty('--primary-color', mainColor);
    // remove active class from list
    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active");
        // add active class to list
        if(element.dataset.color === mainColor){
            element.classList.add("active");
        }
    });
}

// Random BG option
let backgroundOption = true;
// Interval controler
let backgroundInterval;

//check if local storage is empty or not
let bgLocalStorage = localStorage.getItem("background_option");
if (bgLocalStorage !== null) {
    if (bgLocalStorage === 'true'){
        backgroundOption = true;
    } else {
        backgroundOption = false;
    }
    // remove active
    document.querySelectorAll(".options span").forEach(element => {
        element.classList.remove("active");
    });

    if(bgLocalStorage === 'true'){
        document.querySelector(".options .yes").classList.add("active");
    } else {
        document.querySelector(".options .no").classList.add("active");
    }
}

//Change color
const colorList = document.querySelectorAll(".colors-list li");
colorList.forEach(li => {
    li.addEventListener("click", (e) => {
        // set color on site
        document.documentElement.style.setProperty('--primary-color', e.target.dataset.color);
        // set color on local ST
        localStorage.setItem("color_option", e.target.dataset.color);
        // remove Active class from All 
        // e.target.parentElement.querySelectorAll(".active").forEach(element => {
        //     element.classList.remove("active");
        // });
        // // Add active Class
        // e.target.classList.add("active");
        handleActive(e);
    });
});

//Change BG Random option
const randomBg = document.querySelectorAll(".random-bg span");
randomBg.forEach(span => {
    span.addEventListener("click", (e) => {
        // // remove Active class from All spans
        // e.target.parentElement.querySelectorAll(".active").forEach(element => {
        //     element.classList.remove("active");
        // });
        // // Add active Class
        // e.target.classList.add("active");
        handleActive(e);

        if (e.target.dataset.bg === 'yes') {
            // console.log("yes");
            backgroundOption = true;
            randomBgImg();
            localStorage.setItem("background_option", true);
        } else {
            // console.log("no");
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option", false);
        }
    });
});

// Select Elements
let laningPage = document.querySelector(".landing-page");
// Images Slider
let imgsArray = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg",];

// change BG function
function randomBgImg(){
    if(backgroundOption === true) {
        backgroundInterval = setInterval(() => {
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
            laningPage.style.backgroundImage = 'url("images/' + imgsArray[randomNumber] + '")' ;
        }, 3000);
    }
};

randomBgImg();

// Difin Skills Selectors
let ourSkills = document.querySelector(".Skills");
let progSpans = document.querySelectorAll(".skill-prog span");

window.onscroll = function(){
    if(window.scrollY >= ourSkills.offsetTop){
        progSpans.forEach((span) => {
            span.style.width = span.dataset.progress;
        })
    }
};


// window.onscroll = function () {
//     // Skills Offset Top
//     let skilloffsetTop = ourSkills.offsetTop;
//     this.console.log(skilloffsetTop);
//     // Skills outer Height
//     let skillOuterHight = ourSkills.offsetHeight;
//     // // Window Height
//     let windowHeight = this.innerHeight;
//     // //window ScrollTop
//     let windowScrollTop = this.pageYOffse
//     if (windowScrollTop > (skilloffsetTop + skillOuterHight - windowHeight)) {
//         let allSkills = document.querySelectorAll(".skills .skill-box .skill-prog span");
//         allSkills.forEach(skill => {
//             skill.style.width = skill.dataset.progress;
//         });

//     }
// };

// Create Popup with Image
let ourGallary = document.querySelectorAll(".gallary img");
ourGallary.forEach(img => {
    img.addEventListener('click', (e) => {
        //Create OverLay
        let OverLay = document.createElement("div");
        // Add Class To Overlay
        OverLay.className = 'popup-overlay';
        // Append OverLay To Body
        document.body.appendChild(OverLay);
        //Create Popup Box and Add class
        let popupBox = document.createElement("div");
        popupBox.className = 'popup-box';

        if (img.alt !== null) {
            // create Heading and Text and append it
            let imgHeading = document.createElement("h3");
            let imgText = document.createTextNode(img.alt);
            imgHeading.appendChild(imgText);
            popupBox.appendChild(imgHeading);

        }

        // Create Imge and Set Source
        let popupImage = document.createElement("img");
        popupImage.src = img.src;
        popupBox.appendChild(popupImage);
        // Append Img To Body
        document.body.appendChild(popupBox);

        // Create Span
        let closeButton = document.createElement("span");
        let closeButtonText = document.createTextNode("X");
        closeButton.appendChild(closeButtonText);
        closeButton.className = 'close-button';
        popupBox.appendChild(closeButton);
    });
});

// Close Popup
document.addEventListener("click", function (e) {
    if (e.target.className == 'close-button') {
        e.target.parentNode.remove();
        document.querySelector(".popup-overlay").remove();
    }
});

//select all bullets element
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
allBullets.forEach(bullet => {
    bullet.addEventListener("click", (e) => {
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

//select all bullets Links
const allLinks = document.querySelectorAll(".links a");
allLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

//Handle Active Functions
function handleActive (ev) {
    // remove Active class from All 
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });
    // Add active Class
    ev.target.classList.add("active");
}

// select Bullets Options
let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletItem = localStorage.getItem("bullets_option");

if (bulletItem !== null) {
    bulletsSpan.forEach(span => {
        span.classList.remove("active");
    });

    if (bulletItem === 'block') {
        bulletsContainer.style.display = 'block';
        document.querySelector(".bullets-option .yes").classList.add("active");
    } else {
        bulletsContainer.style.display = 'none';
        document.querySelector(".bullets-option .no").classList.add("active");
    }
}

bulletsSpan.forEach(span => {
    span.addEventListener("click", (e) => {
        if (span.dataset.display === 'yes') {
            bulletsContainer.style.display = 'block';
            localStorage.setItem("bullets_option", 'block');
        } else {
            bulletsContainer.style.display = 'none';
            localStorage.setItem("bullets_option", 'none');
        }
        handleActive(e);
    });
});

document.querySelector(".reset-option").onclick = function () {
    // localStorage.clear();
    localStorage.removeItem("bullets_option");
    localStorage.removeItem("color_option");
    localStorage.removeItem("background_option");
    window.location.reload();
};

// Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu");
let theLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
    e.stopPropagation();
    this.classList.toggle("menu-active");
    theLinks.classList.toggle("open");
};

// Click Anywhere to Toggle Menu-Btn
document.addEventListener("click", (e) => {
    if (e.target !== toggleBtn && e.target !== theLinks) {
        if (theLinks.classList.contains("open")) {
            toggleBtn.classList.toggle("menu-active");
            theLinks.classList.toggle("open");
        }
    }
});

// stop propagation om menu 
theLinks.onclick = function (e) {
    e.stopPropagation();
}