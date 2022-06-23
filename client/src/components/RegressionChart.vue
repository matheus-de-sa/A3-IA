<template>
    <Scatter
        v-if="active"
        :chart-data="chartData"
        :chart-options="chartOptions"
    ></Scatter>
</template>

<script>
import { Line, Scatter } from 'vue-chartjs'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    CategoryScale,
    PointElement
} from 'chart.js'

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    CategoryScale,
    PointElement
)

export default {
    name: 'LineChart',
    components: {
        Scatter
    },
    props: {
        data: {
            type: Object,
            default: null
        },
        typeString: {
            type: String,
            default: 'Temp'
        }
    },
    data() {
        return {
            active: false,
            chartData: {
                labels: [],
                datasets: []
            },
            chartOptions: {},
            responsive: {}
        }
    },
    mounted() {
        this.active = false

        this.chartData = {
            labels: this.data.labels,
            datasets: this.data.datasets
        }

        var labelTest = null

        if (this.typeString === 'Mois') {
            labelTest = `%`
        } else if (this.typeString === 'Preci') {
            labelTest = `mm/h`
        } else if (this.typeString === 'Wind') {
            labelTest = `m/s`
        } else if (this.typeString === 'Temp') {
            labelTest = `ºC`
        }

        this.chartOptions = {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        font: {
                            size: 14
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            let label = context.dataset.label || ''

                            if (label) {
                                label += `:  ${context.raw} ${labelTest}`
                            }

                            return label
                        }
                    }
                }
            }
        }

        this.active = true
    }
}
</script>
