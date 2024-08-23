// Fetching elements
const inputField = document.querySelector("#input-box");
const searchBtn = document.querySelector("#search-btn");
const showMoreBTN = document.querySelector("#showMore-btn");
const searchResult = document.querySelector("#search-result");

// Hide the showMoreBtn
showMoreBTN.style.display = "none";

// impVariable Declarations
let keyword = "";
let page = 1;
const apiKey = "KiFdYRKjyTHaOq0RRG01782_ZGl9A-tsKe-_XSQ4Xb0";

// Function to getImages from API
async function getImages(keyword,page) {
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${apiKey}&per_page=12`;

  if(page === 1){
    searchResult.innerHTML = "";
  }
  const response = await fetch(url);
  const images = await response.json();
  images.results.forEach((element) => {
    const value = element.urls.full;
    // creating image-containers
    const imageContainer = document.createElement("div");
    // creating image elements
    const image = document.createElement("img");
    image.setAttribute("src", value);
    // creating the download button & add the style's class
    const downloadIcon = document.createElement("img");
    downloadIcon.setAttribute("src","./assets/download-icon.png");
    downloadIcon.classList.add("downloadIcon-styles");

    // appending imagecontainer,images & download icons
    searchResult.appendChild(imageContainer);
    imageContainer.appendChild(image);
    imageContainer.appendChild(downloadIcon);

    // calling the function to download-btn for dowloading the images
    downloadIcon.onclick = (e)=>{
      downloadImage(e);
    }
  });

  // adding some neccesities
  showMoreBTN.style.display = "flex";
  inputField.value = "";
}

// Adding search-btn functionality
searchBtn.addEventListener("click", () => {
    keyword = inputField.value;
  if (keyword === "") {
    alert("Please enter a valid name for finding the images");
  } else {
    getImages(keyword,page);
  }
});

// Adding showMoreBtn functionality
showMoreBTN.addEventListener("click",()=>{
    page++;
    getImages(keyword,page)
});

// function to download the images
async function downloadImage(e){
  // getting the imageSrc of image we want to download
  const downloadIcon = e.target;
  const imagecontainer = downloadIcon.parentElement;
  const targetImage = imagecontainer.querySelector("img:first-child");
  const imgSrc = targetImage.src;

  // fetch the image from the src as response.json
  const response = await fetch(imgSrc);
  // converet the response.json into a blob
  const blob = await response.blob();
  // generate the blobUrl from the blob
  const blobUrl = URL.createObjectURL(blob);
  
  
  // adding downloading functionality for the imgSrc
  // by creating temporary anchor tag
  const anchor = document.createElement("a");
  // use the blobUrl for initiating the download
  anchor.href = blobUrl;
  anchor.download = imgSrc.split('/').pop() + ".jpg";
  document.body.appendChild(anchor);
  // trriger the click event on this anchor programatically so that downloading is started
  anchor.click();
  document.body.removeChild(anchor);
  // release the blobUrl
  URL.revokeObjectURL(blobUrl);
}
