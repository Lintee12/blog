const postLoader = document.querySelector(".post-loader");

function getSlug(postTitle) {
  return postTitle
    .toLowerCase()
    .replace(/[^a-zA-Z ]/g, "")
    .replace(" ", "-");
}

function createPostPreview(postTitle, postImage, postAuthor, postDate) {
  const element = document.createElement("a");
  element.href = `/posts/${getSlug(postTitle)}/post.html`;
  element.classList.add("post-preview");
  element.classList.add("scroll-fade");
  element.classList.add("material");
  element.title = "click to read";
  element.innerHTML += `
  <img loading="lazy" class="post-preview_image" src="${postImage}" draggable="false" alt="${postTitle}">
  <span class="post-preview_title">${postTitle}</span>
  <span class="post-preview_author">${postAuthor}</span>
  <span class="post-preview_date">${postDate}</span>
  `;
  return element;
}

async function loadPosts() {
  let posts;
  await fetch("/blog/posts/posts.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      posts = data;
    })
    .catch((error) => {
      console.error("Unable to fetch data:", error);
    });

  for (let i = 0; i < Object.keys(posts).length; i++) {
    const post = createPostPreview(
      posts[i].title,
      posts[i].image,
      posts[i].author,
      posts[i].date
    );
    console.log(posts[i]);
    postLoader.appendChild(post);
  }
  document.querySelectorAll(".loading-preview").forEach((element) => {
    element.remove();
  });
  document.body.innerHTML +=
    '<script src="https://cdn.jsdelivr.net/gh/Lintee12/scroll-fade@latest/bin/js/scrollFade.js"></script>';
}

document.addEventListener("DOMContentLoaded", () => {
  loadPosts();
});
