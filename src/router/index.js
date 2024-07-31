import Vue from "vue";
import Router from "vue-router";
import Home from "@/Home";
import { Message } from "element-ui";
import store from "@/store";
import { getToken } from "@/request/token";

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: "/",
            component: Home,
            name: "Home",
            redirect: "/blog", // 重定向
            children: [
                // 博客模块
                { path: "blog", name: "Blog", component: () => import("@/views/blog/Blog") },
                { path: "blog/log", component: () => import("@/views/blog/BlogLog") },
                { path: "blog/archives/:year?/:month?", component: () => import("@/views/blog/BlogArchive") },
                { path: "blog/messageBoard", component: () => import("@/views/blog/BlogMessageBoard") },
                { path: "blog/view/:id", component: () => import("@/views/blog/BlogView") },
                { path: "blog/:type/all", component: () => import("@/views/blog/BlogAllCategoryTag") },
                { path: "blog/:type/:id", component: () => import("@/views/blog/BlogCategoryTag") },
                { path: "blogwrite/:id?", component: () => import("@/views/blog/BlogWrite"), meta: { requireLogin: true } },
                // 抓包模块
                { path: "project", name: "Project", component: () => import("@/views/project/Project") },
                // 活动模块
                { path: "activity", name: "Activity", component: () => import("@/views/activity/Activity") },
                { path: "activity/myActivity", component: () => import("@/views/activity/MyActivity"), meta: { requireLogin: true } },
                { path: "activity/view/:id", component: () => import("@/views/activity/ActivityView") },
                { path: "activity/:type/all", component: () => import("@/views/activity/ActivityAllCategoryTag") },
                { path: "activity/:type/:id", component: () => import("@/views/activity/ActivityCategoryTag") },
                { path: "activity/archives/:year?/:month?", component: () => import("@/views/activity/ActivityArchive") },
                { path: "activitywrite/:id?", component: () => import("@/views/activity/ActivityWrite"), meta: { requireLogin: true } },
                { path: "activity/myActivity", component: () => import("@/views/activity/MyActivity"), meta: { requireLogin: true } },
                // 内推模块
                { path: "recommend", name: "Recommend", component: () => import("@/views/recommend/Recommend") },
            ],
        },
        { path: "/personCenter", name: "PersonCenter", component: () => import("@/views/PersonCenter") },
        { path: "/login", component: () => import("@/views/Login") },
        { path: "/register", component: () => import("@/views/Register") },
    ],
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 };
    },
});

router.beforeEach((to, from, next) => {
    if (getToken()) {
        if (to.path === "/login") {
            next({ path: "/" });
        } else {
            if (store.state.account.length === 0) {
                store.dispatch("getUserInfo")
                    .then(() => {
                        next();
                    })
                    .catch(() => {
                        next({ path: "/" });
                    });
            } else {
                next();
            }
        }
    } else {
        if (to.matched.some(r => r.meta.requireLogin)) {
            Message({
                type: "warning",
                showClose: true,
                message: "请先登录哦",
            });
            next("/login");
        } else {
            next();
        }
    }
});

export default router;
