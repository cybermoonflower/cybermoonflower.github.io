/* ========== AUTOMATE: LOG STYLING  ======== */

document.addEventListener("DOMContentLoaded", function() {
  var list = document.getElementById('logList');
  var listItems = list.getElementsByTagName('li');

  for (var i = 0; i < listItems.length; i++) {
    
    var item = listItems[i];
    
    var matches = item.textContent.match(/^(\d{6})\s+(\S+)\s+(.*)$/);

    if (matches && matches.length === 4) {
      var date = matches[1];
      var category = matches[2];
      var description = matches[3];

      item.innerHTML = '<span class="color">' + date + ':.....</span> [' + category + ']: ' + description ;
    }
  }
});

/* ========== THEME SWITCH ======== */

const currentTheme = localStorage.getItem("theme");
const themes = document.querySelectorAll(".theme");
const themeButton = document.getElementById("themeSelect");

// Set theme from local storage
if (currentTheme) {
   document.documentElement.setAttribute('data-theme', currentTheme);
}

    // Toggle and set to local storage
    themeButton.addEventListener("click", function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    let newTheme;

    if (currentTheme === 'root') {
        newTheme = 'moonlight';
    } else {
        newTheme = 'root';
    }
    document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });

/* ========== EXPAND VIEW  ======== */

document.addEventListener("DOMContentLoaded", function() {
    const contentDiv = document.getElementById("background-container");
    const toggleButton = document.getElementById("fullScreen");
    const classStateInput = document.getElementById("classState");

    // Toggle between classes and set input value + local storage
    function toggleClasses() {
        if (contentDiv.classList.contains("background")) {
            contentDiv.classList.remove("background");
            contentDiv.classList.add("background-min");
            classStateInput.value = "background-min";
            localStorage.setItem("classState", "background-min");
        } else {
            contentDiv.classList.remove("background-min");
            contentDiv.classList.add("background");
            classStateInput.value = "background";
            localStorage.setItem("classState", "background");
        }
    }

    toggleButton.addEventListener("click", function() {
        toggleClasses();
    });

    // Retrieve class state from localStorage
    const storedClassState = localStorage.getItem("classState");
    if (storedClassState) {
        contentDiv.classList.remove("background", "background-min");
        contentDiv.classList.add(storedClassState);
        classStateInput.value = storedClassState;
    }

    // Pageshow event
    window.addEventListener("pageshow", function(event) {
        const storedClassState = localStorage.getItem("classState");
        if (storedClassState) {
            contentDiv.classList.remove("background", "background-min");
            contentDiv.classList.add(storedClassState);
            classStateInput.value = storedClassState;
        }
    });
});


/* === IMAGE MODAL OPENER==== */

// Get all image links
const imgLinks = document.querySelectorAll(".image-link");

// Function to create an element with optional properties
function createElement(tag, className, innerHTML) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (innerHTML) element.innerHTML = innerHTML;
    return element;
}

// Function to create and display a new modal
function createModal(imageSrc, captionText) {
    
    // Check if a modal for this image is already open
    if (document.querySelector(`.modal[data-src='${imageSrc}']`)) {
        return; // If the modal is already open, do nothing
    }

    const modal = createElement("div", "modal");
    modal.setAttribute("data-src", imageSrc); // Set data-src attribute
    const modalContent = createElement("div", "modal-content");

    const modalHeader = createElement("div", "modal-header", `
        <div class="modal-caption">${captionText}</div>
        <span class="close">&times;</span>
    `);

    const modalImg = createElement("img", "modal-img");
    modalImg.src = imageSrc;

    modalContent.append(modalHeader, modalImg);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    modal.style.display = "block"; // Show the modal

    // Close button functionality
    modalHeader.querySelector(".close").onclick = () => {
        modal.style.display = "none";
        document.body.removeChild(modal); // Remove modal from DOM
    };

    // Make the modal draggable
    dragElement(modalContent);
}

// Loop through all links to add click event
imgLinks.forEach(link => {
    link.onclick = event => {
        event.preventDefault();
        createModal(link.href, link.textContent); // Create a new modal with the image and caption
    };
});

// Draggable Modal Function
function dragElement(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    element.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = `${element.offsetTop - pos2}px`;
        element.style.left = `${element.offsetLeft - pos1}px`;
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}


/* ============= CLOCKBOX (retrieved from : ) =============== */


// format for weekday
var tday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// format for month
var tmonth = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

// Function to calculate week number
function getWeekNumber(date) {
    let tempDate = new Date(date.getTime());
    tempDate.setDate(tempDate.getDate() + 3 - ((tempDate.getDay() + 6) % 7));
    let firstThursday = new Date(tempDate.getFullYear(), 0, 4);
    let weekNumber = Math.ceil(((tempDate - firstThursday) / 86400000 + 1) / 7);
    return weekNumber;
}

function GetClock() {
    // gets current date
    var d = new Date();
    
    // calculates the week number
    var weekNumber = getWeekNumber(d);
    
    // collects each segment needed for date
    var nday = d.getDay(),
        nmonth = d.getMonth(),
        ndate = d.getDate(),
        nyear = d.getFullYear() - 2000;
    
    // collects each segment needed for time
    var nhour = d.getHours(),
        nmin = d.getMinutes(),
        nsec = d.getSeconds(),
        ap;

    // sets am vs pm
    if (nhour == 0) { ap = " AM"; nhour = 12; }
    else if (nhour < 12) { ap = " AM"; }
    else if (nhour == 12) { ap = " PM"; }
    else if (nhour > 12) { ap = " PM"; nhour -= 12; }

    if (nmin <= 9) nmin = "0" + nmin;
    if (nsec <= 9) nsec = "0" + nsec;
    if (ndate <= 9) ndate = "0" + ndate;

    // updated clocktext to include week number
    let clocktext =
        `
        Week ${weekNumber} /
        ${nhour}:${nmin}:${nsec} 
        ${ap}`;

    document.getElementById('clockbox').innerHTML = clocktext;
}

GetClock();
setInterval(GetClock, 1000);

