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

// const data = require("./data.json");
console.log(data);
const addDataToPage = () => {
  let ulData = "";
  data.forEach((dataInstance) => (ulData += markup(dataInstance)));
  const list = document.querySelector("ul");
  list.innerHTML = ulData;
};

const selectPreview = (index = 0) => {
  const oldSelection = document.querySelector(".selected");
  if (oldSelection !== null) {
    oldSelection.classList.remove("selected");
  }
  const list = document.querySelector("ul");
  if (index < list.children.length) {
    list.children[index].classList.add("selected");
    const imgLink = list.children[index]
      .querySelector("img")
      .getAttribute("src");
    document.querySelector(".image-container img").setAttribute("src", imgLink);
  } else {
    console.error("Index more than list");
  }
};

const getIndex = (listElement) => {
  return Array.from(listElement.parentNode.children).indexOf(listElement);
};

const makeClickable = () => {
  //   const list = document.querySelector("ul");
  //   {
  //     for(i in)list
  //   }
};

addDataToPage();
Array.from(document.querySelector("ul").children).forEach((listElement) =>
  //   (listElement) => console.log(listElement)
  listElement.addEventListener("click", function () {
    selectPreview(getIndex(this));
  })
);