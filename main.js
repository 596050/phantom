// create an instance of a db object for IDB
let db;
// number of page items
const paginationResultMaximum = 20;
let startPagination = 0;

// references to DOM nodes
const bookmarkList = document.getElementById("bookmarks-list");
const bookmarksForm = document.getElementById("bookmarks-form");
const bookmarkURL = document.getElementById("bookmarkURL");
const bookmarkName = document.getElementById("bookmarkName");
const submit = document.getElementById("submit-bookmark");
const updateBookmarkURL = document.getElementById("update-bookmarkURL");
const updateBookmarkName = document.getElementById("update-bookmarkName");
const updateBookmarksForm = document.getElementById("update-bookmarks-form");
const updateSubmit = document.getElementById("update-submit-bookmark");
let updatedItem;

const listItemDropdownString = (item) => `
<div class="list-item-option dropdown" style="position: absolute; right: 10px; display: flex; align-items: center;">
<svg class="dropbtn" width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" style="fill: black; border-radius: 6px; stroke: white; stroke-width: 1px;">
<path
  class="options-background"
  d="M0 9.6C0 6.23968 0 4.55953 0.653961 3.27606C1.2292 2.14708 2.14708 1.2292 3.27606 0.653961C4.55953 0 6.23969 0 9.6 0H38.4C41.7603 0 43.4405 0 44.7239 0.653961C45.8529 1.2292 46.7708 2.14708 47.346 3.27606C48 4.55953 48 6.23969 48 9.6V38.4C48 41.7603 48 43.4405 47.346 44.7239C46.7708 45.8529 45.8529 46.7708 44.7239 47.346C43.4405 48 41.7603 48 38.4 48H9.6C6.23968 48 4.55953 48 3.27606 47.346C2.14708 46.7708 1.2292 45.8529 0.653961 44.7239C0 43.4405 0 41.7603 0 38.4V9.6Z"
  fill="black"/>
<path
  class="options-dot"
  d="M16 26C17.1046 26 18 25.1046 18 24C18 22.8954 17.1046 22 16 22C14.8954 22 14 22.8954 14 24C14 25.1046 14.8954 26 16 26Z"
  fill="white"
/>
<path
  class="options-dot"
  d="M24 26C25.1046 26 26 25.1046 26 24C26 22.8954 25.1046 22 24 22C22.8954 22 22 22.8954 22 24C22 25.1046 22.8954 26 24 26Z"
  fill="white"
/>
<path
  class="options-dot"
  d="M34 24C34 25.1046 33.1046 26 32 26C30.8954 26 30 25.1046 30 24C30 22.8954 30.8954 22 32 22C33.1046 22 34 22.8954 34 24Z"
  fill="white"
/></svg>
<div id="myDropdown" class="dropdown-content dropdown-content${item.id}">
  <div class="update-list-item-button" id="update-list-item-button">Edit</div>
  <div class="delete-list-item-button" id="delete-list-item-button">Delete</div>
</div>
</div>`;

