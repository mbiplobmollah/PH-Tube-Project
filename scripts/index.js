function removeActiveClass (){
  const activeButtons = document.getElementsByClassName('active')
  for(let btn of activeButtons){
    btn.classList.remove('active');
  }

  console.log(activeButtons);
}

function loadCategories(){
    // fetch the data
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    // convert promise ot json
    .then((res)=>res.json())
    //send data to display categories
    .then(data => displayCategories(data.categories))
}

function loadVideos(searchText =''){
     // fetch the data
     fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
     // convert promise ot json
     .then((res)=>res.json())
     //send data to display categories
     .then(data => {
      // document.getElementById('btn-all').classList.add('active')
      displayVideos(data.videos)
      // removeActiveClass();
     })
}


const loadCategoryVideos= (id) =>{
    // console.log(id);
    const url =`https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    console.log(url)
    fetch(url)
    .then(res => res.json())
    .then(data => {
      removeActiveClass();
      const clickedButton = document.getElementById(`btn-${id}`);
      clickedButton.classList.add('active')
      console.log(clickedButton)
      displayVideos(data.category)
    })

}

// {category_id: '1001', category: 'Music'}

const loadVideoDetails= (videosId) =>{
console.log(videosId);
const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videosId}`
fetch(url)
.then(res=>res.json())
.then(data=> displayVideoDetails(data.video))
}

const displayVideoDetails =(video) =>{
  document.getElementById('video_details').showModal()
  const detailsContainer = document.getElementById('details-container');
  detailsContainer.innerHTML=
  `
  <div class="card bg-base-100 image-full shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">Card Title</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div class="card-actions justify-end">
    </div>
  </div>
</div>
  `
}

function displayCategories(categories){
    //get the container
    const categoryContainer = document.getElementById('category-container');
    //loop operation on array of object
 for(let cat of categories){   
    //create element
    const categoryDiv = document.createElement('div');
    categoryDiv.innerHTML = `<button id="btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>`
    //append the element
    categoryContainer.appendChild(categoryDiv)
 }
}

const displayVideos = (videos) =>{
    const videoContainer = document.getElementById('video-container');


    videoContainer.innerHTML = ""

    if(videos.length == 0){
      videoContainer.innerHTML =`
      <div class="col-span-full flex flex-col justify-center items-center text-center py-20 pl-15">
            <img class="w-[120px]" src="assets/Icon.png" alt="">
            <h2 class="text-2xl font-bold">Oops!! Sorry, There is no content here.</h2>
        </div>
      `;
      return;
    }

    videos.forEach(video => {
        // console.log(video)
        const videoCard = document.createElement('div');
        videoCard.innerHTML = `
<div class="card bg-base-100">
            <figure class="relative">
              <img class="w-full h-[180px] object-cover"
                src="${video.thumbnail}"
                alt="Shoes" />
            <span class="absolute bottom-2 right-2 text-white bg-black p-1 text-sm rounded-md">3hrs 56 min ago</span>
            </figure>
            <div class="flex gap-3 px-0 py-5">
              <div class="profile">
                <div class="avatar">
                    <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                      <img src="${video.authors[0].profile_picture}" />
                    </div>
                  </div>
              </div>
              <div class="intro">
                <h2 class="text-sm font-semibold">${video.title}</h2>
                <p class="text-sm text-gray-400 flex gap-1 items-center">${video.authors[0].profile_name}
                ${video.authors[0].verified == true ? `<img class="w-4"  src="https://img.icons8.com/?size=48&id=SRJUuaAShjVD&format=png" alt="">` : ``}</p>
                <p class="text-sm text-gray-400">${video.others.views} views</p>
              </div>

            </div>
            <button onclick="loadVideoDetails('${video.video_id}')" class="btn btn-block">Show Details</button>
          </div>
        `;
    videoContainer.appendChild(videoCard);
    });
}

document.getElementById('search-input').addEventListener('keyup', (e)=>{
  const input=e.target.value;
  loadVideos(input)
})

loadCategories();
loadVideos()
