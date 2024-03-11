
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
