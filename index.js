const chokidar = require("chokidar");
const fs = require("fs");

const folderToMonitor = "C:path/to/your/folder"; //change the folder path

// Initialize the watcher
const watcher = chokidar.watch(folderToMonitor, {
  persistent: true,
});

//get the file details
function getFileDetails(filePath) {
  const stats = fs.statSync(filePath);
  return {
    name: filePath.split("\\").pop(),
    size: stats.size,
    type: filePath.split(".").pop().toLowerCase(),
  };
}

//event listeners for file/folder changes
watcher
  .on("add", (path) => {
    console.log(`File added: ${path}`);
    const fileDetails = getFileDetails(path);
    console.log(`File added: ${path}`);
    console.log(`File details:`, fileDetails);
  })
  .on("change", (path) => {
    console.log(`File changed: ${path}`);
  })
  .on("unlink", (path) => {
    console.log(`File deleted: ${path}`);
  });

//watch for subdirectories
watcher.add("C:/path/to/your/folder/subfolder");

// stop wather when you're done
//watcher.close();
