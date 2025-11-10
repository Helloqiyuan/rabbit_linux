<script setup>
import { ref } from 'vue';
import { useSubCategory } from './composables/useSubCategory';
import { useGoods } from './composables/useGoods'
import GoodsItem from '../Home/components/GoodsItem.vue';
import { getGoodsApi } from '@/apis/subCategory';
// id:二级分类的id
const props = defineProps({
  id: String,
})
const reqParams = ref({
  categoryId: props.id,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime',
});
const { subCategoryData } = useSubCategory(props)
const { GoodsData, getGoodsData } = useGoods(reqParams)
const tabChange = () => {
  reqParams.value.page = 1
  getGoodsData(reqParams.value)
}
const stopLoading = ref(false)

const loadNew = async () => {
  console.log("加载更多。。。");
  reqParams.value.page += 1
  const res = await getGoodsApi(reqParams.value);
  if (res.result.items.length === 0) {
    stopLoading.value = true
  }
  GoodsData.value = [...GoodsData.value, ...res.result.items];
}

</script>

<template>
  <div class="container ">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${subCategoryData.parentId}` }">
          {{ subCategoryData.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ subCategoryData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="reqParams.sortField" @tab-change="tabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body" v-infinite-scroll="loadNew" :infinite-scroll-disabled="stopLoading">
        <!-- 商品列表-->
        <GoodsItem v-for="good in GoodsData" :key="good.id" :good="good" />
      </div>
    </div>
  </div>

</template>



<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }


}
</style>
