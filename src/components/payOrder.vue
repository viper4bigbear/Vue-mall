<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="javascript:;">支付中心</a>
      </div>
    </div>
    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <div class="nav-tit pay">
            <a href="javascript:;" class="selected">支付中心</a>
          </div>
          <div class="form-box payment">
            <div class="el-row">
              <div class="el-col el-col-18">
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>订 单 号：</dt>
                      <dd>{{orderData.order_no}}</dd>
                    </dl>
                  </div>
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>收货人姓名：</dt>
                      <dd>{{orderData.accept_name}}</dd>
                    </dl>
                  </div>
                </div>
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>送货地址：</dt>
                      <dd>{{orderData.area+orderData.address}}
                      </dd>
                    </dl>
                  </div>
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>手机号码：</dt>
                      <dd>{{orderData.mobile}}</dd>
                    </dl>
                  </div>
                </div>
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>支付金额：</dt>
                      <dd>{{orderData.order_amount}}元</dd>
                    </dl>
                  </div>
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>支付方式：</dt>
                      <dd>在线支付</dd>
                    </dl>
                  </div>
                </div>
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</dt>
                      <dd>{{orderData.message}}</dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div class="el-col el-col-6">
                <div id="container2">
                  <qrcode :value="'http://111.230.232.110:8899/site/validate/pay/alipay/'+$route.params.orderid" :options="{ size: 200 }"></qrcode>
                </div>
                <button @click="goPay">点我去支付</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueQrcode from "@xkeshi/vue-qrcode";
export default {
  name: "payOrder",
  data: function() {
    return {
      orderData: {},
      innerId:0
    };
  },
  methods:{
    goPay() {
      window.open('http://111.230.232.110:8899/site/validate/pay/alipay/'+this.$route.params.orderid)
    }
  },
  components: {
    [VueQrcode.name]: VueQrcode
  },
  created() {
    let orderid = this.$route.params.orderid;
    this.$axios.get(`site/validate/order/getorder/${orderid}`).then(res => {
      this.orderData = res.data.message[0];
    });
    this.innerId = setInterval(()=>{
      this.$axios.get(`site/validate/order/getorder/${orderid}`).then(res => {
      if (res.data.message[0].status == 2) {
        this.$Message.success('支付成功,请耐心等待被查水表')
        clearInterval(this.innerId)
        setTimeout(()=>{
          this.$router.push(`/paySuccess/${this.$route.params.orderid}`)
        },1000)
      }
    });
    },2000)
  },
  destroyed() {
    clearInterval(this.innerId)
  },
};
</script>
<style>
</style>


