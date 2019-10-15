<template>
    <div class="flex justify-center items-center h-screen bg-black">
        <div class="error-text text-white font-light text-xl sm:text-2xl md:text-4xl tracking-wider">
            403 Forbidden
        </div>
    </div>
</template>

<script>
export default {
    name: 'Forbidden'
};
</script>

<style scoped>
.error-text {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}
</style>
