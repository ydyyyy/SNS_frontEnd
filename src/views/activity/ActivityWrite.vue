<template>
    <div id="write" v-title :data-title="title">
        <div class="me-write-header">
            <h1>欢迎来到活动发布编辑区域</h1>
            <h4>(记得自行留下联系方式)</h4>
            <div class="me-write-btns">
                <el-button type="success" round @click="publishShow">发布</el-button>
                <el-button type="warning" round @click="cancel">取消</el-button>
            </div>
        </div>

        <el-container class="me-area me-write-box">
            <el-main class="me-write-main">
                <div class="me-write-title">
                    <el-input resize="none" type="textarea" autosize v-model="activityForm.title" placeholder="请输入标题"
                        class="me-write-input">
                    </el-input>
                </div>
                <markdown-editor :editor="activityForm.editor" class="me-write-editor"></markdown-editor>
            </el-main>
        </el-container>

        <el-dialog title="摘要 分类 标签" :visible.sync="publishVisible" :close-on-click-modal="false"
            custom-class="me-dialog">
            <el-form :model="activityForm" ref="activityForm" :rules="rules">
                <el-form-item prop="summary">
                    <el-input type="textarea" v-model="activityForm.summary" :rows="6" placeholder="请输入摘要">
                    </el-input>
                </el-form-item>
                <el-form-item label="文章分类" prop="category">
                    <el-select v-model="activityForm.category" value-key="id" placeholder="请选择文章分类">
                        <el-option v-for="c in categorys" :key="c.id" :label="c.categoryname" :value="c"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="文章标签" prop="tags">
                    <el-checkbox-group v-model="activityForm.tags">
                        <el-checkbox v-for="t in tags" :key="t.id" :label="t.id" name="tags">{{ t.tagname
                            }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="活动开始时间" prop="startDate">
                    <el-date-picker v-model="activityForm.startDate" type="datetime" placeholder="选择活动开始时间"></el-date-picker>
                </el-form-item>
                <el-form-item label="活动结束时间" prop="endDate">
                    <el-date-picker v-model="activityForm.endDate" type="datetime" placeholder="选择活动结束时间"></el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="publishVisible = false">取消</el-button>
                <el-button type="primary" @click="publish('activityForm')">发布</el-button>
            </div>
        </el-dialog>
    </div>
</template>


<script>
import BaseHeader from "@/views/BaseHeader";
import MarkdownEditor from "@/components/markdown/MarkdownEditor";
import { publishActivity, getActivityById } from "@/api/activity";
import { getAllCategorys } from "@/api/activityCategory";
import { getAllTags } from "@/api/activityTag";

export default {
    name: "BlogWrite",
    mounted() {
        if (this.$route.params.id) {
            this.getActivityById(this.$route.params.id);
        }

        this.getCategorysAndTags();
        this.editorToolBarToFixedWrapper = this.$_.throttle(
            this.editorToolBarToFixed,
            200
        );

        window.addEventListener("scroll", this.editorToolBarToFixedWrapper, false);
    },
    beforeDestroy() {
        window.removeEventListener(
            "scroll",
            this.editorToolBarToFixedWrapper,
            false
        );
    },
    data() {
        return {
            publishVisible: false,
            categorys: [],
            tags: [],
            activityForm: {
                id: "",
                title: "",
                summary: "",
                category: "",
                tags: [],
                startDate: "",
                endDate: "",
                editor: {
                    value: "",
                    ref: "", //保存mavonEditor实例  实际不该这样
                    default_open: "edit",
                    toolbars: {
                        bold: true, // 粗体
                        italic: true, // 斜体
                        header: true, // 标题
                        underline: true, // 下划线
                        strikethrough: true, // 中划线
                        mark: true, // 标记
                        superscript: true, // 上角标
                        subscript: true, // 下角标
                        quote: true, // 引用
                        ol: true, // 有序列表
                        ul: true, // 无序列表
                        imagelink: true, // 图片链接
                        code: true, // code
                        fullscreen: true, // 全屏编辑
                        readmodel: true, // 沉浸式阅读
                        help: true, // 帮助
                        undo: true, // 上一步
                        redo: true, // 下一步
                        trash: true, // 清空
                        navigation: true, // 导航目录
                        //subfield: true, // 单双栏模式
                        preview: true, // 预览
                    },
                },
            },
            rules: {
                summary: [
                    { required: true, message: "请输入摘要", trigger: "blur" },
                    { max: 80, message: "不能大于80个字符", trigger: "blur" },
                ],
                category: [
                    { required: true, message: "请选择文章分类", trigger: "change" },
                ],
                tags: [
                    {
                        type: "array",
                        required: true,
                        message: "请选择标签",
                        trigger: "change",
                    },
                ],
                startDate: [
                    { required: true, message: "请选择活动开始时间", trigger: "change" },
                ],
                endDate: [
                    { required: true, message: "请选择活动结束时间", trigger: "change" },
                ],
            },
        };
    },
    computed: {
        title() {
            return "写文章 - For Fun";
        },
    },
    methods: {
        getActivityById(id) {
            let that = this;
            getActivityById(id)
                .then((data) => {
                    console.log(data.data); // 调试用，查看返回的数据
                    Object.assign(that.activityForm, data.data);
                    that.activityForm.editor.value = data.data.body.content;

                    let tags = this.activityForm.tags.map(function (item) {
                        return item.id;
                    });

                    this.activityForm.tags = tags;
                })
                .catch((error) => {
                    if (error !== "error") {
                        that.$message({
                            type: "error",
                            message: "文章加载失败",
                            showClose: true,
                        });
                    }
                });
        },
        publishShow() {
            if (!this.activityForm.title) {
                this.$message({
                    message: "标题不能为空哦",
                    type: "warning",
                    showClose: true,
                });
                return;
            }

            if (this.activityForm.title.length > 30) {
                this.$message({
                    message: "标题不能大于30个字符",
                    type: "warning",
                    showClose: true,
                });
                return;
            }

            if (!this.activityForm.editor.ref.d_render) {
                this.$message({
                    message: "内容不能为空哦",
                    type: "warning",
                    showClose: true,
                });
                return;
            }

            this.publishVisible = true;
        },
        publish(activityForm) {
            let that = this;

            this.$refs[activityForm].validate((valid) => {
                if (valid) {
                    let tags = this.activityForm.tags.map(function (item) {
                        return { id: item };
                    });

                    let activity = {
                        id: this.activityForm.id,
                        title: this.activityForm.title,
                        summary: this.activityForm.summary,
                        category: this.activityForm.category,
                        tags: tags,
                        startDate: this.activityForm.startDate,
                        endDate: this.activityForm.endDate,
                        body: {
                            content: this.activityForm.editor.value,
                            contentHtml: this.activityForm.editor.ref.d_render,
                        },
                    };

                    this.publishVisible = false;

                    let loading = this.$loading({
                        lock: true,
                        text: "发布中，请稍后...",
                    });

                    publishActivity(activity)
                        .then((data) => {
                            loading.close();
                            that.$message({
                                message: "发布成功啦",
                                type: "success",
                                showClose: true,
                            });
                            that.$router.push({ path: `/activity/view/${data.data.activityId}` });
                        })
                        .catch((error) => {
                            loading.close();
                            if (error !== "error") {
                                that.$message({
                                    message: error,
                                    type: "error",
                                    showClose: true,
                                });
                            }
                        });
                } else {
                    return false;
                }
            });
        },
        cancel() {
            this.$confirm("文章将不会保存, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                this.$router.push("/");
            });
        },
        getCategorysAndTags() {
            let that = this;
            getAllCategorys()
                .then((data) => {
                    that.categorys = data.data;
                })
                .catch((error) => {
                    if (error !== "error") {
                        that.$message({
                            type: "error",
                            message: "文章分类加载失败",
                            showClose: true,
                        });
                    }
                });

            getAllTags()
                .then((data) => {
                    that.tags = data.data;
                })
                .catch((error) => {
                    if (error !== "error") {
                        that.$message({
                            type: "error",
                            message: "标签加载失败",
                            showClose: true,
                        });
                    }
                });
        },
        editorToolBarToFixed() {
            let toolbar = document.querySelector(".v-note-op");
            let curHeight =
                document.documentElement.scrollTop || document.body.scrollTop;
            if (curHeight >= 160) {
                document.getElementById("placeholder").style.display = "block"; //bad  用计算属性较好
                toolbar.classList.add("me-write-toolbar-fixed");
            } else {
                document.getElementById("placeholder").style.display = "none";
                toolbar.classList.remove("me-write-toolbar-fixed");
            }
        },
    },
    components: {
        "base-header": BaseHeader,
        "markdown-editor": MarkdownEditor,
    },
    //组件内的守卫 调整body的背景色
    beforeRouteEnter(to, from, next) {
        window.document.body.style.backgroundColor = "#fff";
        next();
    },
    beforeRouteLeave(to, from, next) {
        window.document.body.style.backgroundColor = "#f5f5f5";
        next();
    },
};
</script>

<style scoped>
#write {
    font-family: 'Arial', sans-serif;
}

h4 {
    margin-top: auto;
}

.me-write-header {
    display: flex;
    padding: 20px;
    background-color: #f5f5f5;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.me-write-btns {
    /* position: absolute;
    right: 0; */
    margin-left: auto;
    gap: 10px;
}

.me-area {
    max-width: 800px;
    margin: 40px auto;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

.me-write-main {
    display: flex;
    flex-direction: column;
}

.me-write-title {
    margin-bottom: 20px;
}

.me-write-input textarea {
    font-size: 24px;
    font-weight: bold;
    border: none;
    padding: 10px;
    border-radius: 4px;
    background-color: #f9f9f9;
}

.me-write-editor {
    min-height: 400px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    padding: 10px;
}

.el-dialog__body {
    padding: 20px;
}

.dialog-footer {
    display: flex;
    justify-content: flex-end;
    padding: 10px 20px;
    border-top: 1px solid #ebeef5;
}
</style>