const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type:String,
        unique: true,
        required: true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    age: {
        type: Number,
        required: true,
        validate(value){
            if (value < 0){
                throw new Error('Age must be a positive number')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password must not contain password')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            require: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
})

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

//Login function
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})

    if (!user){
        throw new Error('Unable to login!')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch){
        throw new Error('Unable to login!')
    }
    return user

}

//get the public data
userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

//Create token for user
userSchema.methods.generateToken = async function(){
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, "ilovegalagal")
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}


//Hash the password before saving
userSchema.pre('save', async function(next){
    const user = this
    if (user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

//Delete user tasks when user is removed
userSchema.pre('deleteOne',{ document: true }, async function(next){
    const user = this
    await Task.deleteMany( {owner: user._id} )
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User