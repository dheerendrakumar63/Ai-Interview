const multer = require("multer");

// Memory Storage
const storage = multer.memoryStorage();

// Only PDF
const fileFilter = (req, file, cb) => {

    if (file.mimetype === "application/pdf") {

        cb(null, true);

    } else {

        cb(new Error("Only PDF files are allowed"), false);

    }

};

const upload = multer({

    storage,

    fileFilter,

    limits: {

        fileSize: 5 * 1024 * 1024,

    },

});

module.exports = upload;