export const imageValidation = (attachment) => {
    const specialCharRegex = /[!@#$%^&*":{}<>]/
    let error = {};
    let validFile = ["png", "gif", "jpeg", "jpg", "mp4"]
    if (attachment.length > 1) {
        console.log("attachment", attachment.length);
        attachment.map((file) => {
            var filesize = file.size;
            var fileExtention = file.name.split(".")
            console.log("filetype", fileExtention);
            const fileType = file.name.split(".")[file.name.split(".").length - 1]
            console.log("filetype", typeof (fileType));
            if (!validFile.some((val) => fileType?.includes(val))) {
                error["ChatImage"] = "Select Valid File";
            } else if (filesize > 3000000 || filesize < 2) {                       //3000 kb in bytes 3000000
                error["ChatImage"] = "Image Size should be less than 3000 Kb";
            } else if (fileExtention.length > 2) {
                error["ChatImage"] = "Select Valid File";
            } else if (specialCharRegex.test(fileExtention[0])) {
                error["ChatImage"] = "Select Valid file with valid file name"
            } else if (file.name.length > 15) {
                error["ChatImage"] = "Select Valid file with valid file name"
            }
        })
    }
    else {
        var filesize = attachment.size;
        var fileExtention = attachment.name.split(".")
        console.log("fileExtention", fileExtention);
        const fileType = attachment.name.split(".")[attachment.name.split(".").length - 1]
        if (!validFile.some((val) => fileType?.includes(val))) {
            error["ChatImage"] = "Select Valid File";
        } else if (filesize > 3000000) {
            error["ChatImage"] = "Image Size should be less than 3000 Kb";
        } else if (fileExtention.length > 2) {
            error["ChatImage"] = "Select Valid File";
        } else if (specialCharRegex.test(fileExtention[0])) {
            error["ChatImage"] = "Select Valid file with valid file name"
        } else if (attachment.name.length > 15) {
            error["ChatImage"] = "Select Valid file with valid file name"
        }
    }
    return Object.keys(error).length > 0 ? error : { status: true, files: attachment }
}