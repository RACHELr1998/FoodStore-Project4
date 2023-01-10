import dal from "./2-utils/dal";
dal.connect();

import express from "express";
import cors from "cors";
import catchAll from "./3-middleware/catch-all";
import routeNotFound from "./3-middleware/route-not-found";
import authController from "./6-controllers/auth-Controller";
import cartController from "./6-controllers/cart-Controller";
import productController from "./6-controllers/products-Controller";
import orderController from "./6-controllers/orders-controller";
import imagesController from "./6-controllers/images-controller";
import config from "./2-utils/config";
import expressFileUpload from "express-fileupload";

const server = express();

server.use(cors());
server.use(express.json());
server.use(expressFileUpload());
server.use("/api", authController);
server.use("/api", cartController);
server.use("/api", productController);
server.use("/api", orderController);
server.use("/api", imagesController);
server.use("*", routeNotFound);
server.use(catchAll);

server.listen(config.port, () =>
  console.log("Listening on http://localhost:" + config.port)
);
