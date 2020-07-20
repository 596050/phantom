to compile, run:

> > java -jar compiler.jar --js main.js --js modal.js --js validation.js --js_output_file main-compiled.js --compilation_level ADVANCED_OPTIMIZATIONS

TDD:

- The application has been tested on Chrome
- Uses Javascript, HTML, CSS and IndexedDB (for data storage)
- It has a textarea and input at the top of the overviews page a list of bookmarks below
- The results page has a message and a link to the overview page
- Editing and delete should be available in the options button on the bookmark list items. On edit a modal appears and on delete the correct item should be removed

limitations:

- Needs to be tested with other browsers
- Has not been tested with large numbers of bookmarks and does not have search functionality, does not scale
- No unit or integration testing
