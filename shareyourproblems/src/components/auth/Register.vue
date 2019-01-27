<template>
    <div class="container-fluid">
        <div class='row'>
            <div class='col-4 offset-4'>
                <form class="form-signin" @submit.prevent="register">
                    <h1 class="h3 mb-3 font-weight-normal">Register</h1>
                    <label class="sr-only">Username</label>
                    <input type="text" v-model="username" class="form-control" placeholder="Username" required autofocus>
                    <label for="inputPassword" class="sr-only">Password</label>
                    <input type="password" id="inputPassword" v-model='password' class="form-control" :class={alert:bad_pw} placeholder="Password" required>
                    <label for="inputPassword" class="sr-only">Confirm Password</label>
                    <input type="password" v-model='confirmpassword' class="form-control" :class={alert:unmatch} placeholder="Confirm Password" required>
                    <button class="btn btn-lg btn-primary btn-block" type="submit">Sign Up</button>
                </form>
            </div>
            <div class='col-3 pt-5 mt-2'>
                <div v-html="error" class="error"></div>
            </div>
        </div>
    </div>
</template>
<script>
    import authentication from '@/services/authentication'
    export default {
        data() {
            return {
                username:'',
                password:'',
                confirmpassword:'',
                error:null,
                bad_pw:false,
                unmatch:false
            }
        },
        methods: {
            register() {
                if(this.password.trim().length<=5){
                    this.bad_pw=true
                }
                if(this.password!=this.confirmpassword){
                    this.unmatch=true
                    return
                }
                authentication.register({username:this.username,password:this.password.trim()})
                    .then((res)=>{
                        this.$router.push('/login')                 
                    })
                    .catch(err=>{
                        if(err.response.status==400){
                            this.error = err.response.data.error
                        }
                        // else if(err.response.status==401){
                        //     this.error = err.response.data.message
                        // }
                        else if(err.response.status==409){
                            this.error = err.response.data.message
                        }
                        else{
                            alert('Internal error occured, please try again')
                        }
                    })
            }
        },
        computed: {
        },
    }
</script>
<style scoped>
.form-signin {
  width: 100%;
  min-height: calc(100vh - 5rem);
  max-width: 330px;
  padding: 15px;
  margin: auto;
  text-align: center;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.alert{
    border:1px solid red;
}
.error{
    color:red;
}
</style>
