<template>

    <div>
        <template v-if="user.id != null">

            <sidebar></sidebar>

            <main class="o-page__content">
                <header class="c-navbar u-mb-medium">

                    <button class="c-sidebar-toggle u-mr-small">
                        <span class="c-sidebar-toggle__bar"></span>
                        <span class="c-sidebar-toggle__bar"></span>
                        <span class="c-sidebar-toggle__bar"></span>
                    </button><!-- // .c-sidebar-toggle -->

                    <h2 class="c-navbar__title u-mr-auto">{{$route.name}}</h2>

                </header>

                <div class="container-fluid">
                    <router-view></router-view>
                </div>

            </main>

        </template>

    </div>
</template>

<script>

    import Sidebar from "./Sidebar.vue"

    import apiService from "./../services/apiService.js"

    export default {
        components: { Sidebar },
        data() {
            return {
                user: {}
            }
        },
        created(){
            var self = this;
            apiService.isLogado().then(
                (r) => {
                    console.debug(r);
                    self.user = {
                        id: r.data.response.estabelecimentoId,
                        estabelecimentoId: r.data.response.estabelecimentoId,
                        isAdmin: !r.data.response.estabelecimentoId
                    };
                }, self.logout
            );
        },
        methods: {
            logout(){
                this.user = {};
                apiService.logout();
                this.$router.push({ path: '/login' });
            }
        }
    }

</script>
