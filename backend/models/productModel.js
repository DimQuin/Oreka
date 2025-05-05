const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim : true
    },
    
    slug:{
        type:String,
        required:true,
        unique:true,
        lowercase : true
    },
    descriptionShort:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    priceSale:{
        type:Number,
        default:0,
    },
    category:{
        type:String,
        required : true
    },
    type:{
        type:String,
        required : true,
        enum:["Mới","Như mới","Tốt","Trung bình","Kém"],
    },
    location: {
        type: String,
        required: true,
        enum: [
          "Hà Nội", "Thành phố Hồ Chí Minh", "Đà Nẵng", "Hải Phòng", "Cần Thơ",
          "An Giang", "Bà Rịa – Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu",
          "Bắc Ninh", "Bến Tre", "Bình Định", "Bình Dương", "Bình Phước",
          "Bình Thuận", "Cà Mau", "Cao Bằng", "Đắk Lắk", "Đắk Nông", "Điện Biên",
          "Đồng Nai", "Đồng Tháp", "Gia Lai", "Hà Giang", "Hà Nam", "Hà Tĩnh",
          "Hải Dương", "Hậu Giang", "Hòa Bình", "Hưng Yên", "Khánh Hòa",
          "Kiên Giang", "Kon Tum", "Lai Châu", "Lâm Đồng", "Lạng Sơn", "Lào Cai",
          "Long An", "Nam Định", "Nghệ An", "Ninh Bình", "Ninh Thuận", "Phú Thọ",
          "Phú Yên", "Quảng Bình", "Quảng Nam", "Quảng Ngãi", "Quảng Ninh",
          "Quảng Trị", "Sóc Trăng", "Sơn La", "Tây Ninh", "Thái Bình",
          "Thái Nguyên", "Thanh Hóa", "Thừa Thiên Huế", "Tiền Giang", "Trà Vinh",
          "Tuyên Quang", "Vĩnh Long", "Vĩnh Phúc", "Yên Bái"
        ]
    },
    brand :{
        type : String,
        required : true
    },
    countBy:{
        type : Number,
        default : 0,
    },
    images :[{
        public_id:String,
        url:String
    }],
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    ratings: [
        {
            star: Number,
            comment: String,
            postedby: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        },
    ],
    totalrating: {
        type: String,
        default: 0,
    },
},{timestamps:true});

//Export the model
module.exports = mongoose.model('Product', productSchema);