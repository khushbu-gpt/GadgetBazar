import { Router } from "express";
import { addCategory} from "./category.controller";

export const categoryRouter=Router()

categoryRouter.post("/",addCategory)