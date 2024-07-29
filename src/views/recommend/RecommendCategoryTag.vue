<template>
  <div class="me-ct-body" v-title :data-title="title">
    <el-container class="me-ct-container">
      <el-main>
        <div class="me-ct-title me-area">
          <template v-if="this.$route.params.type === 'tag'">
            <img class="me-ct-picture" :src="ct.avatar?ct.avatar:defaultAvatar"/>
            <h3 class="me-ct-name">{{ct.tagname}}</h3>
          </template>

          <template v-else>
            <img class="me-ct-picture" :src="ct.avatar?ct.avatar:defaultAvatar"/>
            <h3 class="me-ct-name">{{ct.categoryname}}</h3>
            <p>{{ct.description}}</p>
          </template>

          <span class="me-ct-meta">{{ct.articles}} 文章</span>
        </div>

        <div class="me-ct-articles">
          <recommend-scroll-page v-bind="article"></recommend-scroll-page>
        </div>

      </el-main>
    </el-container>
  </div>
</template>

<script>
  import RecommendScrollPage from '@/views/common/RecommendScrollPage'
  import {getArticlesByCategory, getArticlesByTag} from '@/api/article'
  import {getStackDetail} from '@/api/recommendApi/stack'
  import {getIndustryDetail} from '@/api/recommendApi/industry'
  import defaultAvatar from '@/assets/img/logo.png'


  export default {
    name: 'BlogCategoryTag',
    created() {
      this.getCategoryOrTagAndArticles()
    },
    watch: {
      '$route': 'getCategoryOrTagAndArticles'
    },
    data() {
      return {
        defaultAvatar: defaultAvatar,
        ct: {},
        article: {
          query: {
            tagId: '',
            categoryId: ''
          }
        },
      }
    },
    computed: {
      title() {
        if(this.$route.params.type === 'tag'){
          return `${this.ct.tagname} - 公司 - For Fun`
        }
        return `${this.ct.categoryname} - 行业分类 - For Fun`
      }
    },
    methods: {
      getCategoryOrTagAndArticles() {
        let id = this.$route.params.id
        let type = this.$route.params.type
        if ('tag' === type) {
          this.getStackDetail(id)
          this.article.query.tagId = id
        } else {
          this.getIndustryDetail(id)
          this.article.query.categoryId = id
        }

      },
      getIndustryDetail(id) {
        let that = this
        getIndustryDetail(id).then(data => {
          console.log(data,"我是getIndustryDetail请求获取的分类后的文章数据44444")
          that.ct = data.data
          that.ct.avatar = `/static${that.ct.avatar}`;
        }).catch(error => {
          if (error !== 'error') {
            that.$message({type: 'error', message: '文章分类加载失败', showClose: true})
          }
        })
      },
      getStackDetail(id) {
        let that = this
        getStackDetail(id).then(data => {
          console.log(data,"我是getStackDetail请求获取的标签的数据")
          that.ct = data.data
          that.ct.avatar = `/static${that.ct.avatar}`;
        }).catch(error => {
          if (error !== 'error') {
            that.$message({type: 'error', message: '标签加载失败', showClose: true})
          }
        })
      },
      getArticlesByCategory(id) {
        let that = this
        getArticlesByCategory(id).then(data => {
          that.articles = data.data
        }).catch(error => {
          if (error !== 'error') {
            that.$message({type: 'error', message: '文章加载失败', showClose: true})
          }
        })
      },
      getArticlesByTag(id) {
        let that = this
        getArticlesByTag(id).then(data => {
          that.articles = data.data
        }).catch(error => {
          if (error !== 'error') {
            that.$message({type: 'error', message: '文章加载失败', showClose: true})
          }
        })
      }
    },
    components: {
      RecommendScrollPage
    }
  }
</script>

<style>
  .me-ct-body {
    margin: 60px auto 140px;
    min-width: 100%;
  }

  .el-main {
    padding: 0;
  }

  .me-ct-title {
    text-align: center;
    height: 150px;
    padding: 20px;
  }

  .me-ct-picture {
    width: 60px;
    height: 60px;
  }

  .me-ct-name {
    font-size: 28px;
  }

  .me-ct-meta {
    font-size: 12px;
    color: #969696;
  }

  .me-ct-articles {
    width: 640px;
    margin: 30px auto;
  }

</style>
