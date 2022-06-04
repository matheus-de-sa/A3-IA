const fs = require('fs')
let data = []
let fileName = 'VITORIA'
let file = fs.readFileSync(`./Csvs/${fileName}.csv`, 'utf-8')

file = file.split(/\r?\n/)

for (let i = 0; i < file.length; i++) {
    let line = file[i].split(';')

    let date = line[0].split('/')

    if (Number(line[2]) && Number(line[3])) {
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
            wind: Number(line[7])
        })
    }
}

fs.writeFileSync(`./Jsons/${fileName}.json`, JSON.stringify(data), 'utf8')
