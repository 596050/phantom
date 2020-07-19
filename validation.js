bookmarkName.addEventListener("input", function () {
  bookmarkName.setCustomValidity("");
  if (bookmarkName.value === "") {
    bookmarkName.setCustomValidity("Please provide a valid name");
  }
});

bookmarkURL.addEventListener("input", async function () {
  console.log(
    !(await isValidURL(
      (bookmarkURL.value || "").replace(window.location.href, "")
    )),
    (bookmarkURL.value || "").replace(window.location.href, "")
  );
  if (
    bookmarkURL.value === "" ||
    !(await isValidURL(
      (bookmarkURL.value || "").replace(window.location.href, "")
    ))
  ) {
    bookmarkURL.setCustomValidity("Please provide a valid URL");
  } else {
    bookmarkURL.setCustomValidity("");
  }
});

updateBookmarkName.addEventListener("input", function () {
  updateBookmarkName.setCustomValidity("");
  if (updateBookmarkName.value === "") {
    updateBookmarkName.setCustomValidity("Please provide a valid name");
  }
});

updateBookmarkURL.addEventListener("input", async function () {
  if (
    updateBookmarkURL.value === "" ||
    !(await isValidURL(updateBookmarkURL.value))
  ) {
    updateBookmarkURL.setCustomValidity("Please provide a valid URL");
  } else {
    updateBookmarkURL.setCustomValidity("");
  }
});
