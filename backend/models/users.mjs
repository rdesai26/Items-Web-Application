import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const mongoConnectionString = process.env.mongoConnectionString;

(async () => {
    await mongoose.connect(mongoConnectionString);
})();

const Schema = mongoose.Schema;

class User {
    user;
    #saltRounds = 10;

constructor(props) {
    const userSchema = new Schema({
            username: {
                type: String,
                required: true,
                unique: true
            },
            password: {
                type: String,
                required: true
            },
            firstName: {
                type: String,
                required: true
            },
            lastName: {
                type: String,
                required: true
            },
            dateCreated: {
                type: Date,
                default: Date.now
            }
        }, {
            toObject: {
                transform: (doc, ret) => {
                    delete ret._id;
                    delete ret.password;
                }
            },
            toJSON: {
                transform: (doc, ret) => {
                    delete ret._id;
                    delete ret.password;
                }
            }
        }
    )

    this.user = mongoose.connection.model('users', userSchema);
}
    async get(username) {
        return this.user.findOne({username: username}).exec();
    }

    async list() {
        return this.user.find().exec();
    }

    async create(data) {
    console.log("create", data);
        if (data.hasOwnProperty('password')) {
            data.password = await bcrypt.hash(data.password,this.#saltRounds);
        }

        return this.user.create(data);
    }

    async update(data) {
  //      data = await this.#sanitizeUser(data);
  //      return this.user.updateOne({username: data.username}, data).exec();
    }

    async delete(username) {
        let user = await this.get(username);
        return user.deleteOne();
    }

    async check(username,password) {
    const user = await this.get(username);
    if (!user) return false;
    const {password: passwordHash} = user;
    return await bcrypt.compare(password, passwordHash);
    }

    close() {
        mongoose.disconnect();
    }
}

export default new User();