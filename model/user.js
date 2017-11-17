const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  token: {
    type: String
  },
  meta: {
    createData: {
      type: Date,
      default: Date.now()
    },
    updateDate: {
      type: Date,
      defautl: Date.now()
    }
  }
});

module.exports = mongoose.model('User', UserSchema);
