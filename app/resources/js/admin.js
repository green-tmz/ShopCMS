import './bootstrap';
import '../sass/app.scss'
import router from '@/admin/router'
import store from '@/admin/store'
import CKEditor from '@ckeditor/ckeditor5-vue';

import Admin from '@/admin/components/Admin.vue'
// import css
import '../../public/admin/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css'
import '../../public/admin/plugins/icheck-bootstrap/icheck-bootstrap.min.css'
import '../../public/admin/plugins/jqvmap/jqvmap.min.css'
import '../../public/admin/dist/css/adminlte.min.css'
import '../../public/admin/plugins/overlayScrollbars/css/OverlayScrollbars.min.css'
import '../../public/admin/plugins/daterangepicker/daterangepicker.css'
import '../../public/admin/plugins/summernote/summernote-bs4.min.css'
import '../../public/admin/plugins/jsgrid/jsgrid.min.css'
import '../../public/admin/plugins/jsgrid/jsgrid-theme.min.css'

//import js
import '../../public/admin/plugins/jquery/jquery.min.js'
import '../../public/admin/plugins/jquery-ui/jquery-ui.min.js'
import '../../public/admin/plugins/bootstrap/js/bootstrap.bundle.min.js'
import '../../public/admin/plugins/chart.js/Chart.min.js'
import '../../public/admin/plugins/sparklines/sparkline.js'
import '../../public/admin/plugins/jqvmap/jquery.vmap.min.js'
import '../../public/admin/plugins/jqvmap/maps/jquery.vmap.usa.js'
import '../../public/admin/plugins/jquery-knob/jquery.knob.min.js'
// import '../../public/admin/plugins/moment/moment.min.js'
// import '../../public/admin/plugins/daterangepicker/daterangepicker.js'
// import '../../public/admin/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js'
import '../../public/admin/plugins/summernote/summernote-bs4.min.js'
import '../../public/admin/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js'
import '../../public/admin/plugins/jsgrid/demos/db.js'
import '../../public/admin/plugins/jsgrid/jsgrid.min.js'
import '../../public/admin/dist/js/adminlte.js'

import { createApp } from 'vue/dist/vue.esm-bundler';

const app = createApp(Admin)
app.use(router)
app.use(store)
app.use(CKEditor)
app.mount('#app')
