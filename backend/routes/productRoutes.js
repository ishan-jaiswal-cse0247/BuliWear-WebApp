import express from 'express';
import Product from '../models/productModel.js';
import multer from 'multer';
const productRouter = express.Router();
//const image = multer({ dest: '/assets/media/Product/' });

const storage = multer.diskStorage({
  destination: (req, File, callback) => {
    callback(null, '../frontend/public/assets/media/Product/');
  },
  filename: (req, File, callback) => {
    callback(null, File.originalname);
  },
});

const upload = multer({ storage: storage });

productRouter.get('/', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

productRouter.get('/id/:id', async (req, res) => {
  const product = await Product.findOne({ id: req.params.id });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

productRouter.post('/create', upload.single('image'), async (req, res) => {
  //console.log(req.body);
  //const imag = req.body.image.name;
  try {
    await Product.create({
      name: req.body.name,
      id: req.body.id,
      image: `/assets/media/Product/${req.file.originalname}`,
      brand: req.body.brand,
      link: req.body.link,
      size: req.body.size,
      labelsize: req.body.labelsize,
      idealfor: req.body.idealfor,
      description: req.body.description,
      price: req.body.price,
    });
  } catch (err) {
    res.json({ status: 'error', error: 'error' });
  }
});

productRouter.post('/delete', async (req, res) => {
  //console.log(req.body);
  try {
    await Product.deleteOne({
      id: req.body.id,
    });
    res.json({ status: 'ok' });
  } catch (err) {
    res.json({ status: 'error', error: 'Product Not found' });
  }
});

export default productRouter;
