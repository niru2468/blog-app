const router = require('express').Router();
const { getAllPosts, getSinglePost, addPost, updatePost, deletePost } = require('../controller/posts');
const multer = require('multer');
const upload = multer({ dest: 'uploads' });
router.get('/', getAllPosts);
router.get('/:pid', getSinglePost);
router.post('/', upload.single("img"), addPost);
router.put('/:pid', upload.single("img"), updatePost);
router.delete('/:pid', deletePost);

module.exports = router;
