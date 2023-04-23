
<template>
  <el-skeleton class="skele-wrapper" v-if="blog.title === ''" :rows="5" animated />
  <el-skeleton class="skele-wrapper" v-if="blog.title === ''" :rows="14" animated />
  <div v-else class="content">
    <header>
      <div class="headerContent">
        <div class="left">
          <h1 class="title">{{ blog.title }}</h1>
          <p>by: {{ blog.author }}</p>
        </div>
        <div class="right">
          <ReadMore @click="onChildChange" />
        </div>
      </div>
    </header>
    <section>
      <div class="content-html" v-html="blog.content"></div>
    </section>
    <div class="footer">
      <ReadMore msg="下一篇" @click="onChildChange" />
    </div>
    <p class="tip">申明本站只有用作学习使用,如有侵权,联系我进行删除</p>
    <div class="history" @click="openDrawer">历史记录</div>
  </div>
  <el-drawer class="right-drawer" v-model="drawer" title="浏览记录" :direction="direction">
    <el-button @click="handleClearHistory" class="history-clear-btn">清空历史记录</el-button>
    <div
      @click="handleHistory(item)"
      v-for="item in historyList"
      :key="item.author"
      class="history-item"
    >
      <span :style="{'font-weight': 'bold'}" >{{ item.title }}</span> <span class="history-item-author">{{ item.author }}</span>
    </div>
  </el-drawer>
</template>
<script setup>
import ReadMore from './components/ReadMore.vue'
import { onMounted, onBeforeUnmount, reactive, ref } from 'vue'
import axios from 'axios'

const blog = reactive({
  title: '',
  content: '加载中...',
  author: ''
})
const historyList = ref([])
const direction = ref('rtl')
const drawer = ref(false)
onMounted(() => {
  loadAticle()
  
})
//每次退出的时候，保存当前页面的数据

function readLocalStoreage() {
  const data = localStorage.getItem('article')
  let articleList = []
  try {
    articleList = JSON.parse(data) || []
  } catch (error) {
    console.log('解析异常')
  }
  return articleList
}
function openDrawer() {
  drawer.value = true
  const currentList = readLocalStoreage()
  historyList.value = currentList
}
function handleHistory(tempBlog) {
  blog.author = tempBlog.author
  blog.title = tempBlog.title
  blog.content = tempBlog.content
  drawer.value = false
}
function saveLocalStoreage() {
  const list = readLocalStoreage()
  list.unshift(blog)
  localStorage.setItem('article', JSON.stringify(list))
}
function loadAticle() {
  axios.get('/api/article').then((res) => {
    const tempBlog = res.data || {}
    blog.author = tempBlog.author
    blog.title = tempBlog.title
    blog.content = tempBlog.content
    saveLocalStoreage()
  })
}
function onChildChange() {
  blog.title = ''
  loadAticle()
}
function handleClearHistory(){
  historyList.value = []
  localStorage.removeItem('article')
}
</script>

<style scoped>
.content {
  height: 100vh;
  position: relative;
}

.content .headerContent {
  height: 280px;
  width: 100%;
  background-color: #faf7f5;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 100px;
  min-width: 400px;
}
.title {
  margin-bottom: 30px;
  font-family: 'phface';
  font-size: 40px;
}
.left {
  font-family: 'phface';
  font-size: 20px;
}
.right {
  padding-top: 80px;
}
.readnext {
  background-color: #dae8e2;
  color: #4c9878;
  border-radius: 20px;
  padding: 4px 14px;
  font-size: 14px;
}
.content-html {
  padding: 40px 80px;
  opacity: 0.6;
  font-size: 20px;
  line-height: 50px;
  text-align: left;
  text-indent: 40px;
  width: 100%;
}
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 40px;
}
.tip {
  padding: 0px 0px 4px 4px;
  font-size: 12px;
  color: #999999;
}
.skele-wrapper {
  margin: 20px;
}
.history {
  position: absolute;
  right: 20px;
  top: 20px;
  background-color: #4c9878;
  border-radius: 20px;
  font-size: 12px;
  padding: 10px 20px;
  color: white;
}
.history:hover {
  cursor: pointer;
}
.history-item {
  padding: 0px 10px 10px 10px;
}
.history-item:hover{
  color: #4c9878;
}
.history-item:hover {
  cursor: pointer;
}
.history-item-author {
  font-size: 12px;
  margin-left: 8px;
}
.history-clear-btn {
  margin-left: 100px;
  margin-bottom: 10px;
}
:deep(.right-drawer .el-drawer__header){
  margin-bottom: 0px;
}

</style>
