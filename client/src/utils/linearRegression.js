import regression from 'regression'
import RL from 'regression'

function init(data, date) {
    date = date.split('-')
    let year = Number(date[0])
    let month = Number(date[1])
    let day = Number(date[2])

    let findData = data.find(
        (i) => i.year === year && i.month === month && i.day === day
    )

    if (findData) return findData

    data = data.filter((item) => item.month === month && item.day === day)

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

    for (let i = 0; i < 24; i++) {
        let datahour = dataFilter.filter((item) => item.time === i)

        let years = []
        let precipitation = []
        let medTemp = []
        let maxTemp = []
        let minTemp = []
        let moisture = []
        let wind = []

        datahour.forEach((i) => {
            years.push(i.year)
            precipitation.push(i.precipitation)
            medTemp.push(i.medTemp)
            maxTemp.push(i.maxTemp)
            minTemp.push(i.minTemp)
            moisture.push(i.moisture)
            wind.push(i.wind)
        })

        result[i] = {
            precipitation: linearRegression(year, years, precipitation),
            medTemp: linearRegression(year, years, medTemp),
            maxTemp: linearRegression(year, years, maxTemp),
            minTemp: linearRegression(year, years, minTemp),
            moisture: linearRegression(year, years, moisture),
            wind: linearRegression(year, years, wind)
        }
    }

    return result
}

function linearRegression(year, years, data) {
    let dataRegress = []

    for (let i = 0; i < data.length; i++) {
        dataRegress.push([years[i], data[i]])
    }

    let result = regression.linear(dataRegress)

    return result.predict([year])[1]
}

export default init
