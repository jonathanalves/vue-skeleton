<template>
    <div class="c-login">
        <header class="c-login__head">
            <a class="c-login__brand" href>
                <img :src="logo">
            </a>
        </header>

        <form class="c-login__content"  v-on:submit.prevent="login">

            <div class="c-field u-mb-small">
                <label class="c-field__label" for="username">E-mail</label>
                <input required v-model="dto.username" class="c-input" type="text" id="username">
            </div>

            <div class="c-field u-mb-small">
                <label class="c-field__label" for="password">Senha</label>
                <input required v-model="dto.password" class="c-input" type="password" id="password">
            </div>

            <button class="c-btn c-btn--info c-btn--fullwidth" type="submit">Acessar o Painel</button>

        </form>

    </div>
</template>

<script>

    import apiService from "./../services/apiService.js"

    export default {
        created(){
            apiService.isLogado();
        },
        data() {
            return {
                logo: 'img/logo.png',
                dto:{
                    username : '',
                    password: ''
                }
            }
        },
        methods: {
            login() {
                var self = this;
                apiService.login(this.dto).then(
                    () => {
                        self.$router.push({ path: '/app' });
                    }, (response) => {
                        toastr.error(response.body.message);
                    }
                );
            }
        }
    }

</script>
