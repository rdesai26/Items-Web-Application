import mongoose from 'mongoose';

const mongoConnectionString = process.env.mongoConnectionString;

(async () => {
    await mongoose.connect(mongoConnectionString);
  })();

  
const Schema = mongoose.Schema;

class Item {
    item;
    constructor(props) {
      const itemSchema = new Schema({
            id: {
              type: Number,
              required: true,
              unique: true
            },
            name: {
              type: String,
              required: true
            },
            price: {
              type: Number,
              required: true
            }
          }, {
            toObject: {
              transform: (doc, ret) => {
                delete ret._id;
              }
            },
            toJSON: {
              transform: (doc, ret) => {
                delete ret._id;
              }
            }
          }
      )

      this.item = mongoose.connection.model('items', itemSchema);
  }
  async get(id) {
    return this.item.findOne({id: id}).exec();
  }

  async list() {
    return this.item.find().exec();
  }

  async create(data) {
    return this.item.create((data));
  }

  async update(id,data) {
    return this.item.updateOne({id: id}, data).exec();
  }

  async delete(id) {
    let oldItem = await this.get(id);
    return oldItem.deleteOne();
  }

  close() {
    mongoose.disconnect();
  }

}

export default new Item();
