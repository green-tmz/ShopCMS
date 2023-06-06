<template>
    <AdminHeader v-if="authenticated" />
    <AdminSidebar v-if="authenticated" />
    <router-view />
    <AdminFooter v-if="authenticated" />
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import AdminHeader from './AdminHeader.vue'
import AdminSidebar from './AdminSidebar.vue'
import AdminFooter from './AdminFooter.vue'

export default {
    name: 'Admin',
    data(){
        return {
            user:this.$store.state.auth.user
        }
    },
    computed: {
        ...mapGetters('auth', ['authenticated', 'user'])
    },
    components: {
        AdminHeader,
        AdminSidebar,
        AdminFooter
    },
}
</script>
