import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(file.fieldname === "epi"){
            return cb(null, "./uploads/episode")
        }else{
            return cb(null, "./uploads/img")
        }
    },
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}-ok_${file.originalname}`);
    }
})

export const upload = multer({ storage });