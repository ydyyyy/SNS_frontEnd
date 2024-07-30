<template>
    <div class="me-view-body" v-title :data-title="title">
      <el-container class="me-view-container">
        <!--<el-aside class="me-area">-->
          <!--<ul class="me-operation-list">-->
            <!--<li class="me-operation-item">-->
              <!--<el-button type="primary" icon="el-icon-edit"></el-button>-->
            <!--</li>-->
          <!--</ul>-->
        <!--</el-aside>-->
        <el-main>
  
          <div class="me-view-card">
            <h1 class="me-view-title">{{activity.title}}</h1>
            <div class="me-view-author">
              <a class="">
                <img class="me-view-picture" :src="activity.author.avatar"></img>
              </a>
              <div class="me-view-info">
                <span>{{activity.author.nickname}}</span>
                <div class="me-view-meta">
                  <span>{{activity.createDate | format}}</span> (创建日期)
                  <span>活动开始: {{activity.startDate | format}}</span>
                  <span>活动结束: {{activity.endDate | format}}</span>
                  <span>{{activity.createDate | format}}</span>
                  <span>阅读   {{activity.viewCounts}}</span>
                  <span>评论   {{activity.commentCounts}}</span>
                </div>
  
              </div>
              <el-button
                v-if="this.activity.author.id == this.$store.state.id"
                @click="editActivity()"
                style="position: absolute;left: 60%;"
                size="mini"
                round
                icon="el-icon-edit">编辑</el-button>
            </div>
            <div class="me-view-content">
              <markdown-editor :editor=activity.editor></markdown-editor>
            </div>
  
            <div class="me-view-end">
              <el-alert
                title="文章End..."
                type="success"
                center
                :closable="false">
              </el-alert>
            </div>
  
            <div class="me-view-tag">
              标签：
              <!--<el-tag v-for="t in activity.tags" :key="t.id" class="me-view-tag-item" size="mini" type="success">{{t.tagname}}</el-tag>-->
              <el-button @click="tagOrCategory('tag', t.id)" size="mini" type="primary" v-for="t in activity.tags" :key="t.id" round plain>{{t.tagname}}</el-button>
            </div>
  
            <div class="me-view-tag">
              文章分类：
              <!--<span style="font-weight: 600">{{activity.category.categoryname}}</span>-->
              <el-button @click="tagOrCategory('category', activity.category.id)" size="mini" type="primary" round plain>{{activity.category.categoryname}}</el-button>
            </div>
  
            <div class="me-view-comment">
              <div class="me-view-comment-write">
                <el-row :gutter="20">
                  <el-col :span="2">
                    <a class="">
                      <img class="me-view-picture" :src="avatar"></img>
                    </a>
                  </el-col>
                  <el-col :span="22">
                    <el-input
                      type="textarea"
                      :autosize="{ minRows: 2}"
                      placeholder="你的评论..."
                      class="me-view-comment-text"
                      v-model="comment.content"
                      resize="none">
                    </el-input>
                  </el-col>
                </el-row>
  
                <el-row :gutter="20">
                  <el-col :span="2" :offset="22">
                    <el-button type="text" @click="publishActivityComment()">评论</el-button>
                  </el-col>
                </el-row>
              </div>
  
              <div class="me-view-comment-title">
                <span>{{activity.commentCounts}} 条评论</span>
              </div>
  
              <commment-item
                v-for="(c,index) in comments"
                :comment="c"
                :activityId="activity.id"
                :index="index"
                :rootCommentCounts="comments.length"
                @commentCountsIncrement="commentCountsIncrement"
                :key="c.id">
              </commment-item>
  
            </div>
  
          </div>
        </el-main>
  
      </el-container>
    </div>
  </template>
  
  <script>
    import MarkdownEditor from '@/components/markdown/MarkdownEditor'
    import CommmentItem from '@/components/comment/CommentItem'
    import {viewActivity} from '@/api/activity'
    import {getCommentsByActivity, publishActivityComment} from '@/api/comment'
  
    import default_avatar from '@/assets/img/default_avatar.png'
  
    export default {
      name: 'BlogView',
      created() {
        this.getActivity()
      },
      watch: {
        '$route': 'getActivity'
      },
      filters: {
        // ... 其他过滤器
        format(value) {
          return formatTime(value);
        }
      },
      data() {
        return {
          activity: {
            id: '',
            title: '',
            commentCounts: 0,
            viewCounts: 0,
            summary: '',
            author: {},
            tags: [],
            category:{},
            createDate: '',
            startDate: '',
            endDate: '',
            editor: {
              value: '',
              toolbarsFlag: false,
              subfield: false,
              defaultOpen: 'preview'
            }
          },
          comments: [],
          comment: {
            activity: {},
            content: ''
          }
        }
      },
      computed: {
        avatar() {
          let avatar = this.$store.state.avatar
  
          if (avatar.length > 0) {
            return avatar
          }
          return default_avatar
        },
        title() {
          return `${this.activity.title} - 文章 - For Fun`
        }
      },
      methods: {
        tagOrCategory(type, id) {
          this.$router.push({path: `/${type}/${id}`})
        },
        editActivity() {
          this.$router.push({path: `/activitywrite/${this.activity.id}`})
        },
        getActivity() {
          let that = this
          viewActivity(that.$route.params.id).then(data => {
            Object.assign(that.activity, data.data)
            that.activity.editor.value = data.data.body.content
            // 添加获取开始日期和结束日期的逻辑
            this.activity.startDate = data.data.startDate; // 假设API返回的开始日期属性名为startDate
            this.activity.endDate = data.data.endDate;     // 假设API返回的结束日期属性名为endDate
            that.getCommentsByActivity()
          }).catch(error => {
            if (error !== 'error') {
              that.$message({type: 'error', message: '文章加载失败', showClose: true})
            }
          })
        },
        publishActivityComment() {
          let that = this
          if (!that.comment.content) {
            return;
          }
          that.comment.activity.id = that.activity.id
  
          publishActivityComment(that.comment).then(data => {
            that.$message({type: 'success', message: '评论成功', showClose: true})
            that.comments.unshift(data.data)
            that.commentCountsIncrement()
            that.comment.content = ''
          }).catch(error => {
            if (error !== 'error') {
              that.$message({type: 'error', message: '评论失败', showClose: true})
            }
          })
        },
        getCommentsByActivity() {
          let that = this
          getCommentsByActivity(that.activity.id).then(data => {
            that.comments = data.data
          }).catch(error => {
            if (error !== 'error') {
              that.$message({type: 'error', message: '评论加载失败', showClose: true})
            }
          })
        },
        commentCountsIncrement() {
          this.activity.commentCounts += 1
        }
      },
      components: {
        'markdown-editor': MarkdownEditor,
        CommmentItem
      },
      //组件内的守卫 调整body的背景色
      beforeRouteEnter(to, from, next) {
        window.document.body.style.backgroundColor = '#fff';
        next();
      },
      beforeRouteLeave(to, from, next) {
        window.document.body.style.backgroundColor = '#f5f5f5';
        next();
      }
    }
  </script>
  
  <style>
    .me-view-body {
      margin: 100px auto 140px;
    }
  
    .me-view-container {
      width: 700px;
    }
  
    .el-main {
      overflow: hidden;
    }
  
    .me-view-title {
      font-size: 34px;
      font-weight: 700;
      line-height: 1.3;
    }
  
    .me-view-author {
      /*margin: 30px 0;*/
      margin-top: 30px;
      vertical-align: middle;
    }
  
    .me-view-picture {
      width: 40px;
      height: 40px;
      border: 1px solid #ddd;
      border-radius: 50%;
      vertical-align: middle;
      background-color: #5fb878;
    }
  
    .me-view-info {
      display: inline-block;
      vertical-align: middle;
      margin-left: 8px;
    }
  
    .me-view-meta {
      font-size: 12px;
      color: #969696;
    }
  
    .me-view-end {
      margin-top: 20px;
    }
  
    .me-view-tag {
      margin-top: 20px;
      padding-left: 6px;
      border-left: 4px solid #c5cac3;
    }
  
    .me-view-tag-item {
      margin: 0 4px;
    }
  
    .me-view-comment {
      margin-top: 60px;
    }
  
    .me-view-comment-title {
      font-weight: 600;
      border-bottom: 1px solid #f0f0f0;
      padding-bottom: 20px;
    }
  
    .me-view-comment-write {
      margin-top: 20px;
    }
  
    .me-view-comment-text {
      font-size: 16px;
    }
  
    .v-show-content {
      padding: 8px 25px 15px 0px !important;
    }
  
    .v-note-wrapper .v-note-panel {
      box-shadow: none !important;
    }
  
    .v-note-wrapper .v-note-panel .v-note-show .v-show-content, .v-note-wrapper .v-note-panel .v-note-show .v-show-content-html {
      background: #fff !important;
    }
  
  
  </style>
  