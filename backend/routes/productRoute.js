const express = require('express')
const { createProduct, getaProduct, getAllProduct, updateProduct, 
    deleteProduct, rating, 
    getSlugProduct,
    searchProductController,
    getMyProducts} = 
    require('../controllers/productController')
const { isAdmin,authMiddleware} = require('../middlewares/authMiddleware')
const { uploadPhoto, productImgResize,  } = require('../middlewares/uploadImg')
const { saveAddress } = require('../controllers/userController')
const route = express.Router()

route.post('/add-product',authMiddleware,createProduct)
route.post('/rating',authMiddleware,rating)
route.get('/my-products', authMiddleware, getMyProducts);


route.get('/get-product/:id',getaProduct)
route.get('/search/:keyword',searchProductController)
route.get('/get-slug-product/:slug',getSlugProduct)
route.get('/getall-product',getAllProduct)


route.put('/update-product/:_id',authMiddleware,isAdmin,updateProduct)

route.delete('/delete-product/:_id',authMiddleware,isAdmin,deleteProduct)

module.exports = route