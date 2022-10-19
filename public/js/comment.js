console.log("comments successfully loaded");

// Create new conmment
const newCommentHandler = async (event) => {
  event.preventDefault();

  const content = document.querySelector("#commentInput").value.trim();
  const postID = document.querySelector("#postId");
  const post_id = postID.dataset.post;

  console.log(post_id);

  if (content) {
    const response = await fetch(`/api/comments`, {
      method: "POST",
      body: JSON.stringify({ content, post_id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace(`/post/${post_id}`);
      console.log("Comment created");
    } else {
      alert("Failed to create comment");
    }
  }
};

// Delete comment function
const deleteComment = async (event) => {
  if (event.target.hasAttribute("data-comment")) {
    const post_id = document.querySelector("#postId").dataset.post;
    const id = event.target.getAttribute("data-comment");

    const response = await fetch(`/api/comments/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace(`/post/${post_id}`);
    } else {
      alert("Unable to delete post");
    }
  }
};

// Add new comment event listener for if user is logged in
if (document.querySelector(".new-comment-form")) {
  document
    .querySelector(".new-comment-form")
    .addEventListener("submit", newCommentHandler);
}

// Add delete button event listener if comment exists
if (document.querySelector(".comment")) {
  document.querySelectorAll(".delete-comment-btn").forEach((item) => {
    item.addEventListener("click", deleteComment);
  });
}
