<template>
    <div class="home">
        <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div class="container-fluid">
                <router-link to="" class="navbar-brand">
                    <img
                        src="../assets/imgs/LOGO-PNG-FLAT.png"
                        alt=""
                        height="24"
                /></router-link>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a
                                class="nav-link active"
                                aria-current="page"
                                href="#"
                                >Home</a
                            >
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="content">
            <form @submit.prevent="getResult()">
                <h2>Descruba o Clima</h2>
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
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">
                        Horário Específico?
                    </label>
                    <div class="ms-1">
                        <div class="form-check">
                            <input
                                v-model="form.specifiTime"
                                class="form-check-input"
                                type="radio"
                                :value="true"
                                name="radioHour"
                                id="radioTrue"
                            />
                            <label class="form-check-label" for="radioTrue">
                                Sim
                            </label>
                        </div>
                        <div class="form-check">
                            <input
                                v-model="form.specifiTime"
                                class="form-check-input"
                                type="radio"
                                :value="false"
                                name="radioHour"
                                id="radioFalse"
                            />
                            <label class="form-check-label" for="radioFalse">
                                Não
                            </label>
                        </div>
                    </div>
                </div>
                <div class="mb-3" v-if="form.specifiTime">
                    <label for="exampleInputEmail1" class="form-label">
                        Hora
                    </label>
                    <select id="city" v-model="form.hour" class="form-select">
                        <option :value="null" selected>Selecione a hora</option>
                        <option v-for="hora of 24" :key="hora" :value="hora">
                            {{ `${String(hora).padStart(2, '0')}:00` }}
                        </option>
                    </select>
                </div>
                <div>
                    <button class="btn btn-primary btn-lg w-100">
                        Descubra
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Home',
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
.content {
    padding: 1rem;
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
</style>
