<template>
    <transition name="fade">
        <div v-if="show" :key="key" class="preloader">
            <div class="circles">
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'Loader',
    data() {
        return {
            show: false,
            key: 0
        }
    },
    mounted() {},
    methods: {
        startLoader() {
            console.log('aqiuo')

            this.show = true

            // this.keyIncrement()
        },
        stopLoader() {
            this.show = false
        },
        keyIncrement() {
            this.key++

            setTimeout(() => {
                this.keyIncrement()
            }, 500)
        }
    }
}
</script>

<style scoped lang="scss">
.preloader {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.685);
    z-index: 1030 !important;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
.circles {
    display: flex;
    margin-top: 0.5rem;
    .circle {
        width: 1.5rem;
        height: 1.5rem;
        margin: 0.75rem;
        background-color: #2ad1f2;
        border-radius: 50%;
        animation-name: scaleIn;
        animation-duration: 0.7s;
        transform: scale(0);
        &:nth-child(1) {
            animation-delay: 0s;
        }
        &:nth-child(2) {
            animation-delay: 0.05s;
        }
        &:nth-child(3) {
            animation-delay: 0.1s;
        }
        &:nth-child(4) {
            animation-delay: 0.15s;
        }
        &:nth-child(5) {
            animation-delay: 0.2s;
        }
    }
}
@keyframes scaleOut {
    0% {
        transform: scale(1);
    }
    100% {
        transform: scale(0);
    }
}
@keyframes scaleIn {
    0% {
        transform: scale(0);
    }
    100% {
        transform: scale(1);
    }
}
</style>
