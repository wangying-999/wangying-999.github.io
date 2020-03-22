<template>
  <div class="error-page">
      <div class="error-code">4<span>0</span>4</div>
      <div class="error-desc">啊哦~ 你所访问的页面不存在</div>
  </div>
</template>

<script>
export default {
    name:"error",
    
}
</script>


<style scoped>
    .error-page{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        height: 100%;
        background: #f3f3f3;
        box-sizing: border-box;
    }
    .error-code{
        line-height: 1;
        font-size: 250px;
        font-weight: bolder;
        color: #2d8cf0;
        /* margin-top: 50px; */
        /* margin-bottom: 50px; */
    }
    .error-code span{
        color: #00a854;
    }
    .error-desc{
        font-size: 30px;
        color: #777;
        margin-bottom: 80px;
    }
    
</style>
