import multer from 'multer'
let storagre  = multer.diskStorage({
    destination : function(req,file,cb) {
        cb(null,'./src/uploads');
    }, 
    filename : function(req,file,cb) {
        cb(null,file.fieldname + "_"+ Date.now()+ "_" + file.originalname);
    }
})
export let upload = multer({
    storage : storagre,
}).single("image")