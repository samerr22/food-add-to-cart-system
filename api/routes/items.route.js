import  express  from "express";
import { Cartcrete, CheckOutcrete, deleteItems, deleteItemss, getAllItems, getCartItem, getcheckdetails, Itcreate } from "../controllers/items.controller.js";

const router = express.Router();

router.post('/Icreate',Itcreate );
router.get('/IgetAll', getAllItems);
router.post('/Ccreate',Cartcrete );
router.get('/CgetAll/:CurrentuserId', getCartItem);
router.delete('/deletes/:itemsId',deleteItems);
router.delete('/deletesall/:CurrentuserId',deleteItemss);
router.post('/Ocreate',CheckOutcrete );
router.get('/getallcheck/:CurrentuserId', getcheckdetails);


export default router;