const routes = [

  { path: '/', name: 'dashboard', component: () => import('pages/DashboardPage.vue') },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // { path: '', name: 'dashboard', component: () => import('pages/IndexPage.vue') },
      { path: 'help', name: 'help', component: () => import('pages/HelpPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
