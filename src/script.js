import data from "./data.json" assert { type: "json" };

const markup = (dataInstance) => {
  return `
        <li class="">
            <div class="preview-container">
                <img src="${dataInstance.previewImage}">
            </div>
            <span class="img-text" data-value="${dataInstance.title}">
              ${dataInstance.title}
            </span> 
        </li>
`;
};

/**
 *  Initial Data Loading and Formatting
 */
const addDataToPage = () => {
  let ulData = "";
  data.forEach((dataInstance) => (ulData += markup(dataInstance)));
  const list = document.querySelector("ul");
  list.innerHTML = ulData;

  // Truncate
  Array.from(list.children).forEach((item) =>
    truncateText(item.querySelector(".img-text"))
  );

  selectPreview();
};

/**
 *
 * @param {int} index
 * Allows selection of a particular item in the list based on the index
 */
const selectPreview = (index = 0) => {
  const list = document.querySelector("ul");

  // Bad Index
  if (index < 0 || index >= list.children.length) {
    return;
  }

  // Remove Old Selection
  const oldSelection = document.querySelector(".selected");
  if (oldSelection !== null) {
    oldSelection.classList.remove("selected");
  }

  // Select New Image
  list.children[index].classList.add("selected");
  const imgLink = list.children[index].querySelector("img").getAttribute("src");
  document.querySelector(".image-container img").setAttribute("src", imgLink);
  document.querySelector(".textbox").value = list.children[index]
    .querySelector(".img-text")
    .getAttribute("data-value");
};

/**
 *
 * @param {HTML-Element} listElement
 * @returns {int} sibling_based_index
 */
const getIndex = (listElement = document.querySelector(".selected")) => {
  return Array.from(listElement.parentNode.children).indexOf(listElement);
};

/**
 * Setting up a click listener for the list elements
 */
const makeClickable = () => {
  Array.from(document.querySelector("ul").children).forEach((listElement) =>
    listElement.addEventListener("click", function () {
      selectPreview(getIndex(this));
    })
  );
};

/**
 * Setting up keyboard listener for switching
 */
const keyboardSwitching = () => {
  document.addEventListener("keydown", function (event) {
    //While using textbox/other possible inputs.
    if (document.activeElement.tagName == "INPUT") {
      return;
    }

    // Check the key press
    const key = event.key;
    switch (key) {
      case "ArrowDown":
        selectPreview(getIndex() + 1);
        break;
      case "ArrowUp":
        selectPreview(getIndex() - 1);
        break;
    }
  });
};

/**
 *
 * @param {HTML-Element} element
 * Truncates the text based on the scroll-width and the client-width
 * (WARNING: CSS Dependent)
 */
const truncateText = (
  element = document.querySelector(".selected .img-text")
) => {
  const text = element.getAttribute("data-value");
  element.innerText = text;
  console.log(text);
  if (element.scrollWidth > element.clientWidth) {
    const lettersToKeep =
      Math.floor((element.clientWidth / element.scrollWidth) * text.length) - 4;

    const lettersEachSide = lettersToKeep / 2;

    const newText =
      text.substring(0, lettersEachSide) +
      "..." +
      text.substring(text.length - lettersEachSide);
    element.innerText = newText;
  }
};

const keyboardInput = () => {
  const textBox = document.querySelector(".textbox");
  textBox.addEventListener("input", function (event) {
    const title = document.querySelector(".selected .img-text");
    title.setAttribute("data-value", this.value);
    truncateText();
  });
};

addDataToPage();
makeClickable();
keyboardSwitching();
keyboardInput();
