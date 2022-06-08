<template>
    <div>
        <div v-if="error">
            {{ error }}
        </div>
        <div v-else></div>
    </div>
</template>

<script>
import readFile from '../utils/readFile'

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

        console.log(this.form)

        let data = readFile(this.form.city)

        if (!data) this.error = 'Cidade não encontrada ou dados incorretos!'
    }
}
</script>

<style lang="scss" scoped></style>
