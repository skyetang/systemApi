const mongoose = require('mongoose');
const schema = mongoose.schema;
const bcrypt = require('bcrypt');

const userSchema = new schema({
    name: {
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

userSchema.pre('save', (next) => {
    if (this.isNew) {

    }
});