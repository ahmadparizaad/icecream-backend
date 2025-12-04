const express = require("express");
const app = express();
// Load local .env for development only
if (process.env.NODE_ENV !== "production") {
  try {
    require("dotenv").config();
  } catch (e) {
    // dotenv may not be installed in production
  }
}
const serverless = require("serverless-http");
var multer = require("multer");
var forms = multer();
var DB = require("./Connection.js");
app.use(express.json());
// const mongoose = require("mongoose");
// --------------------------------------------------- IMPORT ROUTES
const BusinessCategoryRoutes = require("./Routes/BusinessCategory.routes");
const BusinessSubCategoryRoutes = require("./Routes/BusinessSubCategory.routes");
const DesignationRoutes = require("./Routes/Designation.routes");
const DeskRoutes = require("./Routes/Desk.routes");
const UomRoutes = require("./Routes/Uom.routes");
const SecondaryUOM = require("./Routes/SecondaryUom.routes");
const ProductCategoryRoutes = require("./Routes/ProductCategory.routes");
const ProductSubCategory = require("./Routes/PrductSubCategory.routes");
const authRoutes = require("./Routes/AuthenticationRoutes");
const MainEnquiry = require("./Routes/Enquiry routes/Main.enquiry.routes");
const ProductEnquiry = require("./Routes/Enquiry routes/Product.enquiry.routes");
const MemberEnquiry = require("./Routes/Enquiry routes/MemberEnquiry.routes");
const Package = require("./Routes/Packages/Package.routes");
const AdsPackage = require("./Routes/Packages/Advertiesement.Routes.js");
const Product = require("./Routes/Product.routes");
const Advertisement = require("./Routes/Advertisement.routes");
const NewsRoutes = require("./Routes/News.Routes.js");

const userRoutes = require("./Routes/UserRoutes");
const BlogRoutes = require("./Routes/BlogRoutes");
const FaqRoutes = require("./Routes/FaqRoutes");
const ChatRoutes = require("./Routes/Chat.Routes.js");
const SubCAtegory = require("./Routes/SubCategoriesRoutes");
// ----------------------------------------------------------------------------------------------

// -------------------------------------------------------- API VALIDATIONS-----------------------
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json({ limit: "50mb" }));

var cors = require("cors");
app.use(cors({ origin: true, credentials: true }));
app.use(function (req, res, next) {
  console.log(req._parsedUrl.path, "----<<<<<<<<<<<Current ");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// ---------------------------------------------------------------------

//-------------------------------------------------------------------------  define Routes
app.use("/designation", DesignationRoutes);
app.use("/business", BusinessCategoryRoutes);
app.use("/business-subcategory", BusinessSubCategoryRoutes);
app.use("/desk", DeskRoutes);
app.use("/uom", UomRoutes);
app.use("/secondary-uom", SecondaryUOM);
app.use("/product-category", ProductCategoryRoutes);
app.use("/product-subcategory", ProductSubCategory);
app.use("/enquiry/main", MainEnquiry);
app.use("/enquiry/product", ProductEnquiry);
app.use("/enquiry/member", MemberEnquiry);
app.use("/product", Product);
app.use("/package", Package);
app.use("/ads-package", AdsPackage);
app.use("/advertisement", Advertisement);
app.use("/News", NewsRoutes);

app.use("/auth", authRoutes);
app.use("/chat", ChatRoutes);
app.use("/user", userRoutes);
app.use("/blog", BlogRoutes);
// app.use("/faq", FaqRoutes);
app.use("/sub-category", SubCAtegory);
// ------------------------------------------------------

// Export as serverless handler for platforms like Vercel
module.exports = serverless(app);

// Fallback: when running locally (node index.js), start the server
if (require.main === module) {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`server running at port ${port}`);
  });
}
