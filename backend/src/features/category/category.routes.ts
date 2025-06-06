import { Router } from "express";
import { addCategory, getAllCategory, getSingeleCategory} from "./category.controller";

export const categoryRouter=Router()

categoryRouter.post("/",addCategory)
categoryRouter.get("/single",getSingeleCategory)
categoryRouter.get("/",getAllCategory)