let optionButtons = document.querySelectorAll(".option-button");
let advancedOptionButton = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let linkButton = document.getElementById("createLink");

let alignButtons = document.querySelectorAll(".align");
let spacingButton = document.querySelectorAll(".spacing");
let formatButton = document.querySelectorAll(".format");
let scriptButton = document.querySelectorAll(".script");

let fontList = [
  "Arial",
  "Verdana",
  "Times New Roman",
  "Garamond",
  "Georgia",
  "Courier New",
  "Cursive"
];

const initializer = () => {
  highlighter(alignButtons, true);
  highlighter(spacingButton, true);
  highlighter(formatButton, false);
  highlighter(scriptButton, true);

  fontList.forEach((value) => {
    let option = document.createElement("option");
    option.value = value;
    option.innerHTML = value;
    fontName.appendChild(option);
  });

  for (let i = 1; i <= 7; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.innerHTML = i;
    fontSizeRef.appendChild(option);
  }

  fontSizeRef.value = 3;
};

// Main logic
const modifyText = (command, defaultUi, value) => {
  document.execCommand(command, defaultUi, value);
};

optionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modifyText(button.id, false, null);
  });
});

advancedOptionButton.forEach((element) => {
  element.addEventListener("click", () => {
    modifyText(element.id, false, element.value);
  });
});

linkButton.addEventListener("click", () => {
  let userLink = prompt("Enter a URL");

  if (/http/i.test(userLink)) {
    modifyText(linkButton.id, false, userLink);
  } else {
    userLink = "http://" + userLink;
    modifyText(linkButton.id, false, userLink);
  }
});

const highlighter = (className, needsRemoval) => {
  className.forEach((button) => {
    button.addEventListener("click", () => {
      if (needsRemoval) {
        let alreadyActive = button.classList.contains("active");
        highlighterRemover(className);
        if (!alreadyActive) {
          button.classList.add("active");
        }
      } else {
        button.classList.toggle("active");
      }
    });
  });
};

const highlighterRemover = (className) => {
  className.forEach((button) => {
    button.classList.remove("active");
  });
};

initializer();
let reload = false;
// Restore text and prompt for download on page load
window.addEventListener("beforeunload", (ev) => {
  const text = document.getElementById("text-input").value;
  if (reload === false) {
    ev.preventDefault();
  }
});

// Manual save function (triggered by a button)
document.getElementById("save-btn").addEventListener("click", () => {
  reload = true;
  const text = document.getElementById("text-input").innerHTML
console.log( text)
  saveTextFile(text);
  
});

function saveTextFile(htmlContent) {
  console.log("heo")
  const fileName = prompt("Enter file name:", "myFile.html");
  if (!fileName) return;

  const blob = new Blob([htmlContent], { type: "text/html" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName.endsWith(".html") ? fileName : fileName + ".html";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}