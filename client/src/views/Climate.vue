<template>
    <div>
        <Loader ref="Loader"></Loader>
        <nav-bar></nav-bar>
        <div class="contentBack">
            <div class="error" v-if="error">
                {{ error }}
            </div>
            <div class="success" v-else-if="Object.keys(data).length > 0">
                <div class="city">
                    <div>
                        {{
                            `${
                                city.find((item) => item.value == form.city)
                                    .label
                            }, ${form.state}`
                        }}
                    </div>
                    <div class="mt-3 d-flex justify-content-around">
                        <div class="img-temp">
                            <img
                                :src="identifyImg(dataTest.dawn, 'night')"
                                alt=""
                            />
                            Madrugada
                        </div>
                        <div class="img-temp">
                            <img :src="identifyImg(dataTest.morning)" alt="" />
                            Manhã
                        </div>
                        <div class="img-temp">
                            <img
                                :src="identifyImg(dataTest.afternoon)"
                                alt=""
                            />
                            Tarde
                        </div>
                        <div class="img-temp">
                            <img
                                :src="identifyImg(dataTest.night, 'night')"
                                alt=""
                            />
                            Noite
                        </div>
                    </div>
                </div>
                <div class="content" v-if="Object.keys(dataTest).length > 0">
                    <ul
                        class="nav nav-pills nav-fill"
                        id="myTab"
                        role="tablist"
                    >
                        <li class="nav-item" role="presentation">
                            <button
                                class="nav-link d-flex align-items-center justify-content-center"
                                id="home-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#home"
                                type="button"
                                role="tab"
                                aria-controls="home"
                                aria-selected="true"
                            >
                                <i class="me-1 bx bx-time-five"></i>Timeline
                            </button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button
                                class="nav-link d-flex align-items-center justify-content-center"
                                id="profile-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#profile"
                                type="button"
                                role="tab"
                                aria-controls="profile"
                                aria-selected="false"
                            >
                                <i class="me-1 bx bx-line-chart"></i>Gráficos
                            </button>
                        </li>
                    </ul>
                    <div class="tab-content" id="myTabContent">
                        <div
                            class="tab-pane fade show"
                            id="home"
                            role="tabpanel"
                            aria-labelledby="home-tab"
                        >
                            <div
                                class="mt-2"
                                v-if="Object.keys(dataTest).length > 0"
                            >
                                <div
                                    v-for="(key, index) of Object.keys(data)"
                                    :key="index"
                                    class="timeline"
                                >
                                    <div class="timeline-icon">
                                        <div
                                            class="d-flex justify-content-center justify-content-md-around align-items-center flex-column flex-md-row"
                                        >
                                            <i
                                                class="mb-2 mb-md-0 me-md-2 bx bx-time-five"
                                            ></i>
                                            {{
                                                `${String(index).padStart(
                                                    2,
                                                    '0'
                                                )}:00`
                                            }}
                                            <div class="ms-md-4">
                                                <img
                                                    :src="
                                                        identifyImg(
                                                            data[key],
                                                            key < 7 || key > 18
                                                                ? 'night'
                                                                : undefined
                                                        )
                                                    "
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="timeline-content row">
                                        <div class="col-6">
                                            <div
                                                class="d-flex justify-content-between align-items-center"
                                            >
                                                <i class="bx bxs-thermometer"
                                                    ><span class="d-md-none"
                                                        >Med</span
                                                    ><span
                                                        class="ms-2 d-none d-md-block"
                                                        >Temperatura Média</span
                                                    ></i
                                                >
                                                {{
                                                    replaceCelsius(
                                                        data[key].medTemp
                                                    )
                                                }}
                                            </div>
                                            <div
                                                class="mt-1 d-flex justify-content-between align-items-center"
                                            >
                                                <i class="bx bxs-thermometer"
                                                    ><span class="d-md-none"
                                                        >Max</span
                                                    ><span
                                                        class="ms-2 d-none d-md-block"
                                                        >Temperatura
                                                        Máxima</span
                                                    ></i
                                                >
                                                {{
                                                    replaceCelsius(
                                                        data[key].maxTemp
                                                    )
                                                }}
                                            </div>
                                            <div
                                                class="mt-1 d-flex justify-content-between align-items-center"
                                            >
                                                <i class="bx bxs-thermometer"
                                                    ><span class="d-md-none"
                                                        >Min</span
                                                    ><span
                                                        class="ms-2 d-none d-md-block"
                                                        >Temperatura
                                                        Mínima</span
                                                    ></i
                                                >
                                                {{
                                                    replaceCelsius(
                                                        data[key].minTemp
                                                    )
                                                }}
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div
                                                class="d-flex justify-content-between align-items-center"
                                            >
                                                <i class="bx bx-cloud-rain"
                                                    ><span
                                                        class="ms-2 d-none d-md-block"
                                                        >Precipitação</span
                                                    ></i
                                                >
                                                {{
                                                    calcPrecipitation(
                                                        data[key].precipitation
                                                    )
                                                }}
                                            </div>
                                            <div
                                                class="mt-1 d-flex justify-content-between align-items-center"
                                            >
                                                <i class="bx bx-droplet"
                                                    ><span
                                                        class="ms-2 d-none d-md-block"
                                                        >Umidade</span
                                                    ></i
                                                >
                                                {{ `${data[key].moisture} %` }}
                                            </div>
                                            <div
                                                class="mt-1 d-flex justify-content-between align-items-center"
                                            >
                                                <i class="bx bx-wind"
                                                    ><span
                                                        class="ms-2 d-none d-md-block"
                                                        >Velocidade do
                                                        Vento</span
                                                    ></i
                                                >
                                                {{ `${data[key].wind} m/s` }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            class="tab-pane fade active"
                            id="profile"
                            role="tabpanel"
                            aria-labelledby="profile-tab"
                        >
                            <div class="mt-4">
                                <h3>Regressão Linear</h3>
                                <RegressionChart
                                    :typeString="'Temp'"
                                    :data="regressionChart"
                                ></RegressionChart>
                            </div>
                            <div class="mt-4">
                                <h3>Temperatura</h3>
                                <LineChart
                                    :typeString="'Temp'"
                                    :data="chartTemp"
                                ></LineChart>
                            </div>
                            <div class="mt-4">
                                <h3>Umidade (%)</h3>
                                <LineChart
                                    :typeString="'Mois'"
                                    :data="chartUmi"
                                ></LineChart>
                            </div>
                            <div class="mt-4">
                                <h3>Precipitação (mm/h)</h3>
                                <LineChart
                                    :typeString="'Preci'"
                                    :data="chartPred"
                                ></LineChart>
                            </div>
                            <div class="mt-4">
                                <h3>Velocidade do Vento (m/s)</h3>
                                <LineChart
                                    :typeString="'Wind'"
                                    :data="chartWind"
                                ></LineChart>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import linearRegression from '../utils/linearRegression'
import neuralNetwork from '../utils/neuralNetwork'
import NavBar from '../components/Navbar.vue'
import chuvaSol from '../assets/icons/chuva-sol.gif'
import chuva from '../assets/icons/chuva.gif'
import neve from '../assets/icons/neve.gif'
import nublado from '../assets/icons/nublado.png'
import nubladoSol from '../assets/icons/nublados-sol.gif'
import sol from '../assets/icons/sol.gif'
import lua from '../assets/icons/lua.png'
import nubladoLua from '../assets/icons/lua-nublado.png'
import chuvaLua from '../assets/icons/chuva-lua.gif'
import tempestade from '../assets/icons/tempestade.gif'
import LineChart from '../components/LineChart.vue'
import RegressionChart from '../components/RegressionChart.vue'

export default {
    name: 'Climate',
    components: {
        NavBar,
        LineChart,
        RegressionChart
    },
    data() {
        return {
            form: {},
            error: null,
            data: {},
            chartObj: null,
            dataRegres: []
        }
    },
    async mounted() {
        this.$refs.Loader.startLoader()

        let queryObj = this.$route.query

        Object.keys(queryObj).forEach((key) => {
            if (queryObj[key] === 'null') {
                this.error = 'Dados Incorretos'
            } else {
                this.form[key] = queryObj[key]
            }
        })

        let data = await this.fetchData(this.form.city)

        if (!data) this.error = 'Cidade não encontrada ou dados incorretos!'

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

        if (this.form.mode === 'RL') {
            let result = linearRegression(data, this.form.date)

            this.data = result.result

            this.dataRegres = result.data

            setTimeout(() => {
                this.$refs.Loader.stopLoader()
            }, 2000)
        } else if (this.form.mode === 'RN') {
            let result = neuralNetwork(data, this.form.date)

            this.data = result.result

            this.dataRegres = result.data

            setTimeout(() => {
                this.$refs.Loader.stopLoader()
            }, 3000)
        }
    },
    computed: {
        regressionChart() {
            if (this.dataRegres.length) {
                let data = this.dataRegres

                let labels = []
                let labelsText = []
                let medTemp = []

                for (let i = 0; i < data.length; i++) {
                    labels.push(data[i].year)
                    labelsText.push(`${data[i].year} | ${data[i].time}`)
                    medTemp.push(data[i].medTemp)
                }

                let med_x = labels.reduce((a, b) => a + b, 0) / labels.length
                let med_y = medTemp.reduce((a, b) => a + b, 0) / medTemp.length

                let range_x = []
                let range_y = []

                let mult = []
                let pot = []

                for (let i = 0; i < medTemp.length; i++) {
                    let x = labels[i] - med_x
                    let y = medTemp[i] - med_y
                    range_x.push(x)
                    range_y.push(y)
                }

                for (let i = 0; i < medTemp.length; i++) {
                    mult.push(Math.abs(range_x[i] * range_y[i]))
                    pot.push(Math.abs(Math.pow(range_x[i], 2)))
                }

                let multRed = mult.reduce((a, b) => a + b, 0)
                let potRed = pot.reduce((a, b) => a + b, 0)

                let b = multRed / potRed
                let a = -med_y + b * med_x

                let hat = []

                for (let i = 0; i < medTemp.length; i++) {
                    let calc = a + b * labels[i]

                    hat.push(calc / 100)
                }

                let medTempNum = 0
                let count = 0

                while (medTempNum <= 0) {
                    medTempNum = hat[0] - medTemp[count]
                    count++
                }

                if (medTempNum > 10) {
                    hat = hat.map((item) => item - medTempNum)
                }

                let datasets = [
                    {
                        type: 'line',
                        label: 'Linha de Tendência',
                        backgroundColor: '#EB4010',
                        borderColor: '#EB4010',
                        data: hat
                    },
                    {
                        type: 'scatter',
                        label: 'Valores Reais',
                        backgroundColor: '#00FAE6',
                        borderColor: '#00FAE6',
                        data: medTemp
                    }
                ]

                return {
                    labels: labels,
                    datasets
                }
            }

            return []
        },
        dataTest() {
            if (this.data) {
                let data = this.data

                let dawn = []
                let morning = []
                let afternoon = []
                let night = []

                Object.keys(data).forEach((item) => {
                    if (item < 7) {
                        dawn.push(data[item])
                    } else if (item < 13) {
                        morning.push(data[item])
                    } else if (item < 19) {
                        afternoon.push(data[item])
                    } else {
                        night.push(data[item])
                    }
                })

                return {
                    dawn: this.mediaArr(dawn),
                    morning: this.mediaArr(morning),
                    afternoon: this.mediaArr(afternoon),
                    night: this.mediaArr(night)
                }
            } else {
                return []
            }
        },
        city() {
            let state = this.form.state
            switch (state) {
                case 'SC':
                    return [
                        { value: 'BomJardim', label: 'Bom Jardim da Serra' },
                        { value: 'Cacador', label: 'Caçador' },
                        { value: 'Chapeco', label: 'Chapecó' },
                        { value: 'Floripa', label: 'Florianópolis' },
                        { value: 'SaoJoaquim', label: 'São Joaquim' }
                    ]
                case 'RJ':
                    return [{ value: 'Rio', label: 'Rio de Janeiro' }]
                case 'RS':
                    return [
                        { value: 'PortoAlegre', label: 'Porto Alegre' },
                        { value: 'Vacaria', label: 'Vacaria' }
                    ]
                case 'MG':
                    return [{ value: 'BeloHorizonte', label: 'Belo Horizonte' }]
                case 'PR':
                    return [
                        { value: 'Curitiba', label: 'Cúritiba' },
                        { value: 'FozIguacu', label: 'Foz do Iguaçu' },
                        { value: 'Maringa', label: 'Maringá' }
                    ]
                case 'ES':
                    return [{ value: 'Vitoria', label: 'Vitória' }]
            }
        },
        chartTemp() {
            if (Object.keys(this.data).length > 0) {
                let data = []

                Object.keys(this.data).forEach((item) =>
                    data.push(this.data[item])
                )

                let labels = []

                for (let i = 0; i < 24; i++) {
                    let time = `${String(i).padStart(2, '0')}hrs`

                    labels.push(time)
                }

                let datasets = [
                    {
                        label: 'Temp Max',
                        backgroundColor: '#EB4010',
                        borderColor: '#EB4010',
                        data: data.map((item) => item.maxTemp)
                    },
                    {
                        label: 'Temp Min',
                        backgroundColor: '#00FAE6',
                        borderColor: '#00FAE6',
                        data: data.map((item) => item.minTemp)
                    },
                    {
                        label: 'Temp Med',
                        backgroundColor: '#EBA401',
                        borderColor: '#EBA401',
                        data: data.map((item) => item.medTemp)
                    }
                ]

                return {
                    labels,
                    datasets
                }
            }
            return []
        },
        chartPred() {
            if (Object.keys(this.data).length > 0) {
                let data = []

                Object.keys(this.data).forEach((item) =>
                    data.push(this.data[item])
                )

                let labels = []

                for (let i = 0; i < 24; i++) {
                    let time = `${String(i).padStart(2, '0')}hrs`

                    labels.push(time)
                }

                let datasets = [
                    {
                        label: 'Precipitação',
                        backgroundColor: '#EB4010',
                        borderColor: '#EB4010',
                        data: data.map((item) => item.precipitation)
                    }
                ]

                return {
                    labels,
                    datasets
                }
            }
            return []
        },
        chartUmi() {
            if (Object.keys(this.data).length > 0) {
                let data = []

                Object.keys(this.data).forEach((item) =>
                    data.push(this.data[item])
                )

                let labels = []

                for (let i = 0; i < 24; i++) {
                    let time = `${String(i).padStart(2, '0')}hrs`

                    labels.push(time)
                }

                let datasets = [
                    {
                        label: 'Umidade',
                        backgroundColor: '#00FAE6',
                        borderColor: '#00FAE6',
                        data: data.map((item) => item.moisture)
                    }
                ]

                return {
                    labels,
                    datasets
                }
            }
            return []
        },
        chartWind() {
            if (Object.keys(this.data).length > 0) {
                let data = []

                Object.keys(this.data).forEach((item) =>
                    data.push(this.data[item])
                )

                let labels = []

                for (let i = 0; i < 24; i++) {
                    let time = `${String(i).padStart(2, '0')}hrs`

                    labels.push(time)
                }

                let datasets = [
                    {
                        label: 'Velocidade Vento',
                        backgroundColor: '#EBA401',
                        borderColor: '#EBA401',
                        data: data.map((item) => item.wind)
                    }
                ]

                return {
                    labels,
                    datasets
                }
            }
            return []
        }
    },
    methods: {
        async fetchData(data) {
            console.log('aqui1111')

            let result = await axios.get(`/data/${data}.json`)

            console.log(result)

            return result.data
        },
        calcPrecipitation(value) {
            if (value <= 0) {
                return '0 mm/h'
            }
            return `${value} mm/h`
        },
        identifyRain(data, type, img) {
            if (data.precipitation > 2) {
                return tempestade
            }
            if (data.precipitation >= 1) {
                switch (type) {
                    case 'neve':
                        return chuva
                    case 'nublado':
                        return chuva
                    case 'nubladoSol':
                        return chuvaSol
                    case 'nubladoLua':
                        return chuvaLua
                    case 'sol':
                        return chuvaSol
                    case 'lua':
                        return chuvaLua
                }
            }
            if (data.moisture > 80) {
                switch (type) {
                    case 'neve':
                        return neve
                    case 'nublado':
                        return nublado
                    case 'nubladoSol':
                        return nublado
                    case 'nubladoLua':
                        return nubladoLua
                    case 'sol':
                        return nubladoSol
                    case 'lua':
                        return nubladoLua
                }
            }

            return img
        },
        identifyImg(data, hour) {
            let img = null
            let type = null

            if (data.medTemp < 0) {
                img = neve
                type = 'neve'
            }
            if (data.medTemp < 10) {
                img = nublado
                type = 'nublado'
                if (hour === 'night') {
                    img = nubladoLua
                    type = 'nubladoLua'
                }
            } else if (data.medTemp < 15) {
                img = nubladoSol
                type = 'nubladoSol'
                if (hour === 'night') {
                    img = nubladoLua
                    type = 'nubladoLua'
                }
            } else {
                img = sol
                type = 'sol'
                if (hour === 'night') {
                    img = lua
                    type = 'lua'
                }
            }

            return this.identifyRain(data, type, img)
        },
        mediaArr(arr) {
            let precipitation = []
            let medTemp = []
            let maxTemp = []
            let minTemp = []
            let moisture = []
            let wind = []

            arr.forEach((item) => {
                precipitation.push(item.precipitation)
                medTemp.push(item.medTemp)
                maxTemp.push(item.maxTemp)
                minTemp.push(item.minTemp)
                moisture.push(item.moisture)
                wind.push(item.wind)
            })

            let object = {
                precipitation: this.mediaCalc(precipitation),
                medTemp: this.mediaCalc(medTemp),
                maxTemp: this.mediaCalc(maxTemp),
                minTemp: this.mediaCalc(minTemp),
                moisture: this.mediaCalc(moisture),
                wind: this.mediaCalc(wind)
            }

            return object
        },
        mediaCalc(num) {
            const total = num.reduce((a, b) => {
                return a + b
            })

            return Number((total / num.length).toFixed())
        },
        replaceCelsius(value) {
            return `${String(value).replace('.', ',')} ºC`
        }
    }
}
</script>

<style lang="scss" scoped>
.img-temp {
    img {
        width: 70px;
    }
}

.contentBack {
    padding: 1rem;
    overflow-y: auto;
    height: 100vh;
    .success {
        margin-top: 4rem;
        .city {
            background-color: #fff;
            // color: #fff;
            border-radius: 15px;
            padding: 1rem;
            font-size: 1.1rem;
        }
        .content {
            margin-top: 1rem;
            padding: 1rem;
            border-radius: 15px;
            background-color: #fff;
        }
    }
}

.timeline {
    border: 1px solid #26b2ce;
    border-radius: 10px;
    display: flex;
    padding: 15px 5px;
    margin-top: 15px;
    .timeline-icon {
        width: 20%;
        // border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-right: 1px solid #26b2ce;
        img {
            width: 20px;
        }
    }
    .timeline-content {
        margin-left: 5px;
        width: 80%;
        font-size: 0.9rem;
        i {
            display: flex;
            align-items: center;
            span {
                font-size: 0.8rem;
                font-family: sans-serif;
            }
        }
    }
}

@media (min-width: 801px) {
    .timeline {
        .timeline-icon {
            img {
                width: 50px;
            }
        }
        .timeline-content {
            margin-left: 5px;
            width: 80%;
            font-size: 1rem;
            i {
                span {
                    font-size: 1rem;
                }
            }
        }
    }
}
</style>
