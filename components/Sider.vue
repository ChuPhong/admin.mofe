<template>
    <div>
        <ALayoutSider
            v-model="syncedCollapsed"
            :trigger="null"
            collapsible
            :collapsed-width="0"
            width="250"
            class="fixed overflow-auto left-0 z-1100 h-screen"
        >
            <div class="p-5 text-center">
                <img
                    :src="require('~/assets/images/logo_large.png')"
                    alt="MofE - Trang web nghe nhạc trực tuyến"
                    class="inline"
                    style="height: 60px;"
                />
            </div>
            <AMenu theme="dark" :default-selected-keys="[$route.name]" mode="inline">
                <AMenuItem key="index">
                    <AIcon type="pie-chart" />
                    <span>Trang chủ</span>
                </AMenuItem>
                <ASubMenu key="artists">
                    <span slot="title">
                        <AIcon type="project" />
                        <span>Ca sĩ</span>
                    </span>
                    <AMenuItem key="artists-all" :disabled="!$auth.can('management.artists.all')">
                        <NuxtLink to="/artists/all">Danh sách</NuxtLink>
                    </AMenuItem>
                    <AMenuItem key="artists-create" :disabled="!$auth.can('management.artists.store')">
                        <NuxtLink to="/artists/create">Thêm ca sĩ</NuxtLink>
                    </AMenuItem>
                </ASubMenu>
                <ASubMenu key="songs">
                    <span slot="title">
                        <AIcon type="project" />
                        <span>Bài Hát</span>
                    </span>
                    <AMenuItem key="songs-all" :disabled="!$auth.can('management.songs.all')">
                        <NuxtLink to="/songs/all">Danh sách</NuxtLink>
                    </AMenuItem>
                    <AMenuItem key="songs-create" :disabled="!$auth.can('management.songs.store')">
                        <NuxtLink to="/songs/create">Thêm bài hát</NuxtLink>
                    </AMenuItem>
                </ASubMenu>
                <ASubMenu key="users">
                    <span slot="title">
                        <AIcon type="user" />
                        <span>Người Dùng</span>
                    </span>
                    <AMenuItem key="users-all" :disabled="!$auth.can('management.users.all')">
                        <NuxtLink to="/users/all">Danh sách</NuxtLink>
                    </AMenuItem>
                    <AMenuItem key="users-create" :disabled="!$auth.can('management.users.store')">
                        <NuxtLink to="/users/create">Thêm người dùng</NuxtLink>
                    </AMenuItem>
                </ASubMenu>
                <ASubMenu key="sub2">
                    <span slot="title">
                        <AIcon type="team" />
                        <span>Team</span>
                    </span>
                    <AMenuItem key="6">Team 1</AMenuItem>
                    <AMenuItem key="8">Team 2</AMenuItem>
                </ASubMenu>
                <AMenuItem key="9">
                    <AIcon type="file" />
                    <span>File</span>
                </AMenuItem>
            </AMenu>
        </ALayoutSider>
        <div v-if="!syncedCollapsed && ($mq === 'xs' || $mq === 'sm')" class="sidenav-overlay" @click="hideSider"></div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, PropSync, Watch } from 'vue-property-decorator';

@Component({
    name: 'Sider'
})
export default class Sider extends Vue {
    @PropSync('collapsed', {
        type: Boolean,
        required: true
    })
    syncedCollapsed: boolean | undefined;

    @Watch('$mq')
    onMqChanged(screen: string) {
        switch (screen) {
            case 'xs':
            case 'sm':
                this.syncedCollapsed = true;
                break;
            default:
                this.syncedCollapsed = false;
                break;
        }
    }

    hideSider() {
        this.syncedCollapsed = true;
    }
}
</script>

<style>
.sidenav-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    opacity: 1;
    height: 120vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 997;
}
</style>
