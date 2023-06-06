<template>
  <main class="main">
    <div class="account">
      <div class="container">
        <h1 class="account__title">Вход</h1>
        <div class="account__form">
          <form action="javascript:void(0)"  method="post">
            <div  v-if="Object.keys(validationErrors).length > 0">
                <div>
                    <ul>
                        <li v-for="(value, key) in validationErrors" :key="key">{{ value[0] }}</li>
                    </ul>
                </div>
            </div>
            <input type="email" v-model="auth.email" name="email" id="email" class="txt txt--left" placeholder="Email" />
            <input type="password" v-model="auth.password" name="password" id="password" class="txt txt--left" placeholder="Пароль" />
            <label class="ui-checkbox">
                <input type="checkbox" class="ui-checkbox__input" />
                <span class="ui-checkbox__mark"></span>&nbsp;Запомнить меня
            </label>
            <router-link :to="{ name: 'reset-pass' }" class="account__recoverpass">Забыли пароль?</router-link>
            <button type="submit" class="btn btn--brand btn--boxshadow w--100" :disabled="processing" @click="login" >
                {{ processing ? "Пожалуйста подождите" : "Вход" }}
            </button>

            <div class="account__footer">
              <span>Нет учетной записи?</span>
              <router-link :to="{ name: 'register' }" class="account__router">&nbsp;Регистрация</router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name:"login",
    data(){
        return {
            auth:{
                email:"",
                password:""
            },
            csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            validationErrors:{},
            processing:false
        }
    },
    methods:{
        ...mapActions({
            signIn:'auth/login'
        }),
        async login(){
            this.processing = true
            await axios.get('/sanctum/csrf-cookie')
            await axios.post('/login',this.auth).then(({data})=>{
                this.signIn()
            }).catch(({response})=>{
                if(response.status===422){
                    this.validationErrors = response.data.errors
                }else{
                    this.validationErrors = {}
                    alert(response.data.message)
                }
            }).finally(()=>{
                this.processing = false
            })
        },
    }
}
</script>
