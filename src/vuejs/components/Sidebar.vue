<template>

    <div class="o-page__sidebar js-page-sidebar">
        <div class="c-sidebar">

            <router-link class="c-sidebar__brand" to="/app/">
                <img style="margin: 0 auto;" class="c-sidebar__brand-img" :src="logo" alt="Logo">
            </router-link>

            <template v-if="!$parent.user.isAdmin">

                <h4 class="c-sidebar__title">Dashboards</h4>
                <ul class="c-sidebar__list">

                    <li class="c-sidebar__item">
                        <router-link class="c-sidebar__link" to="/app/visao-geral">
                            <i class="fa fa-home u-mr-xsmall"></i>Visão Geral
                        </router-link>
                    </li>

                    <li class="c-sidebar__item">
                        <router-link class="c-sidebar__link" to="/app/estatisticas">
                            <i class="fa fa-line-chart u-mr-xsmall"></i>Estatísticas
                        </router-link>
                    </li>

                    <li class="c-sidebar__item">
                        <router-link class="c-sidebar__link" to="/app/clientes">
                            <i class="fa fa-street-view u-mr-xsmall"></i>Clientes
                        </router-link>
                    </li>

                    <li class="c-sidebar__item">
                        <router-link class="c-sidebar__link" to="/app/acessos">
                            <i class="fa fa-newspaper-o u-mr-xsmall"></i>Comentários
                        </router-link>
                    </li>

                </ul>

                <h4 class="c-sidebar__title">Configurações</h4>
                <ul class="c-sidebar__list">

                    <li class="c-sidebar__item">
                        <router-link class="c-sidebar__link" to="/app/aparelhos">
                            <i class="fa fa-chain-broken u-mr-xsmall"></i>Aparelhos
                        </router-link>
                    </li>

                    <li class="c-sidebar__item">
                        <router-link class="c-sidebar__link" to="/app/pesquisas">
                            <i class="fa fa-bullhorn u-mr-xsmall"></i>Pesquisas
                        </router-link>
                    </li>

                    <li class="c-sidebar__item">
                        <router-link class="c-sidebar__link" to="/app/minha-conta">
                            <i class="fa fa-cog u-mr-xsmall"></i>Minha Conta
                        </router-link>
                    </li>

                </ul>

            </template>

            <template v-else>

                <h4 class="c-sidebar__title">Configurações</h4>
                <ul class="c-sidebar__list">

                    <li class="c-sidebar__item">
                        <router-link class="c-sidebar__link" to="/app/estabelecimentos">
                            <i class="fa fa-user-plus u-mr-xsmall"></i>Estabelecimentos
                        </router-link>
                    </li>

                </ul>

            </template>

            <ul class="c-sidebar__list">

                <li class="c-sidebar__item">
                    <a class="c-sidebar__link" @click="sair()">
                        <i class="fa fa-sign-in u-mr-xsmall"></i>Sair
                    </a>
                </li>

            </ul>

        </div><!-- // .c-sidebar -->
    </div><!-- // .o-page__sidebar -->

</template>

<script>

    export default {
        data() {
            return {
                logo: 'img/logo.png'
            }
        },
        mounted(){
            Sidebar();
        },
        methods: {
            sair(){
                this.$parent.logout();
            }
        }
    }

</script>
