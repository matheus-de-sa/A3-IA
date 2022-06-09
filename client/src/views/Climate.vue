<template>
    <div>
        <div v-if="error">
            {{ error }}
        </div>
        <div v-else>
            {{ form }}
        </div>
    </div>
</template>

<script>
import readFile from '../utils/readFile'
import linearRegression from '../utils/linearRegression'

export default {
    name: 'Climate',
    components: {},
    data() {
        return {
            form: {},
            error: null
        }
    },
    mounted() {
        let queryObj = this.$route.query

        Object.keys(queryObj).forEach((key) => {
            if (queryObj[key] === 'null') {
                this.error = 'Dados Incorretos'
            } else {
                this.form[key] = queryObj[key]
            }
        })

        let data = readFile(this.form.city)

        if (!data) this.error = 'Cidade não encontrada ou dados incorretos!'

        if (this.form.mode === 'RL')
            linearRegression(data, this.form.date, this.form.hour)
    }
}
</script>

<style lang="scss" scoped></style>
