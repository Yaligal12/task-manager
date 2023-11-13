require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('65435efddc0cca51ddca7ab7').then((task) => {
//     console.log(task)
//     return Task.countDocuments({ completed:false })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskAndCount = async (id) => {
    await Task.findByIdAndDelete(id)
    return await Task.countDocuments({ completed:false })
}

deleteTaskAndCount("65427ea200674bac098e4c61").then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})