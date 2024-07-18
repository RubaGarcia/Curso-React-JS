import { Router } from "express"
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product"
import {body, param} from 'express-validator'
import { handleInputErrors } from "./middleware"


const router = Router()

router.get("/",getProducts)
router.get("/:id",
    param('id').isInt().withMessage('Id must be an integer'),
    handleInputErrors,
    getProductById
)

router.post("/",
    body('name')
                .notEmpty().withMessage('Name is required'),
    body('price')
                .isNumeric().withMessage('Price must be a number')
                .notEmpty().withMessage('Price is required')
                .custom(value=> value > 0).withMessage('Price must be greater than 0'),
    handleInputErrors,
    createProduct
)

router.put("/:id",
    body('name')
                .notEmpty().withMessage('Name is required'),
    body('price')
                .isNumeric().withMessage('Price must be a number')
                .notEmpty().withMessage('Price is required')
                .custom(value=> value > 0).withMessage('Price must be greater than 0'),
    body('availability')
                .isBoolean().withMessage('Availability must be a boolean'),
    handleInputErrors,
    updateProduct
)

router.patch('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    updateAvailability
)

router.delete('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    deleteProduct
)

export default router