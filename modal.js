// Get the modal
var modal = document.getElementById("update-boomark-modal");

// Get the close element
var close = document.getElementsByClassName("close")[0];

// Close the modal
close.onclick = function () {
  modal.style.display = "none";
  document.getElementById("bookmarks-body").style.overflow = "auto";
  updateBookmarksForm.removeEventListener("submit", updatedItem);
};

// When user clicks outside of the modal, it should close
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    document.getElementById("bookmarks-body").style.overflow = "auto";
    updateBookmarksForm.removeEventListener("submit", updatedItem);
  }
};
