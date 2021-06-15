<template lang="pug">
div
    .text-center.q-my-lg: img(:alt="$appName" src="~assets/logo-inv.svg").logo
    q-list
        q-item(clickable v-ripple v-for="(i, index) in menuitems" :key="index" :to="i.path" active-class="bg-white text-dark").text-white
            q-item-section(avatar)
                q-icon(:name="i.icon")
            q-item-section {{i.text}}
    .absolute-bottom.q-my-sm.q-mx-md.text-center
        q-btn(label="Cerrar sesión" @click="logout" v-bind="$btnAttr" color="white" outline size="sm")
        

</template>


<script>
export default {
    data () {
        return {
            menuitems: [
                {
                    icon: 'las la-credit-card',
                    text: 'Tarjeta',
                    path: '/tarjeta'
                },
                {
                    icon: 'las la-gifts',
                    text: 'Promociones',
                    path: '/promociones'
                },
                {
                    icon: 'las la-map-marked',
                    text: 'Sucursales',
                    path: '/sucursales'
                },
                {
                    icon: 'las la-wallet',
                    text: 'Beneficios',
                    path: '/beneficios'
                },
                {
                    icon: 'las la-phone',
                    text: 'Contacto',
                    path: '/contacto'
                },
                {
                    icon: 'las la-user',
                    text: 'Mi cuenta',
                    path: '/mi-cuenta'
                },
            ]
        }
    },
    methods: {
        logout() {
            var _this = this
            this.$q.dialog({
                title: '¿Desea cerrar sesión?',
                cancel: 'Cancelar',
                ok: 'Salir de mi cuenta'
            }).onOk(function (){
                var username = _this.$store.getters['usuario/getuser'].UserName
                _this.$store.dispatch('usuario/logout', username).then(res => {
                    _this.$router.push('/')
                })
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.logo{
    width: 50%;
}
.q-router-link--exact-active{
    color: $primary !important;
}
</style>