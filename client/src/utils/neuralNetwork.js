function init(data, date) {
    date = date.split('-')
    let year = Number(date[0])
    let month = Number(date[1])
    let day = Number(date[2])

    let findData = data.find(
        (i) => i.year === year && i.month === month && i.day === day
    )

    if (findData) return findData

    let resultado = {}

    for (let i = 0; i < 24; i++) {
        // const net = new brain.NeuralNetwork()

        const options = {
            task: 'regression',
            inputs: ['year', 'day', 'month', 'time'],
            outputs: [
                'precipitation',
                'medTemp',
                'maxTemp',
                'minTemp',
                'moisture',
                'wind'
            ]
        }

        const nn = ml5.neuralNetwork(options)

        let dataTest = data.filter(
            (item) =>
                item.month === month && item.day === day && item.time === i
        )

        dataTest.forEach((item) => {
            const inputs = {
                year: item.year,
                day: item.day,
                month: item.month,
                time: i
            }
            const outputs = {
                precipitation: item.precipitation || 0,
                medTemp: item.medTemp || 0,
                maxTemp: item.maxTemp || 0,
                minTemp: item.minTemp || 0,
                moisture: item.moisture || 0,
                wind: item.wind || 0
            }

            nn.addData(inputs, outputs)
        })

        nn.normalizeData()

        const trainingOptions = { batchSize: 32, epochs: 12 }

        nn.train(trainingOptions, classify())

        function classify() {
            const input = {
                year: year,
                day: day,
                month: month,
                time: i
            }
            nn.predictMultiple(input, handleResults())
        }

        function handleResults(error, result) {
            if (error) {
                console.error(error)
                return
            }
            console.log(result) // {label: 'red', confidence: 0.8};
        }
    }

    return resultado
}

export default init
