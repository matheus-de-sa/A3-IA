<template>
    <div class="landing-page">
        <div class="img">
            <img src="../assets/imgs/LOGO-PNG.png" />
        </div>
        <div class="mt-4 buttons">
            <router-link to="/home">
                <button class="my-2 w-100 btn btn-lg btn-outline-primary init">
                    Iniciar
                </button>
            </router-link>
            <router-link to="/documentation">
                <button class="my-2 w-100 btn btn-lg btn-primary doc">
                    Documentação
                </button>
            </router-link>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.landing-page {
    height: 100%;
    width: 100%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img {
        width: 100%;
    }
}

.init {
    border: 1px solid #26b2ce;
    color: #26b2ce;
    &:hover {
        background-color: #26b2ce;
        color: #fff;
        box-shadow: none;
    }
}

.doc {
    background-color: #2ad1f2;
    border: 1px solid #26b2ce;
    &:hover {
        background-color: #26b2ce;
        box-shadow: none;
    }
}

@media (min-width: 320px) {
}
@media (min-width: 480px) {
    /* smartphones, Android phones, landscape iPhone */
}
@media (min-width: 600px) {
    /* portrait tablets, portrait iPad, e-readers (Nook/Kindle), landscape 800x480 phones (Android) */
}
@media (min-width: 801px) {
    /* tablet, landscape iPad, lo-res laptops ands desktops */
}
@media (min-width: 1025px) {
    /* big landscape tablets, laptops, and desktops */
}
@media (min-width: 1281px) {
    /* hi-res laptops and desktops */
}
</style>
