{/* // Lazy loading images */}
document.addEventListener("DOMContentLoaded", function() {
    var lazyloadImages = document.querySelectorAll("img.lazyload");
    var lazyloadThrottleTimeout;

    function lazyload() {
        if (lazyloadThrottleTimeout) {
            clearTimeout(lazyloadThrottleTimeout);
        }

        lazyloadThrottleTimeout = setTimeout(function() {
            var scrollTop = window.pageYOffset;
            lazyloadImages.forEach(function(img) {
                if (img.offsetTop < (window.innerHeight + scrollTop)) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazyload');
                    img.classList.add('lazy-loaded');
                }
            });
            if (lazyloadImages.length === 0) {
                document.removeEventListener("scroll", lazyload);
                window.removeEventListener("resize", lazyload);
                window.removeEventListener("orientationChange", lazyload);
            }
        }, 20);
    }

    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
});

// Toggle Add News Form
function toggleAddForm() {
    var addForm = document.getElementById("addNewsForm");
    addForm.classList.toggle("add-news-form");
}

{/* // Add News Function */}
function addNews(event) {
    event.preventDefault();
    var newsTitle = document.getElementById("newsTitle").value;
    var newsImageUrl = document.getElementById("newsImageUrl").value;
    var newsDescription = document.getElementById("newsDescription").value;
    var newsUrl = document.getElementById("newsUrl").value;

    // Create new article element
    var newArticle = document.createElement("div");
    newArticle.classList.add("article");
    var img = document.createElement("img");
    img.src = newsImageUrl;
    img.classList.add("lazyload");
    var deleteIcon = document.createElement("span");
    deleteIcon.classList.add("delete-icon");
    deleteIcon.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteIcon.addEventListener("click", function() {
        deleteNews(this);
    });
    var h2 = document.createElement("h2");
    h2.textContent = newsTitle;
    var p = document.createElement("p");
    p.textContent = newsDescription;
    var a = document.createElement("a");
    a.href = newsUrl;
    a.target = "_blank";
    a.textContent = "Read more";
    newArticle.appendChild(img);
    newArticle.appendChild(deleteIcon);
    newArticle.appendChild(h2);
    newArticle.appendChild(p);
    newArticle.appendChild(a);

    // Append new article to newsFeed
    var newsFeed = document.getElementById("newsFeed");
    newsFeed.appendChild(newArticle);

    // Clear input fields after adding news
    document.getElementById("newsTitle").value = "";
    document.getElementById("newsImageUrl").value = "";
    document.getElementById("newsDescription").value = "";
    document.getElementById("newsUrl").value = "";

    // Hide the add news form
    toggleAddForm();
}

{/* Delete News Function */}
function deleteNews(element) {
    element.parentNode.remove();
}