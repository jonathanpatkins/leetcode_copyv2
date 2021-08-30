var darkToggle = false;

function toggle() {



    // If theme is default light/dark, switch to default dark/light
    // Otherwise, keep the existing theme
    let navtab = document.getElementById("nav-tab")
    let tabpane = document.getElementsByClassName("tab-pane")
    let btn = document.getElementsByClassName("btn")
    let navbar = document.getElementById("nav-bar")
    let root = document.getElementById("root")
    let stdout = document.getElementById("stdout")
    let navdescription = document.getElementById("nav-description")
    let navsolution = document.getElementById("nav-solution")
    let uwu = document.getElementById("UwU")
    let output = document.getElementById("output")
    let darkmodelabel = document.getElementById("darkmode-label")
    let problemexamples = document.getElementsByClassName("problem-examples")
    let footerelement = document.getElementsByClassName("footer-element")
    let testcaseresulttext = document.getElementsByClassName("testcase-result-text")
    let run = document.getElementById("run")


    let editorTheme = localStorage.getItem("theme")
    if (!darkToggle) {
        navtab.classList.add("bg-dark")

        for (var h = 0; h < btn.length; h++) {
            if (btn[h] != run && !btn[h].classList.contains("testcase-result")) {
                btn[h].classList.add("bg-dark")
            }
        }

        navbar.classList.add("bg-dark")

        for (var h = 0; h < tabpane.length; h++) {
            tabpane[h].classList.add("bg-dark")
        }

        root.classList.add("bg-dark")

        navdescription.style.color = "white"

        stdout.style.color = "white"

        navsolution.style.color = "white"

        if (uwu != null) {
            uwu.style.color = "white"
        }

        output.style.backgroundColor = "lightgrey"

        darkmodelabel.style.color = "white"


        for (var h = 0; h < problemexamples.length; h++) {
            problemexamples[h].style.color = "black"
        }

        for (var h = 0; h < footerelement.length; h++) {
            if (footerelement[h].style.color != "grey") {
                footerelement[h].style.color = "white"
            }
        }

        for (var h = 0; h < testcaseresulttext.length; h++) {
            testcaseresulttext[h].style.color = "black"
        }

        if (editorTheme == 0) {
            changeTheme(1);
        }

    } else {
        navtab.classList.remove("bg-dark")

        for (var h = 0; h < btn.length; h++) {
            if (btn[h] != run && !btn[h].classList.contains("testcase-result")) {
                btn[h].classList.remove("bg-dark")
            }
        }

        navbar.classList.remove("bg-dark")

        output.style.backgroundColor = "white"

        darkmodelabel.style.color = "black"

        stdout.style.color = "black"

        navdescription.style.color = "black"

        navsolution.style.color = "black"

        if (uwu != null) {
            uwu.style.color = "black"
        }

        for (var h = 0; h < tabpane.length; h++) {
            tabpane[h].classList.remove("bg-dark")
        }

        root.classList.remove("bg-dark")

        for (var h = 0; h < problemexamples.length; h++) {
            problemexamples[h].style.color = "black"
        }

        for (var h = 0; h < footerelement.length; h++) {
            if (footerelement[h].style.color != "grey") {
                footerelement[h].style.color = "black"
            }
        }

        for (var h = 0; h < testcaseresulttext.length; h++) {
            testcaseresulttext[h].style.color = "black"
        }

        if (editorTheme == 1 || editorTheme === null) { // Default dark
            changeTheme(0) // Change to default light
        }


    }

    darkToggle = !darkToggle
    localStorage.setItem("mode", darkToggle)
}

var savedMode = localStorage.getItem("mode")
var savedTheme = localStorage.getItem("theme")
if (savedMode === 'true') {
    toggle()
}
if (savedTheme === "" || savedTheme === null) {
    cm.setOption("theme", 'default')
} else {
    changeTheme(savedTheme)
}