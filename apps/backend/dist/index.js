// src/index.ts
import express from "express";
import "dotenv/config";
import cors from "cors";

// src/shared/config/db.ts
import mongoose from "mongoose";
var connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) return console.error("\u274C No MONGODB_URI found");
  try {
    await mongoose.connect(process.env.MONGODB_URI || "");
    console.log("MONGOOSE IS CONNECTED");
  } catch (error) {
    console.error("DB connection error", error.message);
  }
};

// src/features/auth/auth.routes.ts
import { Router } from "express";

// src/shared/utils/AppError.ts
var AppError = class extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode <= 500 ? "fail" : "error";
    Error.captureStackTrace(this, this.constructor);
  }
};

// src/shared/utils/hashing.ts
import argon2 from "argon2";
async function hashPassword(text) {
  if (!text) throw new Error("Password is not hashed");
  return await argon2.hash(text);
}
async function verifyPassword(password, hashPassword2) {
  if (!password || !hashPassword2) throw new Error("Passwords are  not verified");
  return await argon2.verify(hashPassword2, password);
}

// src/shared/utils/jsontoken.ts
import jwt from "jsonwebtoken";
function generateRefreshToken({ email, uid, role }) {
  const refreshExpiry = process.env.JWT_REFRESH_EXPIRY || "30d";
  const secret = process.env.JWT_SECRET;
  if (!refreshExpiry) throw new AppError("Refresh Expiry is required");
  return jwt.sign({ email, uid, role, type: "REFRESH" }, secret, {
    expiresIn: refreshExpiry
  });
}
function generateAccessToken({ email, uid, role }) {
  const accessExpiry = process.env.JWT_EXPIRY_FORMAT || "1d";
  const secret = process.env.JWT_SECRET;
  if (!accessExpiry) throw new AppError("Access Expiry is required");
  return jwt.sign({ email, uid, role, type: "ACCESS" }, secret, {
    expiresIn: accessExpiry
  });
}
function generateLoginToken({ uid, email, role }) {
  const accessExpiry = process.env.JWT_EXPIRY_FORMAT || "1d";
  if (!accessExpiry) throw new AppError("Access Expiry is required");
  return {
    refreshToken: generateRefreshToken({ uid, email, role }),
    accessToken: generateAccessToken({ uid, email, role })
  };
}
function decodeToken(token) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT Secret is required");
  return jwt.verify(token, secret);
}

// src/features/auth/auth.model.ts
import mongoose2 from "mongoose";

// src/features/auth/auth.types.ts
var ROLE = /* @__PURE__ */ ((ROLE2) => {
  ROLE2["USER"] = "user";
  ROLE2["ADMIN"] = "admin";
  ROLE2["CLIENT"] = "client";
  return ROLE2;
})(ROLE || {});

// src/features/auth/auth.model.ts
var userSchema = new mongoose2.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  role: {
    type: String,
    enum: Object.values(ROLE),
    default: "user" /* USER */
  }
}, {
  timestamps: true
});
userSchema.pre("save", async function(next) {
  try {
    this.password = await hashPassword(this.password);
    next();
  } catch {
    next(new AppError("Unexpected Error!", 500));
  }
});
var UserModel = mongoose2.model("User", userSchema);

// src/features/auth/auth.service.ts
async function registerService(data) {
  const user = await UserModel.create(data);
  const { password: _password, ...rest } = user.toObject();
  return rest;
}
async function loginService(data) {
  const { email, password } = data;
  const user = await UserModel.findOne({ email }).lean();
  if (!user) throw new AppError("Invalid email or password", 404);
  const verifypassword = verifyPassword(password, user.password);
  if (!verifypassword) throw new AppError("password is Invalid", 400);
  const tokens = generateLoginToken(
    {
      email: user.email,
      uid: user._id.toString(),
      role: user.role
    }
  );
  if (!tokens) throw new AppError("Token Genrated Error", 500);
  const { password: _password, ...rest } = user;
  return { user: rest, tokens };
}