const isValidURL = (str) => {
  const exp = /[https?://(www.)?][-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  const url = new RegExp(exp);
  if (url.test(str)) {
    return true;
  }
  return false;
};

window.addEventListener("load", function () {
  window.indexedDB =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB;

  window.IDBTransaction =
    window.IDBTransaction ||
    window.webkitIDBTransaction ||
    window.msIDBTransaction;
  window.IDBKeyRange =
    window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

  // open database
  const DBOpenRequest = window.indexedDB.open("bookmarks", 5);

  // these two event handlers act on the database being opened successfully, or not
  DBOpenRequest.onerror = function (event) {
    console.log("Error loading database.");
  };

  DBOpenRequest.onsuccess = function (event) {
    // store the result of opening the database in the db variable
    db = DBOpenRequest.result;
    // run the displayData() function to populate the list data in the IDB
    displayData();
  };

  // if a new version of the database needs to be created, run this
  DBOpenRequest.onupgradeneeded = function (event) {
    let db = event.target.result;

    db.onerror = function (event) {
      console.log("Error loading database.");
    };

    // Create an objectStore
    let objectStore = db.createObjectStore("bookmarks", {
      keyPath: "id",
      autoIncrement: true,
    });

    // define what data items the objectStore will contain
    objectStore.createIndex("bookmarkName", "text", { unique: false });
    objectStore.createIndex("bookmarkURL", "text", { unique: false });
  };

  function getData(start, total) {
    // retrieve items from IDB
    return new Promise(function (resolve, reject) {
      var t = db.transaction(["bookmarks"], "readonly");
      var bd = t.objectStore("bookmarks");
      var b = [];
      var hasSkipped = false;
      bd.openCursor().onsuccess = function (e) {
        var cursor = e.target.result;
        if (!hasSkipped && start > 0) {
          hasSkipped = true;
          cursor.advance(start);
          return;
        }
        if (cursor) {
          b.push(cursor.value);
          if (b.length < total) {
            cursor.continue();
          } else {
            resolve(b);
          }
        } else {
          resolve(b);
        }
      };
    });
  }

  function displayData(limit = paginationResultMaximum) {
    // first clear the content of the db
    bookmarkList.innerHTML = "";
    document.getElementById("page-numbers").innerHTML = "";

    // open object store and iterate through
    let objectStore = db.transaction("bookmarks").objectStore("bookmarks");
    getData(startPagination, paginationResultMaximum).then((data) => {
      data.forEach((item) => {
        if (item) {
          // create a list item to put each item when displaying it
          const listItem = document.createElement("li");
          listItem.className = "list-item list-item-interact";
          const href = item["bookmarkURL"];
          listItem.onclick = () => {
            console.log("href", href);
            window.open(href, "_blank");
          };
          const bookmarkLink = document.createElement("a");
          bookmarkLink.className = "list-item-bookmarkName";
          bookmarkLink.innerText = item["bookmarkName"];
          bookmarkLink.href = item["bookmarkURL"];
          bookmarkLink.target = "_blank";

          window.onclick = function (event) {
            if (!event.target.matches(`.dropdown-content${item.id}`)) {
              var dropdowns = document.getElementsByClassName(
                "dropdown-content"
              );

              var i;
              for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains("show")) {
                  openDropdown.classList.remove("show");
                }
              }
            }
          };

          const optionNode = new DOMParser().parseFromString(
            listItemDropdownString(item),
            "text/html"
          ).body.firstElementChild.firstChild.parentElement;

          const optionNodeDropdown = optionNode.getElementsByClassName(
            `dropbtn`
          )[0];
          const optionNodeDropdownList = optionNode.getElementsByClassName(
            `dropdown-content${item.id}`
          )[0];
          optionNodeDropdown.onclick = (event) => {
            if (!event.target.matches(`.dropdown-content${item.id}`)) {
              var dropdowns = document.getElementsByClassName(
                "dropdown-content"
              );

              var i;
              for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (
                  openDropdown.classList.contains("show") &&
                  !openDropdown.classList.contains(`dropdown-content${item.id}`)
                ) {
                  openDropdown.classList.remove("show");
                }
              }
            }
            optionNodeDropdownList.classList.toggle("show");
          };

          optionNode.onmouseover = () => {
            listItem.classList.remove("list-item-interact");
          };
          optionNode.onmouseout = () => {
            listItem.className = "list-item list-item-interact";
          };
          optionNode.onclick = (ev) => {
            ev.preventDefault();
            ev.stopPropagation();
          };

          // edit
          const updateButton = optionNode.getElementsByClassName(
            "update-list-item-button"
          )[0];
          updateButton.onclick = () => {
            optionNodeDropdownList.classList.remove("show");
            document.getElementById("update-bookmarkURL").textContent =
              item["bookmarkURL"];
            document.getElementById("update-bookmarkName").value =
              item["bookmarkName"];

            updatedItem = (e) => updateData(e, item);

            updateBookmarksForm.addEventListener("submit", updatedItem, false);

            document.getElementById("update-boomark-modal").style.display =
              "block";
            document.getElementById("bookmarks-body").style.overflow = "hidden";
          };

          // delete
          const deleteButton = optionNode.getElementsByClassName(
            "delete-list-item-button"
          )[0];
          const id = item.id;
          deleteButton.onclick = () => {
            deleteItem(id, listItem);
            displayData();
          };

          listItem.appendChild(bookmarkLink);
          listItem.appendChild(optionNode);
          bookmarkList.appendChild(listItem);
        } else {
          // if there are no more cursor items to iterate through
          console.log("Entries all displayed.");
        }
      });
    });

    const pageNumbers = document.getElementById("page-numbers");

    var countRequest = objectStore.count();
    countRequest.onsuccess = function () {
      for (let i = 0; i < countRequest.result / limit; i++) {
        const pageNumber = document.createElement("li");
        pageNumber.textContent = i + 1;
        pageNumber.className = "page-number";
        pageNumbers.appendChild(pageNumber);
        pageNumber.onclick = () => {
          startPagination = i * paginationResultMaximum;
          displayData();
        };
      }
    };
  }

  // give the form submit button an event listener so that when the form is submitted the addData() function is run
  bookmarksForm.addEventListener("submit", addData, false);

  function updateData(e, item) {
    // prevent default - we don't want the form to submit in the conventional way
    e.preventDefault();

    // Stop the form submitting if any values are left empty. This is just for browsers that don't support the HTML5 form
    // required attributes
    const bookmarkURLValue = updateBookmarkURL.value.trim();
    const bookmarkNameValue = updateBookmarkName.value.trim();

    if (
      bookmarkURLValue == "" ||
      bookmarkNameValue == "" ||
      bookmarkURLValue == null ||
      bookmarkNameValue == null ||
      bookmarkURLValue == undefined ||
      bookmarkNameValue == undefined
    ) {
      console.log("Data not submitted — form incomplete.");

      return;
    } else {
      // grab the values entered into the form fields and store them in an object ready for being inserted into the IDB
      item["bookmarkURL"] = bookmarkURLValue;
      item["bookmarkName"] = bookmarkNameValue;
      // open a read/write db transaction, ready for adding the data
      let transaction = db.transaction(["bookmarks"], "readwrite");

      // report on the success of the transaction completing, when everything is done
      transaction.oncomplete = function () {
        console.log("Transaction completed: database modification finished.");

        // update the display of data to show the newly added item, by running displayData() again.
        displayData();
      };

      transaction.onerror = function () {
        console.log(
          "Transaction not opened due to error: " + transaction.error
        );
      };

      // call an object store that's already been added to the database
      let objectStore = transaction.objectStore("bookmarks");

      // Make a request to add our newItem object to the object store
      let objectStoreRequest = objectStore.put(item);
      objectStoreRequest.onsuccess = function (event) {
        // clear the form, ready for adding the next entry
        bookmarkURL.value = "";
        bookmarkName.value = "";
      };
    }
    updateBookmarksForm.removeEventListener("submit", updatedItem);
    document.getElementById("update-boomark-modal").style.display = "none";
    document.getElementById("bookmarks-body").style.overflow = "auto";
  }

  function addData(e) {
    // prevent default - we don't want the form to submit in the conventional way
    e.preventDefault();

    // Stop the form submitting if any values are left empty. This is just for browsers that don't support the HTML5 form
    // required attributes
    const bookmarkURLValue = bookmarkURL.value.trim();
    const bookmarkNameValue = bookmarkName.value.trim();

    if (
      bookmarkURLValue == "" ||
      bookmarkNameValue == "" ||
      bookmarkURLValue == null ||
      bookmarkNameValue == null ||
      bookmarkURLValue == undefined ||
      bookmarkNameValue == undefined ||
      !isValidURL(bookmarkURLValue)
    ) {
      console.log("Data not submitted — form incomplete.");
      return;
    } else {
      // grab the values entered into the form fields and store them in an object ready for being inserted into the IDB
      let newItem = {
        ["bookmarkURL"]: bookmarkURLValue,
        ["bookmarkName"]: bookmarkNameValue,
      };

      // open a read/write db transaction, ready for adding the data
      let transaction = db.transaction(["bookmarks"], "readwrite");

      // report on the success of the transaction completing, when everything is done
      transaction.oncomplete = function () {
        // update the display of data to show the newly added item, by running displayData() again.
        displayData();
      };

      transaction.onerror = function () {
        console.log(
          "Transaction not opened due to error: " + transaction.error
        );
      };

      // call an object store that's already been added to the database
      let objectStore = transaction.objectStore("bookmarks");

      // Make a request to add our newItem object to the object store
      let objectStoreRequest = objectStore.add(newItem);
      objectStoreRequest.onsuccess = function (event) {
        // clear the form, ready for adding the next entry
        bookmarkURL.value = "";
        bookmarkName.value = "";

        const overviewPage = document.getElementById("overview-page");
        overviewPage.style.display = "none";

        const resultsPage = document.getElementById("results-page");
        resultsPage.style.display = "initial";
        document.getElementById("nav-title").textContent = "Results";

        const submission = document.getElementById("submission");
        submission.textContent = newItem["bookmarkURL"];

        const toOverviewPage = document.getElementById("to-overview-page");
        toOverviewPage.onclick = () => {
          const overviewPage = document.getElementById("overview-page");
          overviewPage.style.display = "initial";

          const resultsPage = document.getElementById("results-page");
          resultsPage.style.display = "none";
          document.getElementById("nav-title").textContent = "Overview";
        };
      };
    }
  }

  function deleteItem(id, listItem) {
    // delete from database
    let transaction = db.transaction(["bookmarks"], "readwrite");
    transaction.objectStore("bookmarks").delete(id);
    transaction.oncomplete = function () {
      if (listItem) {
        // delete from the DOM
        listItem.remove();
      }
    };
  }
});
