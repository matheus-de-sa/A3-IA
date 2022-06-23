// function init(data, date) {
//     date = date.split('-')
//     let year = Number(date[0])
//     let month = Number(date[1])
//     let day = Number(date[2])

//     let findData = data.find(
//         (i) => i.year === year && i.month === month && i.day === day
//     )

//     if (findData) return findData

//     let resultado = {}

//     for (let i = 0; i < 1; i++) {
//         // const net = new brain.NeuralNetwork()

//         let dataTest = data.filter(
//             (item) =>
//                 item.month === month && item.day === day && item.time === i
//         )

//         const options = {
//             task: 'regression',
//             debug: false,
//             layers: [
//                 {
//                     type: 'dense',
//                     units: 8,
//                     activation: 'relu'
//                 },
//                 {
//                     type: 'dense',
//                     activation: 'softmax'
//                 }
//             ]
//         }

//         const nn = ml5.neuralNetwork(options)

//         dataTest.forEach((item) => {
//             const inputs = {
//                 year: item.year,
//                 day: item.day,
//                 month: item.month
//             }
//             const output = {
//                 precipitation: item.precipitation || 0
//                 // medTemp: item.medTemp || 0,
//                 // maxTemp: item.maxTemp || 0,
//                 // minTemp: item.minTemp || 0,
//                 // moisture: item.moisture || 0,
//                 // wind: item.wind || 0
//             }

//             nn.addData(inputs, output)
//         })

//         nn.normalizeData()

//         const trainingOptions = { batchSize: 32, epochs: 10 }

//         nn.train(trainingOptions, classify())

//         function classify() {
//             console.log('Finish')

//             const input = {
//                 year: year,
//                 day: day,
//                 month: month
//             }

//             console.log(input)
//             nn.predict(input, handleResults())
//         }

//         function handleResults(error, result) {
//             if (error) {
//                 console.error('Error', error)
//                 return
//             }
//             console.log(result)
//         }
//     }

//     return resultado
// }

function init(data, date) {
    date = date.split('-')
    let year = Number(date[0])
    let month = Number(date[1])
    let day = Number(date[2])

    let findData = data.find(
        (i) => i.year === year && i.month === month && i.day === day
    )

    if (findData) return findData

    let result = {}

    let dataFilter = data.filter(
        (item) => item.month === month && item.day === day
    )

    for (let i = 0; i < 24; i++) {
        let dataTest = data.filter(
            (item) =>
                item.month === month && item.day === day && item.time === i
        )

        let years = []
        let precipitation = []
        let medTemp = []
        let maxTemp = []
        let minTemp = []
        let moisture = []
        let wind = []

        dataTest.forEach((i) => {
            years.push(i.year)
            precipitation.push(i.precipitation || 0)
            medTemp.push(i.medTemp || 0)
            maxTemp.push(i.maxTemp || 0)
            minTemp.push(i.minTemp || 0)
            moisture.push(i.moisture || 0)
            wind.push(i.wind || 0)
        })

        result[i] = {
            precipitation: Number(nn(year, years, precipitation)),
            medTemp: Number(nn(year, years, medTemp)),
            maxTemp: Number(nn(year, years, maxTemp)),
            minTemp: Number(nn(year, years, minTemp)),
            moisture: Number(nn(year, years, moisture)),
            wind: Number(nn(year, years, wind))
        }
    }

    return { result, data: dataFilter }
}

function nn(predic, x, y) {
    function produto(x, y) {
        var ret = []
        for (var i = 0; i < x.length; i++) ret.push(x[i] * y[i])
        return ret
    }

    function quadrados(x) {
        var ret = []
        for (var i = 0; i < x.length; i++) ret.push(x[i] * x[i])
        return ret
    }

    function somatorio(x) {
        var ret = 0
        for (var i = 0; i < x.length; i++) ret += x[i]
        return ret
    }

    function media(x) {
        return somatorio(x) / x.length
    }

    var m = somatorio(produto(x, y)) - (somatorio(x) * somatorio(y)) / x.length
    m /= somatorio(quadrados(x)) - (somatorio(x) * somatorio(x)) / x.length

    var b = media(y) - m * media(x)

    let result = m * predic + b

    let fixed = result.toFixed()

    return parseFloat(fixed)
}

export default init
