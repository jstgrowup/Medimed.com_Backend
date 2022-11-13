const mongoose=require("mongoose")

const productSchema=new mongoose.Schema({
    userRefId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
        default:"636d14a35060cf90ea440bb9"},
    url:{type:String,required:true},
    off: {type:String,required:true},
    title:{type:String,required:true},
    mkt: {type:String,required:true},
    price: {type:String,required:true},
    Fprice: {type:String,required:true},
    date:{
        type:Date,
        default: new Date().toLocaleString()
    }

})

const ProductModel=mongoose.model("product",productSchema)

module.exports=ProductModel;