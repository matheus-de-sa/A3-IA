const fs = require('fs')
let data = []
let fileName = 'BELOHORIZONTE'
let file = fs.readFileSync(`./Csvs/${fileName}.csv`, 'utf-8')

file = file.split(/\r?\n/)

for (let i = 0; i < file.length; i++) {
    let line = file[i].split(';')

    let date = line[0].split('/')

    data.push({
        day: Number(date[0]),
        month: Number(date[1]),
        year: Number(date[2]),
        time: Number(line[1] / 100),
        precipitation: Number(line[2]),
        medTemp: Number(line[3]),
        maxTemp: Number(line[4]),
        minTemp: Number(line[5]),
        moisture: Number(line[6]),
        wind: Number(line[7]),
    })
}

console.log(data.length)

fs.writeFileSync(`./Jsons/BeloHorizonte.json`, JSON.stringify(data), 'utf8')
