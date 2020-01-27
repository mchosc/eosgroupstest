const routes = [
  {
    path: '/',
    component: () => import('layouts/HomeLayout.vue'),
    children: [
      { path: '', component: () => import('pages/home.vue') },
      { path: 'create', component: () => import('pages/create.vue') },
      { path: 'browse', component: () => import('pages/browse.vue') },
      { path: 'create/:newgroupname', component: () => import('pages/create.vue') },
      { path: 'preferences', component: () => import('pages/preferences.vue') },
      // { path: 'pricing', component: () => import('pages/pricing.vue') }
    ]
  },

  {
    path: '/documentation',
    component: () => import('layouts/DocsLayout.vue'),
    children: [
      { path: '', component: () => import('pages/docs/getting-started.vue') }
    ]
  },

  {
    path: '/manage/:groupname',
    component: () => import('layouts/GroupLayout.vue'),
    children: [
      { path: '', component: () => import('pages/manage/info.vue') },
      { path: 'custodians', component: () => import('pages/manage/custodians.vue') },
      { path: 'proposals', component: () => import('pages/manage/proposals.vue') },
      { path: 'new-proposal', component: () => import('pages/manage/new-proposal.vue') },
      { path: 'settings', component: () => import('pages/manage/settings.vue') },
      { path: 'wallet', component: () => import('pages/manage/wallet.vue') },
      { path: 'resources', component: () => import('pages/manage/resources.vue') },
      { path: 'thresholds', component: () => import('pages/manage/thresholds.vue') },
      { path: 'modules', component: () => import('pages/manage/modules.vue') },
    ]
  },

  {
    path: '/members/:groupname',
    component: () => import('layouts/GroupLayout.vue'),
    children: [
      { path: '', component: () => import('pages/manage/info.vue') },
      { path: 'dashboard', component: () => import('pages/members/dashboard.vue') },
      { path: 'vote', component: () => import('pages/members/vote.vue') },
      { path: 'register', component: () => import('pages/members/register.vue') },

    ]
  },


]

// Always leave this as last one
if(process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes