import ProductModel from "../models/ProductModel.js";
import ProductStat from "../models/ProductStat.js";
import UserModel from "../models/UserModel.js";

export const getProducts = async (req,res) => {
    try{
        const products = await ProductModel.find();

        const productWithStats = await Promise.all(
            products.map(async (product) => {
                const stat = await ProductStat.find({
                    productId: product._id
                })
                return {
                    ...product._doc,
                    stat,
                }
            })
        );

        res.status(200).json(productWithStats);

    } catch(error){
        res.status(404).json({ message: error.message })
    }
}

export const getCustomers = async (req,res)  => {

    try{
        const customer = await UserModel.find({ role: "user" }).select("-password");
        res.status(200).json(customer)
    } catch(error){
        res.status(404).json({ message: error.message })
    }
}