// src/shared/utils/sendResponse.ts
function sendResponse(resObj, res = {}) {
  const { data = null, status = "success", status_code = 200, message = "operation success" } = res;
  return resObj.status(status_code).json({
    data,
    status_code,
    message,
    status
  });
}

// src/features/auth/auth.controller.ts
async function registerUserController(req, res, next) {
  try {
    const user = await registerService(req.body);
    if (!user) next(new AppError("user not found", 400));
    sendResponse(res, {
      data: user,
      message: "user register success!",
      status_code: 201
    });
  } catch (error) {
    next(error);
  }
}
async function loginUserController(req, res, next) {
  try {
    const { user, tokens } = await loginService(req.body);
    if (!user) next(new AppError("Email is rerequired", 400));
    res.cookie("refresh-token", tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict"
    });
    sendResponse(res, {
      data: {
        user,
        accessToken: tokens.accessToken
      },
      message: "login success!"
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

// src/shared/middleware/validation.ts
import { ZodError } from "zod";
var zodValidation = (schema) => (req, res, next) => {
  try {
    if (schema.body) schema.body.parse(req.body);
    if (schema.query) schema.query.parse(req.query);
    if (schema.params) schema.params.parse(req.params);
    next();
  } catch (error) {
    console.error(error);
    if (error instanceof ZodError) {
      const errors = error.errors.map((e) => `${e.path.join(".")},${e.message}`);
      return next(new AppError(` ${errors}`, 400));
    }
    return next(new AppError("Validation failed"));
  }
};

// src/features/auth/auth.validation.ts
import { z } from "zod";
var registerSchema = z.object({
  name: z.string().min(2, "Name must be at least two character").trim(),
  email: z.string().email("Invalid email format").min(1, "Email is required").trim(),
  password: z.string().min(6, "Minimum 6  letter is required"),
  phone: z.string().min(9, "must be at least 9 digits").optional()
});
var loginSchema = z.object({
  email: z.string().email("Invalid email format").min(1, "Email is required").trim(),
  password: z.string().min(6, "Minimum 6 letter is required")
});

// src/features/auth/auth.routes.ts
var authRouter = Router();
authRouter.post("/register", zodValidation({ body: registerSchema }), registerUserController);
authRouter.post("/login", zodValidation({ body: loginSchema }), loginUserController);

// src/features/uploader/cloudinary.routes.ts
import { Router as Router2 } from "express";

// src/shared/middleware/uploadImage.ts
import multer from "multer";
var storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
var upload = multer({ storage });

// src/features/uploader/cloudinary.controller.ts
import fs from "fs";

// src/shared/config/cloudconfig.ts
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// src/features/uploader/cloudinary.controller.ts
async function uploadImage(req, res) {
  try {
    const filepath = req.file?.path;
    console.log(filepath);
    if (!filepath) throw new Error("Image is required!");
    const result = await cloudinary.uploader.upload(filepath, {
      folder: "uploads"
    });
    fs.unlinkSync(filepath);
    res.json({
      message: "Image uploaded from cloudinary",
      url: result.secure_url,
      publicId: result.public_id
    });
  } catch {
    res.status(500).json({ message: "Image upload failed" });
  }
}
async function uploadMultipleImages(req, res, next) {
  try {
    const files = req.files;
    if (!files || !files.length) throw new Error(" At least One Image is required!");
    const uploadResults = await Promise.all(
      files?.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, { folder: "uploads" });
        fs.unlinkSync(file.path);
        return { url: result.secure_url, publicId: result.public_id };
      })
    );
    res.json({
      message: "Image uploaded from cloudinary",
      images: uploadResults
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}
async function deleteImage(req, res) {
  try {
    const { publicId } = req.query;
    console.log(publicId);
    if (!publicId || typeof publicId !== "string") {
      throw new Error("publicId not found or invalid!");
    }
    const result = await cloudinary.uploader.destroy(publicId);
    res.json({ message: "Image deleted success!", result });
  } catch (error) {
    console.error(error);
  }
}

// src/features/uploader/cloudinary.routes.ts
var uploadRouter = Router2();
uploadRouter.post("/upload", upload.single("image"), uploadImage);
uploadRouter.post("/uploads", upload.array("images", 4), uploadMultipleImages);
uploadRouter.delete("/delete", deleteImage);

// src/features/product/products.routes.ts
import { Router as Router3 } from "express";

// src/features/product/product.model.ts
import mongoose3 from "mongoose";
var productSchema = new mongoose3.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true, min: [0, "MRP cannot be negative"] },
    image: { type: String, required: true },
    category: {
      type: String,
      required: true
    },
    description: String,
    mrp: { type: Number, min: [0, "MRP cannot be negative"] },
    variants: [
      {
        color: String,
        size: String,
        stock: Number
      }
    ],
    discount: {
      type: Number,
      min: [0, "can't ne negative"],
      max: [100, "Discount can't exceed 100%"]
    },
    sku: {
      type: String,
      required: [true, "SKU is required"],
      unique: true,
      trim: true,
      uppercase: true
    }
  },
  {
    timestamps: true
  }
);
var ProductModel = mongoose3.model("Product", productSchema);

