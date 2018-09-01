<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/cart.html">购物车</a>
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
                <li class="active">
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
          <!--购物车订单-->
          <div class="cart-box">
            <el-form status-icon :model="orderForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <h2 class="slide-tit">
                <span>1、收货地址</span>
              </h2>
              <br>
              <div id="orderForm" name="orderForm" align="center">
                <div class="form-box address-info">
                  <el-form-item label="收货人姓名" prop="accept_name">
                    <el-input style="width:400px;" v-model="orderForm.accept_name"></el-input>
                  </el-form-item>
                  <el-form-item label="所属地区">
                    <v-distpicker @selected="selected" :province="orderForm.area.province.value" :city="orderForm.area.city.value" :area="orderForm.area.area.value"></v-distpicker>
                  </el-form-item>
                  <el-form-item label="详细地址" prop="address">
                    <el-input style="width:400px;" v-model="orderForm.address"></el-input>
                  </el-form-item>
                  <el-form-item label="手机号码" prop="mobile">
                    <el-input style="width:400px;" v-model="orderForm.mobile"></el-input>
                  </el-form-item>
                  <el-form-item label="联系电话" prop="phone">
                    <el-input style="width:400px;" v-model="orderForm.phone"></el-input>
                  </el-form-item>
                  <el-form-item label="电子邮箱" prop="email">
                    <el-input style="width:400px;" v-model="orderForm.email"></el-input>
                  </el-form-item>
                  <el-form-item label="邮政编码" prop="post_code">
                    <el-input style="width:400px;" v-model="orderForm.post_code"></el-input>
                  </el-form-item>
                </div>
                <h2 class="slide-tit">
                  <span>2、支付方式</span>
                </h2>
                <ul class="item-box clearfix">
                  <!--取得一个DataTable-->
                  <li>
                    <label>
                      <el-radio v-model="orderForm.payment_id" :label="6">在线支付
                        <em>手续费：0.00元</em>
                      </el-radio>
                    </label>
                  </li>
                </ul>
                <h2 class="slide-tit">
                  <span>3、配送方式</span>
                </h2>
                <ul class="item-box clearfix">
                  <!--取得一个DataTable-->
                  <li>
                    <label>
                      <el-radio-group v-model="orderForm.express_id">
                        <el-radio @change="changeExpress(20)" :label="1">顺丰快递
                          <em>费用：20.00元</em>
                        </el-radio>
                        <el-radio @change="changeExpress(10)" :label="2">圆通快递
                          <em>费用：10.00元</em>
                        </el-radio>
                        <el-radio @change="changeExpress(8)" :label="3">韵达快递
                          <em>费用：8.00元</em>
                        </el-radio>
                      </el-radio-group>
                    </label>
                  </li>
                </ul>
                <h2 class="slide-tit">
                  <span>4、商品清单</span>
                </h2>
                <div class="line15"></div>
                <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                  <tbody>
                    <tr>
                      <th colspan="2" align="left">商品信息</th>
                      <th width="84" align="left">单价</th>
                      <th width="84" align="center">购买数量</th>
                      <th width="104" align="left">金额(元)</th>
                    </tr>
                    <tr v-for="item in cartMessage" :key="item.id">
                      <td width="68">
                        <router-link :to="'/detail/'+item.id">
                        <img :src="item.img_url" class="img"></router-link>
                      </td>
                      <td>
                        <router-link :to="'/detail/'+item.id">
                        {{item.title}}</router-link>
                      </td>
                      <td>
                        <span class="red">
                          ￥{{item.sell_price}}
                        </span>
                      </td>
                      <td align="center">{{item.buycount}}</td>
                      <td>
                        <span class="red">
                          ￥{{item.totalAmount}}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="line15"></div>
                <h2 class="slide-tit">
                  <span>5、结算信息</span>
                </h2>
                <div class="buy-foot clearfix">
                  <div class="left-box">
                    <dl>
                      <el-form-item label="订单备注(100字符以内)" prop="message">
                        <el-input style="width:500px;" type="textarea" resize="none" :rows="4" v-model="orderForm.message">
                        </el-input>
                      </el-form-item>
                    </dl>
                  </div>
                  <div class="right-box">
                    <p>
                      商品
                      <label class="price">{{totalCount}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                      <label id="goodsAmount" class="price">{{orderForm.goodsAmount}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                    </p>
                    <p>
                      运费：￥
                      <label id="expressFee" class="price">{{orderForm.expressMoment}}</label> 元
                    </p>
                    <p class="txt-box">
                      应付总金额：￥
                      <label id="totalAmount" class="price">{{orderForm.goodsAmount+orderForm.expressMoment}}</label>
                    </p>
                    <p class="btn-box">
                      <router-link to="/cart"><button class="btn button">返回购物</button></router-link>
                      <a id="btnSubmit" class="btn submit" @click="sureOrder">确认提交</a>
                    </p>
                  </div>
                </div>
              </div>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VDistpicker from "v-distpicker";

export default {
  name: "fillOrder",
  components: { VDistpicker },
  methods: {
    selected(value) {
      this.orderForm.area = value;
    },
    changeExpress(price) {
      this.orderForm.expressMoment = price
    },
    sureOrder() {
      this.$axios.post('site/validate/order/setorder',this.orderForm)
      .then(res=>{
        let orderid = res.data.message.orderid
        this.$router.push('/payOrder/'+orderid)
        this.cartMessage.forEach(v=>{
          this.$store.commit('deleteCart',v.id)
        })
      })
    }
  },
  data: function() {
    let checkMobile = (rule, value, callback) => {
      setTimeout(() => {
        let checkRule = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        if (checkRule.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确格式的手机号码"));
        }
      }, 1000);
    };
    let checkPhone = (rule, value, callback) => {
      setTimeout(() => {
        let checkRule = /^\d+$/;
        if (value.trim().length != 0) {
          if (checkRule.test(value)) {
            callback();
          } else {
            callback(new Error("请输入正确的联系电话"));
          }
        } else {
          callback();
        }
      }, 1000);
    };
    let checkEmail = (rule, value, callback) => {
      setTimeout(() => {
        let checkRule = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (value.trim().length != 0) {
          if (checkRule.test(value)) {
            callback();
          } else {
            callback(new Error("请输入正确的邮箱"));
          }
        } else {
          callback();
        }
      }, 1000);
    };
    let checkPost = (rule, value, callback) => {
      setTimeout(() => {
        let checkRule = /^[1-9]\d{5}(?!\d)$/;
        if (value.trim().length != 0) {
          if (checkRule.test(value)) {
            callback();
          } else {
            callback(new Error("请输入正确的邮编"));
          }
        } else {
          callback();
        }
      }, 1000);
    };
    return {
      orderForm: {
        goodsAmount: 0,
        expressMoment: 20,
        accept_name: "刘先生",
        area: {
          province: { code: "440000", value: "广东省" },
          city: { code: "440300", value: "深圳市" },
          area: { code: "440306", value: "宝安区" }
        },
        address: "中粮商务公园18楼天台",
        mobile: "18888881234",
        email: "liuSir@qq.com",
        post_code: "518300",
        phone: "1008611",
        payment_id: 6,
        express_id: 1,
        message: "快点发货,不要用三通一达,记得信息要保密哦",
        goodsids: "",
        cargoodsobj: {}
      },
      cartMessage: [],
      rules: {
        accept_name: [
          { required: true, message: "请输入收货人名称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "change"
          }
        ],
        address: [
          { required: true, message: "请输入详细地址", trigger: "blur" },
          {
            min: 2,
            message: "长度在 2个字符以上",
            trigger: "change"
          }
        ],
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" }
        ],
        phone: [{ validator: checkPhone, trigger: "blur" }],
        email: [{ validator: checkEmail, trigger: "blur" }],
        post_code: [{ validator: checkPost, trigger: "blur" }]
      }
    };
  },
  created() {
    this.orderForm.goodsids = this.$route.params.ids;
    this.$axios
      .get(`site/comment/getshopcargoods/${this.orderForm.goodsids}`)
      .then(res => {
        let total = 0;
        let cargoodsobj = {};
        res.data.message.forEach(v => {
          v.buycount = this.$store.state.cartData[v.id];
          v.totalAmount = v.sell_price * v.buycount;
          total += v.totalAmount;
          cargoodsobj[v.id] = v.buycount;
        });
        this.cartMessage = res.data.message;
        this.orderForm.goodsAmount = total;
        this.orderForm.cargoodsobj = cargoodsobj;
      });
  },
  computed: {
    totalCount() {
      let totalCount = 0
      this.cartMessage.forEach(v=>{
        totalCount += v.buycount
      })
      return totalCount
    }
  }
};
</script>

<style>
</style>

