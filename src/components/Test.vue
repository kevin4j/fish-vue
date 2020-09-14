<template>
    <div>
        <div>Test</div>
        <div>
            <router-link :to="{path: 'hello', query: {msg: 'Hello Kevin!'}}">Go to Hello</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Test",
        mounted() {
        }
    }
</script>

<style scoped>

</style>