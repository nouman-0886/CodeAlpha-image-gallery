const main = document.querySelector(".containor");
const images = document.querySelectorAll(".containor img");
const viewBox = document.querySelector('.view-box');
const bigImage = document.querySelector('.big-image');
const closeBtn = document.querySelector(".close-btn");
const nextBtn = document.querySelector(".next");
const previewBtn = document.querySelector(".preview");
const card = document.querySelector(".card");
const parentItems = document.querySelectorAll(".parent-li");
const head = document.querySelector(".main-head");
const searchInput = document.querySelector(".search input");
const seachBtn = document.querySelector(".search img");
const menu = document.querySelector(".hamburger img");



const navbar = document.querySelector(".navbar");
const closeNav = document.querySelector(".close-nav");


menu.addEventListener('click', () => {
    navbar.style.transform = "translateX(0px)"; // Moves menu into view
    closeNav.style.display = "block";
});

closeNav.addEventListener('click', () => {
    navbar.style.transform = "translateX(100%)"; // Slides menu back out of view
    closeNav.style.display = "none"; // Hides the close button again
});



seachBtn.addEventListener('click', filterGallery);
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        filterGallery(); // Added parentheses to execute the function
    }
});



parentItems.forEach((item) => {
    item.addEventListener('click', (e) => {

        smallWidth();


        searchInput.value = "";

        const filterValue = item.dataset.filter;

        const cards = document.querySelectorAll(".card");

        cards.forEach((card) => {

            const category = card.dataset.category;
            if ((filterValue === category)) {
                head.textContent = `${category} Gallery`;
                card.classList.remove("hide");
            }
            else {
                card.classList.add("hide");
            }
        })
        return;
    });
})

let currentIndex = 0;

images.forEach((img, index) => {

    img.addEventListener('click', () => {


        card.style.transform = "scale(1)";
        // 3. Run the animation
        createAnimation(0, 1, 700);

        currentIndex = index;
        bigImage.src = images[currentIndex].src;

        viewBox.style.display = "flex";
        main.style.filter = 'blur(3px)';
    })
})

//Next image

nextBtn.addEventListener("click", nextImage);
document.addEventListener('keydown', (e) => {
    if (e.key === "ArrowRight") {
        nextImage();
    }

})


previewBtn.addEventListener("click", prviousImage);
document.addEventListener('keydown', (e) => {
    if (e.key === "ArrowLeft") {
        prviousImage();
    }

})




closeBtn.addEventListener("click", closeFun);

viewBox.addEventListener("click", function (e) {
    // console.log(e.target.className);

    if (e.target.className === "view-box") {
        closeFun();
    }
});


let clientWidth = document.documentElement.clientWidth;
function smallWidth() {
    // Correctly get the current browser width
    const currentWidth = window.innerWidth;

    if (currentWidth <= 600) {
        navbar.style.transform = "translateX(100%)"; // Hide menu on small screens
        closeNav.style.display = "none";
        console.log("Mobile view active: menu hidden");
    } else {
        navbar.style.transform = "translateX(0px)"; // Keep menu visible on desktop screens
        closeNav.style.display = "none";
    }
}


function filterGallery() {

    nextBtn.style.display = "none";
    previewBtn.style.display = "none";

    smallWidth();


    let inputValue = searchInput.value.replace(/[^A-Za-z]/g, "");

    let capitalInput =
        inputValue.charAt(0).toUpperCase() +
        inputValue.slice(1);

    const cards = document.querySelectorAll(".card");

    let match = false;

    cards.forEach((card) => {

        const category = card.dataset.category;

        if (
            capitalInput.toLowerCase().trim()
            ==
            category.toLowerCase().trim()
        ) {

            head.textContent = `${category} Gallery`;

            card.classList.remove("hide");

            match = true;

        }

        else {

            card.classList.add("hide");

        }

    });


    if (!match) {
        head.textContent = `"${capitalInput}" not found`;
    }
    searchInput.value = "";
};

function nextImage() {

    createAnimation(0.7, 1, 1200);
    currentIndex++;

    if (currentIndex >= images.length) {
        currentIndex = 0;
    };
    bigImage.src = images[currentIndex].src;
};


function prviousImage() {

    createAnimation(0.7, 1, 1200);
    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    };

    bigImage.src = images[currentIndex].src;
};



function closeFun() {
    setTimeout(() => {
        viewBox.style.display = "none";
    }, 700);
    createAnimation(1, 0, 700);
    main.style.filter = "none";
}

function createAnimation(startOpacity, endOpacity, time) {
    // 1. Define the sequence of states (keyframes)
    const keyframes = [
        { opacity: startOpacity }, // Start
        { opacity: endOpacity } // End
    ];

    // 2. Define the timing options
    const options = {
        duration: time,      // Time in milliseconds
        iterations: 1,       // How many times to repeat
        easing: "ease-out",  // Timing function (e.g., 'linear', 'ease-in-out')
        fill: "forwards"     // Keeps the final state after the animation ends
    };
    return viewBox.animate(keyframes, options);
}
