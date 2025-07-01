import config from "../config/env"

const fileObjectUrl = (fileImage) => {
    try {
        console.log(fileImage, URL.createObjectURL(fileImage), 'fileObjectUrl')
        return URL.createObjectURL(fileImage)
    }
    catch (err) {
        return `${config.API_URL}${fileImage}`
    }
}

export default fileObjectUrl;