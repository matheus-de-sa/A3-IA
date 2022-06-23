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

    let dataFilter = data.filter(
        (item) => item.month === month && item.day === day
    )

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
            precipitation: Number(linearRegression(year, years, precipitation)),
            medTemp: Number(linearRegression(year, years, medTemp)),
            maxTemp: Number(linearRegression(year, years, maxTemp)),
            minTemp: Number(linearRegression(year, years, minTemp)),
            moisture: Number(linearRegression(year, years, moisture)),
            wind: Number(linearRegression(year, years, wind))
        }
    }

    return { result, data: dataFilter }
}

function linearRegression(year, years, data) {
    let dataRegress = []

    for (let i = 0; i < data.length; i++) {
        dataRegress.push([years[i], data[i]])
    }

    let result = regression.linear(dataRegress)

    return result.predict([year])[1].toFixed()
}

export default init
