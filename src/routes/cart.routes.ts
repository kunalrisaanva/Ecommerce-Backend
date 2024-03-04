import { Router } from "express";
import { addToCart , 
    deleteAllPoducIntoCarts,
    removeToCartProdcuts, 
    getCartProducts
} from "../controllers/cart.controller.js"
import { verifyJwt } from "../middlewares/auth.middleware.js";



const router = Router()

router.use(verifyJwt)



router.route("/addToCart/:productId").post(addToCart);
router.route("/:productId").patch(removeToCartProdcuts).delete(deleteAllPoducIntoCarts);


router.route("/cart-products").get(getCartProducts);



export default router
