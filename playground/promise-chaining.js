require('../src/db/mongoose')
const User = require('../src/models/user')


// User.findByIdAndUpdate('6542692c856f147b9b0e8b93', {age: 1}).then((user) => {
//     console.log(user)
//     return User.countDocuments({age: 1})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const updateAgeAndCount = async (id ,age) => {
    await User.findByIdAndUpdate(id, {age: age})
    return await User.countDocuments({age: age})
}

updateAgeAndCount('65426291929a774f9b2f245e', 12).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})
