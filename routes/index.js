const express = require('express');
const router = express.Router();
const multer = require('multer');
const Picture = require('../models/pictures');

/* GET home page. */
// router.get('/', function (req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get("/", (req, res) => {
  Picture.find({}, (err, pictures) => {
    if (err) {
      next(err);
    } else {
      const data = {
        pictures: pictures
      }
      res.render("index", data);
    }
  });
})

const upload = multer({ dest: './public/uploads/' });

router
  .post('/uploads', upload.single('photo'), function (req, res) {

    const pic = new Picture({
      name: req.body.name,
      pic_path: `/uploads/${req.file.filename}`,
      pic_name: req.file.originalname
    });

    pic.save((err) => {
      res.redirect('/');
    });
  });

module.exports = router;