// src/features/product/products.service.ts
var getProductBySKUService = async (sku2) => {
  const products = await ProductModel.findOne({ sku: sku2 });
  if (!products) throw new AppError("sku not found", 404);
  return products;
};
var createProductService = async (data) => {
  return await ProductModel.create(data);
};
var updateProductService = async (sku2, data) => {
  const updatedProducts = await ProductModel.findOneAndUpdate({ sku: sku2 }, data, { new: true });
  return updatedProducts;
};
var deleteProductServiceBySKU = async (sku2) => {
  return await ProductModel.findByIdAndDelete(sku2);
};
var createListOfProductService = async (data) => {
  return await ProductModel.insertMany(data);
};

// src/features/product/products.controller.ts
async function createProduct(req, res, next) {
  try {
    const products = await createProductService(req.body);
    if (!products) next(new AppError("products not found", 404));
    sendResponse(res, {
      message: "New product created",
      data: products,
      status_code: 201
    });
  } catch (error) {
    next(error);
  }
}
async function getProductBySKU(req, res, next) {
  try {
    const { sku: sku2 } = req.params;
    const product = await getProductBySKUService(sku2);
    if (!product) throw new AppError("products not found", 404);
    sendResponse(res, { message: "products retrieved", data: product });
  } catch (error) {
    next(error);
  }
}
async function deleteProductBySKU(req, res, next) {
  try {
    const { sku: sku2 } = req.params;
    const products = await deleteProductServiceBySKU(sku2);
    if (!products) next(new AppError("products not found", 404));
    sendResponse(res, {
      message: "products deleted success!",
      data: products
    });
  } catch (error) {
    next(error);
  }
}
async function updateProduct(req, res, next) {
  try {
    const data = req.body;
    const { sku: sku2 } = req.params;
    const updatedProducts = await updateProductService(sku2, data);
    sendResponse(res, {
      message: "Product Updated",
      data: updatedProducts
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
}
async function createListOfProduct(req, res, next) {
  try {
    const listOfProduct = await createListOfProductService(req.body);
    if (!listOfProduct) next(new AppError("products not found", 404));
    sendResponse(res, {
      message: "New productList  created",
      data: listOfProduct,
      status_code: 201
    });
  } catch (error) {
    next(error);
  }
}
async function getProductsByCategory(req, res, next) {
  try {
    const { category, title } = req.query;
    const filter = {};
    if (category) {
      filter.category = category;
    }
    if (title) {
      filter.title = { $regex: title, $options: "i" };
    }
    const products = await ProductModel.find(filter);
    if (!products || products.length === 0) {
      throw new AppError("products not found", 404);
    }
    sendResponse(res, { message: "products retrieved", data: products });
  } catch (error) {
    next(error);
  }
}

// src/features/product/product.validation.ts
import { z as z2 } from "zod";
var sku = z2.string().min(1, "SKU is required").regex(/^[A-Z0-9-]+$/, "Must be included uppercase");
var createProductSchema = z2.object({
  title: z2.string().min(2, "Title is required"),
  image: z2.string().url("Image should be valid"),
  category: z2.string(),
  description: z2.string().optional(),
  price: z2.number().positive("Price must be positive."),
  mrp: z2.number().positive("Price must be positive.").optional(),
  sku
});
var variantSchema = z2.object({
  size: z2.string().min(1, "Size is required"),
  stock: z2.number().min(0, "Stock can't be negative"),
  color: z2.string().min(2, "Color is required")
});
var updateProductSchema = z2.object({
  ...createProductSchema.shape,
  variants: z2.array(variantSchema).optional()
});
var deleteProductSchema = z2.object({
  sku
});
var getProductSchema = z2.object({ sku });
var createListOfProductScema = z2.array(createProductSchema);

// src/features/product/products.routes.ts
var productRouter = Router3();
productRouter.post(
  "/",
  zodValidation({ body: createProductSchema }),
  createProduct
);
productRouter.get(
  "/:sku",
  zodValidation({ params: getProductSchema }),
  getProductBySKU
);
productRouter.delete(
  "/:sku",
  zodValidation({ params: deleteProductSchema }),
  deleteProductBySKU
);
productRouter.put(
  "/:sku",
  zodValidation({ body: updateProductSchema, params: getProductSchema }),
  updateProduct
);
productRouter.post(
  "/bulk",
  zodValidation({ body: createListOfProductScema }),
  createListOfProduct
);
productRouter.get("/", getProductsByCategory);

// src/features/category/category.routes.ts
import { Router as Router4 } from "express";

// src/features/category/category.model.ts
import mongoose4, { model, Schema } from "mongoose";
var categorySchema = new Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  parent: {
    type: mongoose4.Schema.Types.ObjectId,
    ref: "Category",
    default: null
  }
}, {
  timestamps: true
});
var CategoryModel = model("Category", categorySchema);

// src/features/category/category.controller.ts
async function addCategory(req, res, next) {
  try {
    const { name, slug } = req.body;
    const category = await CategoryModel.create({ name, slug });
    if (!category) next(new AppError("name and slug is required"));
    sendResponse(res, {
      data: category,
      message: "category created successful!",
      status_code: 201
    });
  } catch (error) {
    next(error);
  }
}
async function getSingeleCategory(req, res, next) {
  try {
    const { slug } = req.query;
    const category = await CategoryModel.findOne({ slug });
    if (!category) return next(new AppError("category not found"));
    sendResponse(res, {
      data: category,
      message: "category found successfull!",
      status_code: 200
    });
  } catch (error) {
    next(error);
  }
}
async function getAllCategory(req, res, next) {
  try {
    const category = await CategoryModel.find({});
    if (!category) return next(new AppError("category not found"));
    sendResponse(res, {
      data: category,
      message: "category found successfull!",
      status_code: 200
    });
  } catch (error) {
    next(error);
  }
}

// src/features/category/category.routes.ts
var categoryRouter = Router4();
categoryRouter.post("/", addCategory);
categoryRouter.get("/", getSingeleCategory);
categoryRouter.get("/", getAllCategory);

// src/shared/middleware/errorHandler.ts
import mongoose5 from "mongoose";
function errorHandler(err, _req, res) {
  let statusCode = 500;
  let message = "Something went wrong";
  let status = "error";
  if (err?.code === 11e3) {
    statusCode = 400;
    message = "Email already exists";
    status = "fail";
  } else if (err instanceof AppError) {
    statusCode = err.statusCode || 500;
    message = err.message;
    status = err.status || "error";
  } else if (err instanceof mongoose5.Error) {
    statusCode = 400;
    message = err.message;
    status = "fail";
  }
  return res.status(statusCode).json({
    status,
    success: false,
    message
  });
}

// src/features/address/address.routes.ts
import { Router as Router5 } from "express";

// src/features/address/address.model.ts
import mongoose6, { model as model2, Schema as Schema2 } from "mongoose";
var addressBaseSchema = new Schema2({
  fullname: { type: String, required: true },
  address1: {
    type: String,
    required: true
  },
  address2: String,
  phone: {
    type: String,
    required: true
  },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, default: "India" },
  pincode: {
    type: String,
    required: true
  }
}, {
  _id: false
});
var addressSchema = new Schema2(
  {
    uid: {
      type: mongoose6.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    address: addressBaseSchema
  },
  {
    timestamps: true
  }
);
var AddressModel = model2("Address", addressSchema);

// src/features/address/address.service.ts
var createAddress = async (data) => {
  return await AddressModel.create(data);
};
var getAddressById = async (id) => {
  return await AddressModel.findById(id);
};
var getAddress = async (uid) => {
  const address = await AddressModel.find({ id: uid }).lean();
  if (!address) throw new AppError("Address not found", 400);
  return address;
};
var updateAddress = async (data, id) => {
  const address = await AddressModel.findByIdAndUpdate(id, data, { new: true });
  if (!address) throw new AppError("Address not found", 400);
  return address;
};
var deleteAddress = async (id) => {
  const address = await AddressModel.findByIdAndDelete(id);
  if (!address) throw new AppError("Address not found", 404);
  return address;
};

// src/features/address/address.controller.ts
async function createAddressController(req, res, next) {
  try {
    const newaddress = await createAddress(req.body);
    sendResponse(res, {
      data: newaddress,
      status_code: 201,
      message: "Address created!"
    });
  } catch (error) {
    next(error);
  }
}
async function updateAddressController(req, res, next) {
  try {
    const { id } = req.params;
    const updateAddress3 = await updateAddress(req.body, { id });
    if (!updateAddress3) next(new AppError("Address is required!", 400));
    sendResponse(res, {
      data: updateAddress3,
      status_code: 200,
      message: "Address updated!"
    });
  } catch {
    next(new AppError("update Address failed", 500));
  }
}
async function getAddressController(req, res, next) {
  try {
    const { uid } = req.params;
    const Address = await getAddress(uid);
    if (!Address) next(new AppError("Address not found!", 404));
    sendResponse(res, {
      data: Address,
      status_code: 200,
      message: "Address retrieve!"
    });
  } catch {
    next(new AppError("Address retrieve failed", 500));
  }
}
async function getAddressByIdController(req, res, next) {
  try {
    const { id } = req.params;
    const Address = await getAddressById({ id });
    if (!Address) next(new AppError("Address not found!", 400));
    sendResponse(res, {
      data: Address,
      status_code: 200,
      message: "Address retrieve!"
    });
  } catch {
    next(new AppError("Address retrieve failed", 500));
  }
}
async function deleteAddressController(req, res, next) {
  try {
    const { id } = req.params;
    const Address = await deleteAddress({ id });
    if (!Address) next(new AppError("Address not found!", 404));
    sendResponse(res, {
      data: Address,
      status_code: 200,
      message: "Address retrieve!"
    });
  } catch {
    next(new AppError("Address retrieve failed"));
  }
}

// src/features/address/address.validation.ts
import { z as z3 } from "zod";
var addressSchema2 = z3.object({
  fullname: z3.string().min(3, "Fullname is required"),
  phone: z3.string().regex(/^\d{9}$/, "phone num must be 9 digits"),
  city: z3.string().min(3, "City is required"),
  state: z3.string().min(3, "State is required"),
  country: z3.string().optional(),
  address1: z3.string().min(3, "Address1 is required"),
  address2: z3.string().min(3, "Address 2 ").optional(),
  pincode: z3.string().regex(/^[1-9]{6}$/, "Pincode must be a valid 6-digit number")
});
var createAddressSchema = z3.object({
  uid: z3.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId format"),
  address: addressSchema2
});
var getAddressByUid = z3.object({
  uid: z3.string().regex(/^[a-f\d]{24}$/i, "uid sould be valid")
});
var updateAddress2 = addressSchema2.partial();
var getAddressById2 = z3.object({
  id: z3.string().regex(/^[a-f\d]{24}$/i, "Id sould be valid")
});

// src/features/address/address.routes.ts
var addressRouter = Router5();
addressRouter.post(
  "/",
  zodValidation({ body: createAddressSchema }),
  createAddressController
);
addressRouter.get("/:uid", getAddressController);
addressRouter.get(
  "/:id",
  zodValidation({ params: getAddressById }),
  getAddressByIdController
);
addressRouter.put(
  "/:id",
  zodValidation({
    params: getAddressById,
    body: updateProductSchema
  }),
  updateAddressController
);
addressRouter.delete(
  "/:id",
  zodValidation({ params: getAddressById }),
  deleteAddressController
);

// src/features/cart/cart.routes.ts
import { Router as Router6 } from "express";

// src/shared/middleware/verifyTokenMiddleware.ts
var VerifyAccessTokenMiddleWare = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new AppError("Unauthorized: No token provided", 401));
    }
    const token = authHeader.split(" ")[1];
    const decoded = decodeToken(token);
    req.user = decoded;
    next();
  } catch {
    next(new AppError("Invalid or expired token", 401));
  }
};

