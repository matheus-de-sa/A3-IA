import regression from 'regression'
import RL from 'regression'

function init(data, date) {
    let firstDateObj = `${data[0].year}-${data[0].month}-${data[0].day}`
    let lastDateObj = `${data[data.length - 1].year}-${
        data[data.length - 1].month
    }-${data[data.length - 1].day}`

    if (firstDateObj === date) return data[0]
    if (lastDateObj == date) return data[data.length - 1]

    date = date.split('-')
    let year = Number(date[0])
    let month = Number(date[1])
    let day = Number(date[2])

    data = data.map((item) => {
        return {
            year: Number(item.year),
            day: Number(item.day),
            month: Number(item.month),
            time: Number(item.time),
            precipitation: Number(item.precipitation),
            medTemp: Number(item.medTemp),
            maxTemp: Number(item.maxTemp),
            minTemp: Number(item.minTemp),
            moisture: Number(item.moisture),
            wind: Number(item.wind)
        }
    })

    let dataFilter = data.filter((item) => {
        if (item.month === month && item.day === day) return true
        return false
    })

    let result = {}

    for (let i = 0; i < 1; i++) {
        let datahour = dataFilter.filter((item) => item.time === i)

        let precipitation = datahour.map((item) => item.precipitation)
        let medTemp = datahour.map((item) => item.medTemp)
        let maxTemp = datahour.map((item) => item.maxTemp)
        let minTemp = datahour.map((item) => item.minTemp)
        let moisture = datahour.map((item) => item.moisture)
        let wind = datahour.map((item) => item.wind)

        console.log(i, precipitation)
        console.log(i, medTemp)
        console.log(i, maxTemp)
        console.log(i, minTemp)
        console.log(i, moisture)
        console.log(i, wind)
    }

    // let teste = regression.linear([
    //     [0, 1],
    //     [1, 2],
    //     [2, 3]
    // ])

    // console.log('reg', teste.predict([3]))

    // let teste = linearRegression(data)
}

function linearRegression(data) {}

export default init
