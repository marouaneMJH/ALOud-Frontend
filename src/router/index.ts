import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useAuthStore } from "../stores/auth";

const routes: RouteRecordRaw[] = [
    // Auth Routes (NO authentication required)
    {
        path: "/login",
        component: () => import("../pages/LoginPage.vue"),
        meta: { title: "Login", requiresAuth: false },
    },
    {
        path: "/register",
        component: () => import("../pages/RegisterPage.vue"),
        meta: { title: "Register", requiresAuth: false },
    },

    // Protected Routes (authentication REQUIRED)
    {
        path: "/dashboard",
        component: () => import("../pages/DashboardPage.vue"),
        meta: { title: "Dashboard", requiresAuth: true },
    },
    {
        path: "/brands",
        component: () => import("../pages/BrandsPage.vue"),
        meta: { title: "Brands", requiresAuth: true },
    },
    {
        path: "/perfumes",
        component: () => import("../pages/PerfumesPage.vue"),
        meta: { title: "Perfumes", requiresAuth: true },
    },
    {
        path: "/families",
        component: () => import("../pages/FamiliesPage.vue"),
        meta: { title: "Families", requiresAuth: true },
    },
    {
        path: "/notes",
        component: () => import("../pages/NotesPage.vue"),
        meta: { title: "Notes", requiresAuth: true },
    },
    {
        path: "/accords",
        component: () => import("../pages/AccordsPage.vue"),
        meta: { title: "Accords", requiresAuth: true },
    },
    {
        path: "/tags",
        component: () => import("../pages/TagsPage.vue"),
        meta: { title: "Tags", requiresAuth: true },
    },
    {
        path: "/seasons",
        component: () => import("../pages/SeasonsPage.vue"),
        meta: { title: "Seasons", requiresAuth: true },
    },
    {
        path: "/occasions",
        component: () => import("../pages/OccasionsPage.vue"),
        meta: { title: "Occasions", requiresAuth: true },
    },
    {
        path: "/expert-system",
        component: () => import("../pages/ExpertSystemPage.vue"),
        meta: { title: "Expert System", requiresAuth: true },
    },
    {
        path: "/llm-config",
        component: () => import("../pages/LLMConfigPage.vue"),
        meta: { title: "LLM Configuration", requiresAuth: true },
    },
    {
        path: "/appearance",
        component: () => import("../pages/AppearancePage.vue"),
        meta: { title: "Appearance", requiresAuth: true },
    },

    // Default redirect
    {
        path: "/",
        redirect: "/dashboard",
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Route Guard: Protect authenticated routes
router.beforeEach((to) => {
    const authStore = useAuthStore();
    const requiresAuth = (to.meta.requiresAuth as boolean) ?? true;

    // Set page title
    const title = (to.meta.title as string) || "ALOud Admin";
    document.title = `${title} - ALOud Admin`;

    // Check authentication
    if (requiresAuth && !authStore.isAuthenticated) {
        // User needs to login
        return "/login";
    }

    // Redirect already-logged-in users away from login/register
    if (
        !requiresAuth &&
        authStore.isAuthenticated &&
        (to.path === "/login" || to.path === "/register")
    ) {
        return "/dashboard";
    }

    // Allow navigation
    return true;
});

export default router;
