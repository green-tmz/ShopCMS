<template>
  <div class="hold-transition login-page">
    <div class="login-box">
      <!-- /.login-logo -->
      <div class="card card-outline card-primary">
        <div class="card-header text-center">
          <b>Admin</b>LTE
        </div>
        <div class="card-body">
          <p class="login-box-msg">Вход в систему</p>
          <div  v-if="Object.keys(validationErrors).length > 0">
                <div>
                    <ul>
                        <li v-for="(value, key) in validationErrors" :key="key">{{ value[0] }}</li>
                    </ul>
                </div>
          </div>
          <form action="javascript:void(0)" method="post">
            <div class="input-group mb-3">
              <input type="email" v-model="admin.email" class="form-control" placeholder="Email" required>
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-envelope"></span>
                </div>
              </div>
            </div>
            <div class="input-group mb-3">
              <input type="password" v-model="admin.password" class="form-control" placeholder="Пароль" required>
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-lock"></span>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-8">
                <div class="icheck-primary">
                  <input type="checkbox" id="remember">
                  <label for="remember">
                    Запомнить меня
                  </label>
                </div>
              </div>
              <!-- /.col -->
              <div class="col-4">
                <button type="submit" class="btn btn-primary btn-block" :disabled="processing" @click="login">
                  {{ processing ? "Пожалуйста подождите" : "Вход" }}
                </button>
              </div>
              <!-- /.col -->
            </div>
          </form>
        </div>
        <!-- /.card-body -->
      </div>
      <!-- /.card -->
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name:"admin-login",
  data(){
    return {
        admin:{
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
      adminSignIn:'auth/login'
    }),
    async login(){
      this.processing = true
      await axios.get('/sanctum/csrf-cookie')
      await axios.post('/admin/login',this.admin).then(({data})=>{
        this.adminSignIn()
      }).catch(({response})=>{
        // if(response.status == 'Error'){
        //   this.validationErrors = response.data.errors
        // }else{
        //   this.validationErrors = {}
        //   alert(response.data.message)
        // }
      }).finally(()=>{
        this.processing = false
      })
    },
  }
}
</script>
