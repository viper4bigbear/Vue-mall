<template>
  <div class="el-row">
    <div class="el-col el-col-24">
      <div class="comp">
        <div class="tmpl routeanimate">
          <div class="section">
            <div class="location">
              <span>当前位置：</span>
              <a href="/index.html">首页</a> &gt;
              <router-link to="/vipCenter">会员中心</router-link>&gt;
              <a href="#/site/member/orderlist" class="router-link-exact-active ">我的订单</a>
            </div>
          </div>
          <div class="section clearfix">
            <div class="left-260">
              <div class="bg-wrap">
                <div class="avatar-box">
                  <a href="/user/center/avatar.html" class="img-box">
                    <img src="../assets/statics/886859.jpg" alt="">
                    <!-- <i class="iconfont icon-user-full"></i> -->
                  </a>
                  <h3>

                    哈士奇

                  </h3>
                  <p>
                    <b>注册会员</b>
                  </p>
                </div>
                <div class="center-nav">
                  <ul>
                    <li>
                      <h2>
                        <i class="iconfont icon-order"></i>
                        <span>订单管理</span>
                      </h2>
                      <div class="list">
                        <p>
                         <router-link to="/orderList"><i class="iconfont icon-arrow-right"></i>交易订单</router-link>
                        </p>
                      </div>
                    </li>
                    <li>
                      <h2>
                        <i class="iconfont icon-user"></i>
                        <span>账户管理</span>
                      </h2>
                      <div class="list">
                        <p>
                          <a href="#/site/member/center" class="">
                            <i class="iconfont icon-arrow-right"></i>账户资料</a>
                        </p>
                        <p>
                          <a href="#/site/member/center" class="">
                            <i clrouter-linkss="iconfont icon-router-linkrrow-right"></i>头像设置</a>
                        </p>
                        <p>
                          <a href="#/site/member/center" class="">
                            <i class="iconfont icon-arrow-right"></i>修改密码</a>
                        </p>
                        <p>
                          <a href="javascript:void(0)">
                            <i class="iconfont icon-arrow-right"></i>退出登录</a>
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="right-auto">
              <div class="bg-wrap" style="min-height: 765px;">
                <div class="sub-tit">
                  <ul>
                    <li class="selected">
                      <a href="/user/order-list.html">交易订单</a>
                    </li>
                  </ul>
                  <el-pagination @size-change="sizeChange" @current-change="indexChange" :current-page="pageIndex" :page-sizes="[5, 10, 15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalcount">
                  </el-pagination>
                </div>
                <div class="table-wrap">
                  <table width="100%" border="0" cellspacing="0" cellpadding="0" class="ftable">
                    <tbody>
                      <tr>
                        <th width="16%" align="left">订单号</th>
                        <th width="10%">姓名</th>
                        <th width="12%">订单金额</th>
                        <th width="11%">下单时间</th>
                        <th width="10%">状态</th>
                        <th width="12%">操作</th>
                      </tr>
                      <tr v-for="item in message" :key="item.id">
                        <td>{{item.order_no}}</td>
                        <td align="left">{{item.accept_name==''?"匿名用户":item.accept_name}}</td>
                        <td align="left">
                          <strong style="color: red;">￥{{item.order_amount}}</strong>
                          <br> {{item.pamentTitle}}
                        </td>
                        <td align="left">{{item.add_time | filterDate('YYYY.MM.DD HH:mm:ss')}}</td>
                        <td align="left">
                          {{item.statusName}}
                        </td>
                        <td align="left">
                          <router-link :to="'/orderDetail/'+item.id">查看订单</router-link>
                          <br>
                          <router-link v-if="item.status==1" :to="'/payOrder/'+item.id">去付款</router-link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "orderList",
  data: function() {
    return {
      pageIndex: 1,
      pageSize: 10,
      message: [],
      totalcount: 0
    };
  },
  methods: {
    getOrderList() {
      this.$axios
        .get(
          `site/validate/order/userorderlist?pageIndex=${
            this.pageIndex
          }&pageSize=${this.pageSize}`
        )
        .then(res => {
          this.totalcount = res.data.totalcount;
          this.message = res.data.message;
        });
    },
    indexChange(index) {
      this.pageIndex = index;
      this.getOrderList();
    },
    sizeChange(size) {
      this.pageIndex= 1,
      this.pageSize = size;
      this.getOrderList();
    }
  },
  created() {
    this.getOrderList();
  }
};
</script>
<style>
</style>
