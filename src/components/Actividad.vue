<template lang="pug">
.row.column.q-my-lg
    .text-h6.text-center Actividad
    q-list
        q-item.bg-white(v-for="(i, index) in items" :key="index" flat).q-ma-sm.bg-grey-2
            q-item-section
                .text-body2.text-primary {{i.Concepto}}
                .text-caption.text-grey {{parseDate(i.Fecha)}} - {{i.Establecimiento}}
            q-item-section(side).text-h5.text-bold {{i.Points}}

</template>
<script>
import { date } from 'quasar'
export default {
    data () {
        return {
            items: []
        }
    },
    computed: {
        user () {
        return this.$store.getters['usuario/getuser']
        }
    },
    methods: {
        parseDate (jsonDateString) {
            var dateP = parseInt(jsonDateString.replace('/Date(', ''))
            return date.formatDate(dateP, 'YYYY/MM/DD')
        },
        loadItems () {
            var today = new Date()
            today = date.formatDate(today, 'YYYY/MM/DD')
            var request = {
                BeginDate: "2021/01/01",
                EndDate: today,
                CustomerID: this.user.CustomerID,
                AccountType: "1"
            }
            this.$store.dispatch('usuario/transactions', request).then(res => {
                this.items = res
                //console.log('Actividad:',this.items)
            })
        }
    },
    mounted () {
        this.loadItems()
    }
}
</script>