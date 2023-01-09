import {body} from 'express-validator'

export const registerValidations = [
    body("fullname").not().isEmpty().trim().escape().withMessage("fullname is required"),
    body("username").not().isEmpty().trim().isLength({max:20}).escape().toLowerCase().withMessage("username is required"),
    body("email").isEmail().normalizeEmail().trim().escape().withMessage("email is required"),
    body("password").isLength({min:5}).withMessage("password should be 5 characters long")
]

export const loginValidations = [
    body("email").isEmail().normalizeEmail().trim().escape().withMessage("email is required"),
    body("password").not().isEmpty().withMessage("password is required")
]
 