import Vue from "vue";
import VueRouter from "vue-router"; 
 
import Admin from '@/Models/Admin'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: "Login", 
    component: () => 
      import("@/views/undefined/Login.vue"),
      meta: { requiresAuth: false } 
  },
  {
    path: '/Login',
    name: "Login", 
    component: () => 
      import("@/views/undefined/Login.vue"),
      meta: { requiresAuth: false } 
  },
  {
    path: '/Dashboard',
    name: "Dashboard", 
    component: () => 
      import("@/views/undefined/Dashboard.vue"),
      meta: { requiresAuth: true } 
  },   
  {
    path: '/RegisterMember',
    name: "RegisterMember", 
    component: () => 
      import("@/views/undefined/RegisterMember.vue"),
      meta: { requiresAuth: false } 
  },  
  {
    path: '/RegisterAgent',
    name: "RegisterAgent", 
    component: () => 
      import("@/views/undefined/RegisterAgent.vue"),
      meta: { requiresAuth: false } 
  },   
  {
    path: '/RegisterComplete',
    name: "RegisterComplete", 
    component: () =>   import("@/views/undefined/RegisterComplete.vue"),
    meta: { requiresAuth: false } 
  },     
  {
    path: '/Member',
    name: "Member", 
    component: () =>   import("@/views/undefined/Member.vue"),
    meta: { requiresAuth: true } 
  }, 
  {
    path: '/NewMember',
    name: "NewMember", 
    component: () =>   import("@/views/undefined/NewMember.vue"),
    meta: { requiresAuth: true } 
  }, 
  {
    path: '/PurchaseOrder',
    name: "PurchaseOrder", 
    component: () =>   import("@/views/undefined/PurchaseOrder.vue"),
    meta: { requiresAuth: true } 
  }, 
  {
    path: '/Quotation',
    name: "Quotation", 
    component: () => 
      import("@/views/undefined/Quotation.vue"),
      meta: { requiresAuth: true } 
  }, 
  {
    path: '/Invoice',
    name: "Invoice", 
    component: () => 
      import("@/views/undefined/Invoice.vue"),
      meta: { requiresAuth: true } 
  },   
  {
    path: '/TemporaryReceipt',
    name: "TemporaryReceipt", 
    component: () => 
      import("@/views/undefined/TemporaryReceipt.vue"),
      meta: { requiresAuth: true } 
  },   
  {
    path: '/TaxInvoiceReceipt',
    name: "TaxInvoiceReceipt", 
    component: () => 
      import("@/views/undefined/TaxInvoiceReceipt.vue"),
      meta: { requiresAuth: true } 
  }, 
  {
    path: '/Profile',
    name: "Profile", 
    component: () => 
      import("@/views/undefined/Profile.vue"),
      meta: { requiresAuth: true } 
  },  
  {
    path: '/ChangePassword',
    name: "ChangePassword", 
    component: () => 
      import("@/views/undefined/ChangePassword"),
      meta: { requiresAuth: true } 
  }, 
];
 

const router = new VueRouter({
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes, 
  mode: 'history', 
});


router.beforeEach((to, from, next) => { 
 
    const currentUser = Admin.query().count()
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth); 
    if (requiresAuth && !currentUser) next('Login');
    else if (!requiresAuth && currentUser) next('Dashboard');
    else next(); 
  
});


export default router;
