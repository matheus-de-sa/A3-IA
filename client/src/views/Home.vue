<template>
    <div class="home">
    </div>
</template>

<script>
import readFile from '../utils/readFile'

export default {
    name: 'Home',
    data() {
        return {
            file: []
        }
    },
    mounted() {
        this.file = readFile('BomJardim')
    }
}
</script>
