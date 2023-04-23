
<script setup>
 import ReadMore from './components/ReadMore.vue'
 import {onMounted,reactive} from 'vue'
 import axios from 'axios'

 const blog = reactive({
  title:"",
  content:"加载中...",
  author:""
 })
 onMounted(() =>{
  axios.get('/api/article').then(res =>{
    console.log("请求数据",res);
    const tempBlog = res.data || {}
    blog.author = tempBlog.author
    blog.title = tempBlog.title
    blog.content = tempBlog.content
    

  })
})
</script>

<template>
  <div class="content">
     <header>
        <div class="headerContent">
           <div class="left">
              <h1 class="title">{{ blog.title }}</h1>
              <p>by: {{  blog.author }}</p>
           </div>
           <div class="right">
              <ReadMore />
           </div>
        </div>
     </header>
     <section>
       <div class="content-html" v-html="blog.content">
         
       </div>
     </section>
     <div class="footer">
      <ReadMore msg="下一篇" />
     </div>
    
  </div>
</template>

<style scoped>
  .content{
   
    height: 100vh;
  }
  .content .headerContent{
    height: 280px;
    width: 100%;
    background-color:#faf7f5 ;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 100px;
    min-width: 400px;
  }  
  .title {
    margin-bottom: 30px;
  }
  .right{
    padding-top: 80px;
  }
  .readnext{
    background-color: #dae8e2;
    color: #4c9878;
    border-radius: 20px;
    padding: 4px 14px;
    font-size: 14px;
  }
  .content-html{
    padding: 40px 80px;
    opacity: .6;
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
</style>
