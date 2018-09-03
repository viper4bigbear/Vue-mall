<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <router-link to="/index">首页</router-link> &gt;
        <router-link to="/cart">购物车</router-link>
      </div>
    </div>
    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <!--购物车头部-->
          <div class="cart-head clearfix">
            <h2>
              <i class="iconfont icon-cart"></i>我的购物车</h2>
            <div class="cart-setp">
              <ul>
                <li class="first active">
                  <div class="progress">
                    <span>1</span>
                    放进购物车
                  </div>
                </li>
                <li>
                  <div class="progress">
                    <span>2</span>
                    填写订单信息
                  </div>
                </li>
                <li class="last">
                  <div class="progress">
                    <span>3</span>
                    支付/确认订单
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!--购物车头部-->
          <!--商品列表-->
          <div class="cart-box">
            <input id="jsondata" name="jsondata" type="hidden">
            <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
              <tbody>
                <tr>
                  <th width="48" align="center">
                    <a>选择</a>
                  </th>
                  <th align="left" colspan="2">商品信息</th>
                  <th width="84" align="left">单价</th>
                  <th width="104" align="center">数量</th>
                  <th width="104" align="center">金额(元)</th>
                  <th width="54" align="center">操作</th>
                </tr>
                <tr v-show="cartInfo.length==0">
                  <td colspan="10">
                    <div class="msg-tips">
                      <div class="icon warning">
                        <i class="iconfont icon-tip"></i>
                      </div>
                      <div class="info">
                        <strong>购物车没有商品！</strong>
                        <p>您的购物车为空，
                          <router-link to="/index">马上去购物</router-link>吧！</p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-for="item in cartInfo" :key="item.id">
                  <td>
                    <el-switch v-model="item.selected" active-color="#13ce66" inactive-color="#ff4949">
                    </el-switch>
                  </td>
                  <td><img width="60px" :src="item.img_url" alt=""></td>
                  <td><router-link :to="'/detail/'+item.id">{{item.title}}</router-link></td>
                  <td>{{item.sell_price}}</td>
                  <td>
                    <el-input-number :max="item.max" :precision="0" :min="0" @change="changCart($event,item.id)" size="mini" v-model="item.buycount"></el-input-number>
                  </td>
                  <td align="center">{{item.sell_price*item.buycount}}</td>
                  <td>
                    <el-button @click="delOne(item.id)" type="danger" icon="el-icon-delete" circle></el-button>
                  </td>
                </tr>
                <tr>
                  <th align="right" colspan="8">
                    已选择商品
                    <b class="red" id="totalQuantity">{{cartCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                    <span class="red">￥</span>
                    <b class="red" id="totalAmount">{{cartPriceCount}}</b>元
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
          <!--/商品列表-->
          <!--购物车底部-->
          <div class="cart-foot clearfix">
            <div class="right-box">
              <router-link to="/index">
                <button class="button">继续购物</button>
              </router-link>
              <button class="submit" @click="checkAndSubmit">立即结算</button>
            </div>
          </div>
          <!--购物车底部-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "shopingCart",
  data: function() {
    return {
      cartInfo: []
    };
  },
  methods: {
    changCart(num, id) {
      this.cartInfo.forEach(v=>{
        if(v.id==id) {
          if(num>v.max) {
            num = v.max
          }
        }
      })
      this.$store.commit("changeCart", {
        id: id,
        goodsCount: num
      });
    },
    delOne(id) {
      this.$store.commit("deleteCart", id);
      this.cartInfo.forEach((v, i) => {
        if (v.id == id) {
          this.cartInfo.splice(i, 1);
        }
      });
    },
    checkAndSubmit() {
      if (this.cartCount == 0) {
        this.$Message.error("哥们,选点东西呗,不选我怎么结算啊");
        return;
      }
      let ids = "";
      this.cartInfo.forEach(v => {
        if (v.selected == true) {
          ids += v.id;
          ids += ",";
        }
      });
      ids = ids.slice(0, -1);
      this.$router.push("/order/" + ids);
      // this.$axios.get('site/account/islogin')
      // .then(res=>{
      //   if(res.data.code=='nologin') {
      //     this.$alert('哥们,你要先登录才能下单哦', '提示', {
      //     confirmButtonText: '确定',
      //     callback: () => {
      //       this.$router.push('/login')
      //     }
      //   });
      //   } else {
      //     this.$router.push('/order')
      //   }
      // })
    }
  },
  created() {
    this.$Loading.config({
      color: "#5cb85c",
      failedColor: "#f0ad4e",
      height: 5
    });
    this.$Loading.start();
    let cartData = this.$store.state.cartData;
    let ids = "";
    for (const key in cartData) {
      ids += key;
      ids += ",";
    }
    ids = ids.slice(0, -1);
    this.$axios
      .get("site/comment/getshopcargoods/" + ids)
      .then(res => {
        this.$Loading.finish();
        res.data.message.forEach(v => {
          v.buycount = cartData[v.id];
          v.selected = true;
          this.$axios.get(`site/goods/getgoodsinfo/${v.id}`).then(response=>{
            v.max = response.data.message.goodsinfo.stock_quantity
          })
        });
        this.cartInfo = res.data.message;
      })
      .catch(() => {
        this.$Loading.error();
      });
  },
  computed: {
    cartCount() {
      let num = 0;
      this.cartInfo.forEach(v => {
        if (v.selected == true) {
          num += v.buycount;
        }
      });
      return num;
    },
    cartPriceCount() {
      let price = 0;
      this.cartInfo.forEach(v => {
        if (v.selected == true) {
          price += v.buycount * v.sell_price;
        }
      });
      return price;
    }
  }
};
</script>

  
<style lang="less">
</style>
