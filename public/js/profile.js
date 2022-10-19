// Create blog post function
const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#post-title").value.trim();
  const content = document.querySelector("#post-content").value.trim();

  if (title && content) {
    const response = await fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to create post");
    }
  }
};

// Delete blog post function
const delButtonHandler = async (event) => {
  if (event.currentTarget.hasAttribute("data-id")) {
    const id = event.currentTarget.getAttribute("data-id");

    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to delete post");
    }
  }
};

// Update blog post
const updateButtonHandler = async (event) => {
  if (event.currentTarget.hasAttribute("data-id")) {
    const id = event.currentTarget.getAttribute("data-id");
    console.log(id);
    // Get modal and set data-id
    const modalElement = document.getElementById("updateModal");
    modalElement.dataset.id = id;

    // // Get current post values by id
    const blogPost = await getBlogPost(id);
    // // Fill title and content
    let currentTitle = blogPost.title;
    let currentContent = blogPost.content;
    document.querySelector("#update-post-title").value = currentTitle;
    document.querySelector("#update-post-content").value = currentContent;

    // Add event listener to modal button
    document
      .querySelector("#updatePostBtn")
      .addEventListener("click", updateBlogPost);

    // Open modal
    let updateModal = new bootstrap.Modal(modalElement, {
      keyboard: false,
    });
    updateModal.show();
  }
};

const updateBlogPost = async () => {
  // Values
  const id = document.getElementById("updateModal").getAttribute("data-id");
  const title = document.querySelector("#update-post-title").value.trim();
  const content = document.querySelector("#update-post-content").value.trim();

  const response = await fetch(`/api/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify({ title, content }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    document.location.replace("/profile");
  } else {
    alert("Failed to update post");
  }
};

// Get request for current post data to fill in values
const getBlogPost = async (id) => {
  const response = await fetch(`/api/posts/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    return response.json();
  } else {
    alert("Failed to get post");
  }
};

// Create new post event listener
document
  .querySelector(".new-post-form")
  .addEventListener("submit", newFormHandler);

// Only add delete event listener if the class exists
if (document.querySelector("#postList")) {
  document.querySelectorAll(".delete-post-btn").forEach((item) => {
    item.addEventListener("click", delButtonHandler);
  });
}

// Only add update event listener if the class exists
if (document.querySelector("#postList")) {
  document.querySelectorAll(".update-post-btn").forEach((item) => {
    item.addEventListener("click", updateButtonHandler);
  });
}
