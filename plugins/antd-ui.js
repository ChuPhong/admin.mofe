import Vue from 'vue';
// noinspection ES6CheckImport
import {
    Layout,
    Menu,
    Icon,
    Row,
    Col,
    Form,
    Input,
    Button,
    Avatar,
    Dropdown,
    Pagination,
    Table,
    Tag,
    Upload,
    Select,
    Modal,
    Popconfirm,
    message,
    notification,
    ConfigProvider
} from 'ant-design-vue';

Vue.use(Avatar);
Vue.use(Layout);
Vue.use(Menu);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Form);
Vue.use(Input);
Vue.use(Button);
Vue.use(Dropdown);
Vue.use(Pagination);
Vue.use(Table);
Vue.use(Tag);
Vue.use(Upload);
Vue.use(Select);
Vue.use(Modal);
Vue.use(Popconfirm);
Vue.use(ConfigProvider);

Vue.prototype.$message = message;
Vue.prototype.$notification = notification;
