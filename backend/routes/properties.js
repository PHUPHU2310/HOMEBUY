const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const propertyController = require('../controllers/propertyController');
const { authenticate } = require('../middleware/authMiddleware');

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsDir = path.join(__dirname, '../uploads');
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB per file
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

// Property routes
router.get('/', propertyController.getAllProperties);
router.get('/:id', propertyController.getPropertyById);
router.post('/', authenticate, upload.array('images', 10), propertyController.createProperty);
router.put('/:id', authenticate, upload.array('images', 10), propertyController.updateProperty);
router.delete('/:id', authenticate, propertyController.deleteProperty);

module.exports = router;
