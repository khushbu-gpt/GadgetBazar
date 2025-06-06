import { AppError } from "../../shared/utils/AppError";
import { ProductModel } from "./product.model";
import * as Zod from "./product.validation";


export const getProductBySKUService = async (
  sku:string
) => {
  const products=await ProductModel.findOne({sku})
  if(!products) throw new AppError("sku not found",404)
  return products
};

export const createProductService = async (data: Zod.createProductZodType) => {
  return await ProductModel.create(data );
};

export const updateProductService = async (
  sku:string,
  data:Zod.updateProductZodType
) => {
  const updatedProducts= await ProductModel.findOneAndUpdate({sku}, data, { new: true });
 return updatedProducts
};

export const deleteProductServiceBySKU= async (
  sku: string
) => {
  return await ProductModel.findByIdAndDelete(sku);
};

export const createListOfProductService=async(
    data:Zod.createListOfProductZodType
)=>{
  return await ProductModel.insertMany(data)
}