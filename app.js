function updateSummary() {
  const info = document.querySelector(".info");
  const infoHeading = document.querySelector(".summary-heading h3");
  info.textContent = data.sections[index].summary[type][length];
  infoHeading.textContent = data.sections[index].sectionHeading;
}

const paragraph1 = document.querySelector("#paragraph-1");
const arrow = document.querySelector(".arrow");
const content = document.querySelector(".content");
const sidebar = document.querySelector(".info");
const lengthInput = document.querySelector("#length");
const typeInput = document.querySelector("#type");
let type = "model1";
let length = "long";
typeInput.value = "model1";
let index = 0;
console.log(lengthInput);

let data, sectionData;
async function getData() {
  const response = await fetch(
    "https://toolongdidread.herokuapp.com/api/v1/data"
  );
  const responseData = await response.json();
  sectionsData = responseData.sectionsData;
  data = responseData.data;
  initializeApp();
}

getData();

function initializeApp() {
  lengthInput.addEventListener("change", (e) => {
    if (Number(lengthInput.value) === 50) {
      length = "short";
    } else if (Number(lengthInput.value) === 100) {
      length = "medium";
    } else {
      length = "long";
    }
    updateSummary();
  });

  typeInput.addEventListener("change", (e) => {
    type = typeInput.value;
    updateSummary();
  });

  let title;

  const initialLoad = () => {
    const PageHeader = document.querySelector(".header");
    title = document.createElement("h1");
    title.textContent = data.title;
    PageHeader.append(title);
    updateSummary();
  };

  initialLoad();

  data.sections.forEach((section, i) => {
    const sectionElement = document.createElement("section");
    const sectionHeading = document.createElement("h2");
    sectionHeading.textContent = section.sectionHeading;
    sectionElement.append(sectionHeading);
    section.sectionContent.forEach((p) => {
      const sectionParagraph = document.createElement("p");
      sectionParagraph.setAttribute("class", "paragraph");
      sectionParagraph.setAttribute("id", `id${i}id`);
      sectionParagraph.textContent = p;
      sectionElement.appendChild(sectionParagraph);
    });
    content.append(sectionElement);
  });

  const paragraphs = document.querySelectorAll("section");
  window.addEventListener("scroll", (e) => {
    for (let i = paragraphs.length - 1; i >= 0; i--) {
      const paragraph = paragraphs[i];
      let topHeight =
        paragraph.getBoundingClientRect().height +
        i * 30 +
        i * 38 +
        title.getBoundingClientRect().height +
        (i > 2 ? -70 + i * -13 : 0);

      for (let j = 0; j < i; j++) {
        if (paragraphs[j] === paragraph) {
          return;
        } else {
          topHeight = topHeight + paragraphs[j].getBoundingClientRect().height;
        }
      }

      if (window.pageYOffset < topHeight) {
        index = i;
        const info = document.querySelector(".info");
        const infoHeading = document.querySelector(".summary-heading h3");
        if (data.sections[i].summary[type][length].text) {
          window.allWords = data.sections[i].summary[type][length].text;
          window.allMeanings = data.sections[i].summary[type][length].meanings;
          elements();
        } else {
          info.textContent = data.sections[i].summary[type][length];
          infoHeading.textContent = data.sections[i].sectionHeading;
        }
      }
    }
  });

  const sectionOneSelect = document.querySelector("#section-1");
  const sectionTwoSelect = document.querySelector("#section-2");
  const paragraphContainer = document.querySelector(
    ".section-summary-content-box"
  );
  const paragraph = document.querySelector(".section-summary-content-box p");
  paragraphs.forEach((paragraph) => {
    paragraph.addEventListener("mouseup", (e) => {
      console.log("====================================");
      console.log(e.target);
      console.log("====================================");
      const selection = window.getSelection().toString();

      if (selection === "") {
        console.log("click");
      } else {
        console.log("selection", selection);
      }
    });
  });

  const iconBox = document.querySelector(".icon-box");
  const plusIcon = document.querySelector(".fas.fa-plus");
  const inputsContainer = document.querySelector(
    ".section-summary-box__inputs"
  );

  plusIcon.addEventListener("click", function () {
    if (iconBox.classList.contains("close")) {
      paragraphContainer.classList.add("close");
      inputsContainer.classList.add("close");
      iconBox.classList.remove("close");
      paragraph.textContent = "";
    } else {
      iconBox.classList.add("close");
      inputsContainer.classList.remove("close");
      paragraphContainer.classList.remove("close");
      paragraph.textContent = sectionsData[`abstract-introduction`];

      data.sections
        .map((section) => section.sectionHeading)
        .forEach((heading) => {
          const optionElement = document.createElement("option");
          optionElement.setAttribute(
            "value",
            heading.toLowerCase().replaceAll(" ", "-")
          );
          optionElement.textContent = heading.toLowerCase();
          sectionOneSelect.append(optionElement);
        });
      data.sections
        .map((section) => section.sectionHeading)
        .forEach((heading) => {
          const optionElement = document.createElement("option");
          optionElement.setAttribute(
            "value",
            heading.toLowerCase().replaceAll(" ", "-")
          );
          optionElement.textContent = heading.toLowerCase();
          sectionTwoSelect.append(optionElement);
        });
    }
  });

  sectionOneSelect.value = "abstract";
  sectionTwoSelect.value = "introduction";

  sectionOneSelect.addEventListener("change", (e) => {
    paragraph.textContent =
      sectionsData[`${sectionOneSelect.value}-${sectionTwoSelect.value}`];
    console.log(
      sectionsData[`${sectionOneSelect.value}-${sectionTwoSelect.value}`]
    );
  });

  sectionTwoSelect.addEventListener("change", (e) => {
    paragraph.textContent =
      sectionsData[`${sectionOneSelect.value}-${sectionTwoSelect.value}`];
    console.log(
      sectionsData[`${sectionOneSelect.value}-${sectionTwoSelect.value}`]
    );
  });
}
