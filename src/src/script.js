import data from "./data.json";
import "./style.css";

/**
 *
 * @param {json data} dataInstance
 * @returns HTML-Element
 *  <li class="">
 *     <div class="preview-container">
 *         <img src="${dataInstance.previewImage}">
 *     </div>
 *    <span class="img-text" data-value="${dataInstance.title}">
 *       ${dataInstance.title}
 *    </span>
 *  </li>
 */
const markup = (dataInstance) => {
  const listItem = document.createElement("li");

  const preview = document.createElement("div");
  preview.classList.add("preview-container");

  const img = document.createElement("img");
  img.setAttribute("src", dataInstance.previewImage);

  const imgText = document.createElement("span");
  imgText.classList.add("img-text");
  imgText.setAttribute("data-value", dataInstance.title);

  preview.appendChild(img);
  listItem.appendChild(preview);
  listItem.appendChild(imgText);

  return listItem;
};

/**
 *  Initial Data Loading and Formatting
 */
const addDataToPage = () => {
  const list = document.querySelector("ul");
  list.innerHTML = "";
  data.forEach((dataInstance) => list.appendChild(markup(dataInstance)));

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
 * Gets the text value from the attribute "data-value" and sets it as the preview text
 */
const updateText = (element) => {
  const text = element.getAttribute("data-value");
  element.innerText = text;
  return text;
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
  const text = updateText(element);
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

/**
 * Allows editing the title
 */
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
