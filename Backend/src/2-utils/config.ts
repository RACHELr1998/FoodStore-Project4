import path from "path";

class Config {
  public connectionString = "mongodb://127.0.0.1:27017/FoodStore";
  public port = 3001;
  public imagesFolder = path.resolve(__dirname, "..", "1-assets", "images");
}

const config = new Config();

export default config;
