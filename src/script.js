import data from "./data.json" assert { type: "json" };

const markup = (dataInstance) => {
  return `
        <li class="">
            <div class="preview-container">
                <img src="${dataInstance.previewImage}">
            </div>
            <div class="img-text">
                ${dataInstance.title}
            </div> 
        </li>
`;
};

const addDataToPage = () => {
  let ulData = "";
  data.forEach((dataInstance) => (ulData += markup(dataInstance)));
  const list = document.querySelector("ul");
  list.innerHTML = ulData;
  selectPreview();
};

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
};

const getIndex = (listElement = document.querySelector(".selected")) => {
  return Array.from(listElement.parentNode.children).indexOf(listElement);
};

const makeClickable = () => {
  Array.from(document.querySelector("ul").children).forEach((listElement) =>
    listElement.addEventListener("click", function () {
      selectPreview(getIndex(this));
    })
  );
};

const keyboardSwitching = () => {
  document.addEventListener("keydown", function (event) {
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

addDataToPage();
makeClickable();
keyboardSwitching();
