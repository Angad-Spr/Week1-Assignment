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
  const list = document.getElementsByTagName("ul")[0];
  list.innerHTML = ulData;
};

addDataToPage();
