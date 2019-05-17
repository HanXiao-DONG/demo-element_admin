<template>
    <div>
        ggggg
        <el-button v-permission="'alls'">上传</el-button>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data: function () {
            return {
                loading: false,
                page: {
                    current: 1,
                    size: 10,
                    sizes: [10, 20, 50, 100],
                    total: 0
                }
            }
        }
    }
</script>
<style scoped>
</style>
