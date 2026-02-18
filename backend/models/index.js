import { readdirSync } from 'fs';
import { join, dirname } from 'path'; // Use 'path' instead of 'url'
import { fileURLToPath } from 'url';
import { Sequelize, DataTypes } from 'sequelize';
import config from '../config/config.js';

// Use fileURLToPath and dirname to get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: 'postgres',
  }
);


const db = {};

const importModels = async () => {
  const files = readdirSync(__dirname);

  for (const file of files) {
    if (file.indexOf('.') !== 0 && file !== 'index.js' && file.slice(-3) === '.js') {
      const modelPath = join(__dirname, file);
      const { default: model } = await import(modelPath);
      const modelName = file.slice(0, -3);
      db[modelName] = model(sequelize, DataTypes);
    }
  }

  console.log('Loaded models: ', Object.keys(db));
  console.log("Is Verb available? ", !!db.Verb);


};

importModels();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

sequelize
  .sync({ force: false }) // Be cautious with `force: true` as it will drop tables
  .then(() => {
    console.log('Database & tables created!');
  });

export { sequelize, db };
