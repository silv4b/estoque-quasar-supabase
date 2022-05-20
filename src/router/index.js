import { route } from 'quasar/wrappers';
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router';
import routes from './routes';
import useAuthUser from "../composables/UserAuthUser";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE)
  });

  /* verificando se existe um usuário logado na aplicação */
  Router.beforeEach((to) => {
    const { isLoggedIn } = useAuthUser();

    // se for uma requisição de recuperação de senha, manda para a rota de resete-password
    if (
      to.hash.includes('type=recovery') && // requisitando modificação de algo (senha)
      to.name !== 'reset-password' // verifica se o nome da rota é diferente de reset-passord (ainda n tá na rota correta)
    ) {
      const accessToken = to.hash.split('&')[0]; // access token da url, coleta o primeiro parâmetro da url, que separada por & é o access token
      const token = accessToken.replace('#access_token=', ''); // coleta o token somente
      return { name: 'reset-password', query: { token } }; // manda para a rota de reset-password, adicionando o token na query
    }

    if (
      !isLoggedIn() && // se não estiver logado
      to.meta.requiresAuth && // devera ser criado em todas as rotas que deverão ser seguras (valida a securidade da rota no arquivo de rotas [routes.js])
      !Object.keys(to.query).includes('fromEmail') // verifica se na query da rota tem incluso o 'fromEmail'
    ) {
      return { name: 'login' };
    }
  });

  return Router;
});
