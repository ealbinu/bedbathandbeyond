<template lang="pug">
  q-page(padding).row.column.justify-center
    .text-center: img(:alt="$appName" src="~assets/logo.svg")
    LoginForm
    RecuperarPassword(ref="Recover")
    div.text-center.q-mt-lg: q-btn(color="primary" label="Regístrate" type="submit" v-bind="$btnAttr" to="/registro")
</template>

<script>
import LoginForm from 'components/login/LoginForm'
import RecuperarPassword from 'components/login/RecuperarPassword'

export default {
  name: 'Login',
  components: {
    LoginForm,
    RecuperarPassword,
  },
  mounted () {
    if(this.$route.query.recover){
      this.$refs.Recover.dialog = true
      this.$refs.Recover.useremail = this.$route.query.recover
    }
  }
}
</script>