// src/features/cart/cart.service.ts
import { Types } from "mongoose";

// src/features/cart/cart.model.ts
import mongoose7, { model as model3, Schema as Schema3 } from "mongoose";
var CartItemSchema = new Schema3(
  {
    productId: { type: mongoose7.Schema.Types.ObjectId, ref: "Product", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    image: { type: String },
    quantity: { type: Number, required: true },
    variant: { type: String }
  },
  { _id: false }
);
var cartSchema = new Schema3(
  {
    user: {
      type: mongoose7.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    items: { type: [CartItemSchema], required: true, default: [] },
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    discount: { type: Number, required: true },
    totalPrice: { type: Number, required: true }
  },
  {
    timestamps: true,
    autoIndex: true
  }
);
var CartModel = model3("Cart", cartSchema);

// src/features/cart/cart.service.ts
var TAX = 0.18;
var createCartService = async (productId, quantity, userId) => {
  if (!Types.ObjectId.isValid(productId))
    throw new AppError("Invalid product ID", 400);
  const product = await ProductModel.findById(productId);
  if (!product) throw new AppError("Product not found", 404);
  let cart = await CartModel.findOne({ user: userId });
  const price = product.price;
  const itemSubtotal = price * quantity;
  const itemDiscount = (product.discount || 0) * quantity;
  const newItem = {
    productId: new Types.ObjectId(productId),
    name: product.title,
    price,
    image: product.image,
    quantity,
    subtotal: itemSubtotal
  };
  if (!cart) {
    const tax = itemSubtotal * TAX;
    const total = itemSubtotal + tax - itemDiscount;
    cart = await CartModel.create({
      user: userId,
      items: [newItem],
      subtotal: itemSubtotal,
      tax,
      discount: itemDiscount,
      totalPrice: total
    });
    return cart;
  }
  const alreadyExists = cart.items.some(
    (item) => item.productId.equals(productId)
  );
  if (alreadyExists) {
    throw new AppError("Product already in cart", 409);
  }
  cart.items.push(newItem);
  cart.subtotal = cart.items.reduce((sum, item) => sum + item.subtotal, 0);
  cart.tax = cart.subtotal * TAX;
  cart.discount = 0;
  cart.totalPrice = cart.subtotal + cart.tax - cart.discount;
  await cart.save();
  return cart;
};
var updateCartService = async (productId, quantity, userId) => {
  if (!Types.ObjectId.isValid(productId)) throw new AppError("Invalid Product ID", 400);
  const cart = await CartModel.findOne({ user: userId });
  if (!cart) throw new AppError("Cart not found", 404);
  const itemIndex = cart.items.findIndex((item) => item.productId.equals(productId));
  if (itemIndex === -1) throw new AppError("Product not found in cart", 404);
  if (quantity <= 0) {
    cart.items.splice(itemIndex, 1);
  } else {
    const item = cart.items[itemIndex];
    item.quantity = quantity;
    item.subtotal = item.price * quantity;
  }
  cart.subtotal = cart.items.reduce((sum, i) => sum + i.subtotal, 0);
  cart.tax = cart.subtotal * TAX;
  cart.discount = 0;
  cart.totalPrice = cart.subtotal + cart.tax - cart.discount;
  await cart.save();
  return cart;
};
var getCartService = async (userId) => {
  const cart = await CartModel.findOne({ user: userId }).populate("items.productId");
  if (!cart) throw new AppError("Cart not found!", 404);
  return cart;
};
var deleteCartService = async (userId) => {
  const cart = await CartModel.findOneAndDelete({ user: userId }).populate("items.productId");
  if (!cart) throw new AppError("Cart not found!", 404);
  return cart;
};

// src/features/cart/cart.controller.ts
var getCartController = async (req, res, next) => {
  try {
    const userId = req.user?.uid;
    if (!userId) return next(new AppError("User ID missing in token", 401));
    const cart = await getCartService(userId);
    sendResponse(res, {
      status_code: 200,
      data: cart,
      message: "cart retrieved successfully!"
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
var deleteCartController = async (req, res, next) => {
  try {
    const userId = req.user?.uid;
    if (!userId) return next(new AppError("User ID missing in token", 401));
    const cart = await deleteCartService(userId);
    sendResponse(res, {
      message: "product  removed from cart!",
      status_code: 200,
      data: cart
    });
  } catch (error) {
    next(error);
  }
};
var createCartController = async (req, res, next) => {
  try {
    const userId = req.user?.uid;
    if (!userId) return next(new AppError("User ID missing in token", 401));
    const { productId, quantity } = req.body;
    if (!productId) return next(new AppError("Product ID is required", 400));
    const cart = await createCartService(productId, quantity, userId);
    sendResponse(res, {
      data: cart,
      message: "Product added successfully!",
      status_code: 201
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
var updateCartController = async (req, res, next) => {
  try {
    const userId = req.user?.uid;
    console.log("userId", userId);
    if (!userId) return next(new AppError("User ID missing in token", 401));
    const { productId, quantity } = req.body;
    console.log(productId, quantity);
    if (!productId) return next(new AppError("Product ID is required", 400));
    const cart = await updateCartService(productId, quantity, userId);
    sendResponse(res, {
      data: cart,
      message: "Product updated successfully!",
      status_code: 200
    });
  } catch (error) {
    next(error);
  }
};

// src/features/cart/cart.routes.ts
var cartRouter = Router6();
cartRouter.get("/", VerifyAccessTokenMiddleWare, getCartController);
cartRouter.post("/", VerifyAccessTokenMiddleWare, createCartController);
cartRouter.delete("/", VerifyAccessTokenMiddleWare, deleteCartController);
cartRouter.put("/update", VerifyAccessTokenMiddleWare, updateCartController);

// src/index.ts
var app = express();
var PORT = process.env.PORT || 5e3;
app.use(cors({ origin: ["http://localhost:3000"] }));
app.use(express.json());
app.use("/auth", authRouter);
app.use("/", uploadRouter);
app.use("/products", productRouter);
app.use("/categories", categoryRouter);
app.use("/address", addressRouter);
app.use("/cart", cartRouter);
app.use(errorHandler);
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING AT ${PORT}`);
  });
}).catch((error) => {
  console.error("Server connection failed", error.message);
});
//# sourceMappingURL=index.js.map
