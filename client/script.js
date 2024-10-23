const API_URL = 'http://localhost:5001/api';

// Fetch and display posts
async function fetchPosts() {
    try {
        const response = await fetch(`${API_URL}/posts`);
        const posts = await response.json();
        const postsContainer = document.getElementById('posts-container');
        
        postsContainer.innerHTML = posts.map(post => `
            <div class="post">
                <button class="delete-btn" onclick="deletePost('${post._id}')">Delete</button>
                <h3>${post.title}</h3>
                <p><strong>${post.author}</strong> - ${new Date(post.createdAt).toLocaleDateString()}</p>
                <p>${post.content}</p>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

// Create new post
document.getElementById('post-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const post = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        content: document.getElementById('content').value
    };

    try {
        await fetch(`${API_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        });

        // Clear form and refresh posts
        e.target.reset();
        fetchPosts();
    } catch (error) {
        console.error('Error creating post:', error);
    }
});

// Delete post
async function deletePost(id) {
    try {
        await fetch(`${API_URL}/posts/${id}`, {
            method: 'DELETE'
        });
        fetchPosts();
    } catch (error) {
        console.error('Error deleting post:', error);
    }
}

// Initial load
fetchPosts();