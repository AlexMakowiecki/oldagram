/* Firebase connection */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js"
import { getDatabase, ref, update, onValue, get} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js"

const appSettings = {
  databaseURL: "https://oldgram-f3de8-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const postsRef = ref(database, "posts")


/* Main Code */

const main = document.querySelector("main")

function createPost(postInfo){
  const post = document.createElement("article")
  post.classList.add("post")
  post.innerHTML +=
      `
      <div class="layout-container">
          <div class="post-header">
              <img class="portrait-image user-image" src="${postInfo.avatar}" alt="${postInfo.avatar} profile image"></img>
              <div>
                  <p class="user-name bold"> ${postInfo.name} </p>
                  <p class="user-location"> ${postInfo.location} </p>
              </div>
          </div>
      </div>
      <img class="post-image" src="${postInfo.post}" alt="a portrait of ${ postInfo.name }"/>
      <div class="layout-container">
          <div class="post-likes">
              <button class="like-button">
                  <img class="icon-button" src="./images/icon-heart.png" alt="
                  an unfilled black heart icon">      
              </button>
              <p class="like-count bold">${postInfo.likes}</p>
          </div>
          <p class="post-description">
              <span class="bold">${postInfo.username}</span> ${postInfo.comment}
          </p>
      </div>
      `
  return post
}

function loadPost(dbElementInfo){
  const postID = dbElementInfo[0]
  const postInfo = dbElementInfo[1]
  /* Creating Post */
  const post  = createPost(postInfo)
  /* Adding event listeners */
  const likeButtonEl = post.querySelector(".like-button")
  const likeCountEl = post.querySelector(".like-count")
  const postImageEl = post.querySelector(".post-image")

  likeButtonEl.addEventListener("click", function(){
    const likeCount = Number(likeCountEl.textContent)
    const postRef = ref(database, `posts/${postID}`)
    const updates = {
      likes: likeCount + 1
    }
    update(postRef, updates)
  })

  postImageEl.addEventListener("dblclick", function(){
    const likeCount = Number(likeCountEl.textContent)
    const postRef = ref(database, `posts/${postID}`)
    const updates = {
      likes: likeCount + 1
    }
    update(postRef, updates)
  })

  return post
}

onValue(postsRef, function( snapshot ){
  const dbElementsInfo = Object.entries(snapshot.val())
  main.innerHTML = ""
  for (let i=0; i < dbElementsInfo.length; i++){
      main.append(loadPost(dbElementsInfo[i]))
  } 
})











