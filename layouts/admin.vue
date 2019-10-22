<template>
    <AConfigProvider prefix-cls="mofe">
        <ALayout class="h-screen">
            <Sider :collapsed.sync="collapsed" />
            <ALayout
                :style="{
                    marginLeft: !collapsed && ($mq !== 'xs' && $mq !== 'sm') ? '250px' : '0',
                    transition: 'margin-left 0.2s',
                    willChange: 'margin-left'
                }"
            >
                <ALayoutHeader class="bg-white p-0">
                    <ARow type="flex" justify="space-between" class="mr-5">
                        <ACol>
                            <AIcon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="collapseSider" />
                        </ACol>
                        <ACol>
                            <ADropdown :trigger="['click']">
                                <AAvatar class="cursor-pointer" :src="this.$auth.user.avatar" />
                                <AMenu slot="overlay" @click="clickUserMenu">
                                    <AMenuItem key="info" class="flex items-center">
                                        <AIcon type="user" />
                                        Thông tin
                                    </AMenuItem>
                                    <AMenuDivider />
                                    <AMenuItem key="logout" class="flex items-center">
                                        <AIcon type="logout" />
                                        Đăng xuất
                                    </AMenuItem>
                                </AMenu>
                            </ADropdown>
                        </ACol>
                    </ARow>
                </ALayoutHeader>
                <ALayoutContent class="mx-5 mt-5 p-5 bg-white" style="overflow: initial; min-height: auto;">
                    <nuxt />
                </ALayoutContent>
                <ALayoutFooter class="text-center">
                    MofE.Admin &copy;
                    {{ currentYear }}
                    Created by MofE Team
                </ALayoutFooter>
            </ALayout>
        </ALayout>
    </AConfigProvider>
</template>

<script>
import Sider from '@/components/Sider.vue';

export default {
    name: 'AdminLayout',
    middleware: 'authenticate',
    components: {
        Sider
    },
    data() {
        return {
            collapsed: false
        };
    },
    computed: {
        currentYear() {
            return new Date().getFullYear();
        }
    },
    methods: {
        collapseSider() {
            this.collapsed = !this.collapsed;
        },
        async clickUserMenu({ key }) {
            if (key === 'logout') {
                await this.$auth.logout();
                this.$router.push('/login');
            }
        }
    }
};
</script>

<style lang="less">
.trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
    will-change: color;

    &:hover {
        color: #1da57a;
    }
}
</style>
