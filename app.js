//Node js imports for File actions
const fs = require("fs");
const express = require("express");
const path = require("path");
const PORT = 9000;

//Define the app as express to run on server
const app = express();
app.use(express.json());

//define the app is running succesfully
app.get("/", (req, res) => {
  res.send("Server is running on / Current Date Time/Created API successfully");
});

//To add DATE and TIME data to file everytime i hit the current server
app.get("/current", async (req, res) => {
  try {
    const dateTime = new Date().toString().replace(/:/g, "-");
    const fileName = `${dateTime}.txt`;
    const filePath = path.join(__dirname, "files", fileName);
    fs.writeFileSync(filePath, dateTime);
    res.status(200).json({
      message: `${dateTime} Created Succesfully`,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//To fetch the whole files from the folder name Files
app.get("/getFiles", (req, res) => {
  try {
    const folderPath = path.join(__dirname, "files"); // Define the folder path
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        res.status(500).json({ error: `folder not found` });
        return;
      }
      const textFiles = files.filter((file) => file.endsWith(".txt"));
      res.status(200).json({ files: textFiles });
    });
  } catch (error) {
    res.status(500).json({ error: `try after resolved the error to get` });
  }
});

//Declare for the port is opening and running
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("server is running on", PORT);
  }
});
