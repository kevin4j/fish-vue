<template>
  <div class="content">
    <div>详情页</div>
    <div>
      author: {{ user.name }}
    </div>
    <div>
      {{detail.info}}
    </div>
    <div>
      <img v-bind:src="detail.imgId"/>
    </div>
    <div>
      <a href="javascript:void(0);" onclick="window.history.back(-1);">返回</a>
    </div>

  </div>
</template>

<script>
  import {getAuthor} from '../mock/api'
  import {fetchData} from '../mock/fetch';

  export default {
    name: 'Third',
    data () {
      return {
        user: {},
        detail: this.$route.query
      }
    },
    mounted () {
      this.init();
    },
    methods: {
      init () {
        return fetchData(getAuthor, {}).then((res) => {
          if (res && res.data) {
            this.user = res.data
          }
        })
      }
    }
  }
</script>

<style scoped>
.content div{
  line-height: 40px;
}
.content div img{
  max-width: 100%;
  max-height: 100%;
}
</style>
