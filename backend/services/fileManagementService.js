const fs = require("fs");

let fileManagementService = {

    deleteFile(fileName, filePath){
        fs.unlink(`public${filePath}${fileName}`, (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log('File is deleted.');
            }
        });
    }

}

export default fileManagementService;