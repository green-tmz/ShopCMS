<template>
  <main class="main">
    <div class="account">
      <div class="container">
        <h1 class="account__title">Регистрация</h1>
        <div class="account__form">
            <form action="javascript:void(0)" @submit="register"  method="post">
                <div  v-if="Object.keys(validationErrors).length > 0">
                    <div >
                        <ul >
                            <li v-for="(value, key) in validationErrors" :key="key">{{ value[0] }}</li>
                        </ul>
                    </div>
                </div>
                <input type="text" name="name" v-model="user.name" id="name" class="txt" placeholder="Имя" />
                <input type="email" name="email" v-model="user.email" id="email" class="txt txt--left" placeholder="Email" />
                <input type="password" name="password" v-model="user.password" id="password" class="txt txt--left" placeholder="Пароль" />
                <input type="password" name="password_confirmation" v-model="user.password_confirmation" id="password_confirmation" class="txt txt--left" placeholder="Подтверждение пароля" />
                <!-- <button class="btn btn--brand btn--boxshadow w--100 margin--bottom-10">
                    Регистрация
                </button> -->

                <div >
                    <button type="submit" :disabled="processing" class="btn btn--brand btn--boxshadow w--100 margin--bottom-10">
                        {{ processing ? "Пожалуйста подождите" : "Регистрация" }}
                    </button>
                </div>

                <div class="account__footer">
                    <span>Уже есть учетная запись?</span>
                    <router-link :to="{ name: 'login' }" class="account__router">&nbsp;Вход</router-link>
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
    name:'register',
    data(){
        return {
            user:{
                name:"",
                email:"",
                password:"",
                password_confirmation:""
            },
            validationErrors:{},
            processing:false
        }
    },
    methods:{
        ...mapActions({
            signIn:'auth/login'
        }),
        async register(){
            this.processing = true
            await axios.get('/sanctum/csrf-cookie')
            await axios.post('/register',this.user).then(response=>{
                this.validationErrors = {}
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
        }
    }
}
</script>
