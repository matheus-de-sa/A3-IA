<template>
    <div class="home">
        <NavBar></NavBar>
        <div class="content">
            <form @submit.prevent="getResult()">
                <h2>Descubra o Clima</h2>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">
                        Método
                    </label>
                    <div class="ms-1">
                        <div class="form-check">
                            <input
                                v-model="form.mode"
                                class="form-check-input"
                                name="exampleRadios"
                                type="radio"
                                required
                                value="RL"
                                id="RL"
                            />
                            <label class="form-check-label" for="RL">
                                Regressão Linear
                            </label>
                        </div>
                        <div class="form-check">
                            <input
                                v-model="form.mode"
                                name="exampleRadios"
                                class="form-check-input"
                                type="radio"
                                value="RN"
                                required
                                id="RN"
                            />
                            <label class="form-check-label" for="RN">
                                Rede Neural
                            </label>
                        </div>
                    </div>
                </div>
                <div class="mt-3 mb-3">
                    <label for="state" class="form-label"> Estado </label>
                    <select
                        id="state"
                        v-model="form.state"
                        class="form-select"
                        aria-label="Default select example"
                    >
                        <option :value="null" selected>
                            Selecione o estado
                        </option>
                        <option
                            v-for="item of states"
                            :key="item.label"
                            :value="item.value"
                        >
                            {{ item.label }}
                        </option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="city" class="form-label"> Cidade </label>
                    <select
                        id="city"
                        v-model="form.city"
                        class="form-select"
                        aria-label="Default select example"
                    >
                        <option :value="null" selected>
                            Selecione uma cidade
                        </option>
                        <option
                            v-for="item of cities"
                            :key="item.label"
                            :value="item.value"
                        >
                            {{ item.label }}
                        </option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">
                        Data
                    </label>
                    <input
                        v-model="form.date"
                        type="date"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                    />
                </div>
                <div>
                    <button class="doc btn-primary btn btn-lg w-100">
                        Descubra
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import NavBar from '../components/Navbar.vue'

export default {
    name: 'Home',
    components: {
        NavBar
    },
    data() {
        return {
            form: {
                mode: null,
                state: null,
                city: null,
                date: null,
                specifiTime: null,
                hour: null
            },
            states: [
                { value: 'MG', label: 'Minas Gerais' },
                { value: 'RJ', label: 'Rio de Janeiro' },
                { value: 'RS', label: 'Rio de Grande do Sul' },
                { value: 'SC', label: 'Santa Catarina' },
                { value: 'PR', label: 'Paraná' }
            ]
        }
    },
    mounted() {},
    methods: {
        getResult() {
            let form = this.form

            let query = `/climate/?mode=${form.mode}&state=${form.state}&city=${form.city}&date=${form.date}`

            if (form.specifiTime) query += `&hour=${form.hour}`

            this.$router.push(query)
        }
    },
    computed: {
        cities() {
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
                    return [{ value: 'PortoAlegre', label: 'Porto Alegre' }]
                case 'MG':
                    return [{ value: 'BeloHorizonte', label: 'Belo Horizonte' }]
                case 'PR':
                    return [
                        { value: 'Curitiba', label: 'Cúritiba' },
                        { value: 'FozIguacu', label: 'Foz do Iguaçu' },
                        { value: 'Maringa', label: 'Maringá' }
                    ]
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.doc {
    background-color: #2ad1f2;
    border: 1px solid #26b2ce;
    &:hover {
        background-color: #26b2ce;
        box-shadow: none;
    }
}

.content {
    padding: 1rem;
    height: 100vh;
    overflow-y: auto;
    form {
        margin-top: 4rem;
        background-color: #fff;
        padding: 1rem;
        border-radius: 15px;
        label {
            width: 100%;
            text-align: left !important;
            margin-left: 0.8rem;
        }
    }
}

@media (min-width: 320px) {
}
@media (min-width: 480px) {
    /* smartphones, Android phones, landscape iPhone */
}
@media (min-width: 600px) {
}
@media (min-width: 801px) {
    .content {
        padding: 1rem 10rem;
    }
}
@media (min-width: 1025px) {
    .content {
        padding: 1rem 15rem;
    }
}
@media (min-width: 1281px) {
    .content {
        padding: 1rem 25rem;
    }
}
</style>
