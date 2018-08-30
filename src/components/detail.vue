<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/goods.html">购物商城</a> &gt;
        <a href="/goods/42/1.html">商品详情</a>
      </div>
    </div>
    <div class="section">
      <div class="wrapper clearfix">
        <div class="wrap-box">
          <div class="left-925">
            <div class="goods-box clearfix">
              <div class="pic-box">
                <ProductZoomer v-if="images.normal_size.length>0" :base-images="images" :base-zoomer-options="zoomerOptions" />
              </div>
              <div class="goods-spec">
                <h1>{{goodsinfo.title}}</h1>
                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                <div class="spec-box">
                  <dl>
                    <dt>货号</dt>
                    <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                  </dl>
                  <dl>
                    <dt>市场价</dt>
                    <dd>
                      <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                    </dd>
                  </dl>
                  <dl>
                    <dt>销售价</dt>
                    <dd>
                      <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                    </dd>
                  </dl>
                </div>
                <div class="spec-box">
                  <dl>
                    <dt>购买数量</dt>
                    <dd>
                      <div class="stock-box">
                        <el-input-number v-model="buyCount" @change="buyCountChange" :min="0" :max="goodsinfo.stock_quantity" size="mini" label="描述文字"></el-input-number>
                      </div>
                      <span class="stock-txt">
                        库存
                        <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                      </span>
                    </dd>
                  </dl>
                  <dl>
                    <dd>
                      <div id="buyButton" class="btn-buy">
                        <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                        <button @click="cartAdd" class="add">加入购物车</button>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div id="goodsTabs" class="goods-tab bg-wrap">
              <Affix>
                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                  <ul>
                    <li>
                      <a href="javascript:;" @click="showDiscuss=false" :class="{selected:!showDiscuss}">商品介绍</a>
                    </li>
                    <li>
                      <a href="javascript:;" @click="showDiscuss=true" :class="{selected:showDiscuss}">商品评论</a>
                    </li>
                  </ul>
                </div>
              </Affix>

              <div class="tab-content entry" v-html="goodsinfo.content" v-show="!showDiscuss" style="display: block;">
              </div>
              <div class="tab-content" v-show="showDiscuss" style="display: block;">
                <div class="comment-box">
                  <div id="commentForm" name="commentForm" class="form-box">
                    <div class="avatar-box">
                      <i class="iconfont icon-user-full"></i>
                    </div>
                    <div class="conn-box">
                      <div class="editor">
                        <textarea v-model.trim="commentContent" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                        <span class="Validform_checktip"></span>
                      </div>
                      <div class="subcon">
                        <input id="btnSubmit" @click="submitComment" name="submit" type="submit" value="提交评论" class="submit">
                        <span class="Validform_checktip"></span>
                      </div>
                    </div>
                  </div>
                  <ul id="commentList" class="list-box">
                    <p v-show="comments.length==0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                    <li class="clearfix" v-for="item in comments" :key="item.id">
                      <div class="avatar-box">
                        <i class="iconfont icon-user-full"></i>
                      </div>
                      <div class="inner-box">
                        <div class="info">
                          <span>{{item.user_name}}</span>
                          <span>{{item.reply_time | filterDate}}</span>
                        </div>
                        <p>{{item.content}}</p>
                      </div>
                    </li>
                  </ul>
                  <div class="page-box" style="margin: 5px 0px 0px 62px;">
                    <Page :current='commentspage' :total="commentcount" @on-change="pageChange" @on-page-size-change="sizeChange" show-sizer show-elevator :page-size-opts='[5,6,10,12]' />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="left-220">
            <div class="bg-wrap nobg">
              <div class="sidebar-box">
                <h4>推荐商品</h4>
                <ul class="side-img-list">
                  <li v-for="item in hotgoodslist" :key="item.id">
                    <div class="img-box">
                      <router-link :to="'/detail/'+item.id"> <img :src="item.img_url"></router-link>
                    </div>
                    <div class="txt-box">
                      <router-link :to="'/detail/'+item.id">
                        {{item.title}}
                      </router-link>
                      <span>{{item.add_time | filterDate}}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 加入购物车动画图片 -->
    <img v-if="images.normal_size.length>0" style="display:none;" :src="images.normal_size[0].url" alt="" id="moveImg">
    <!-- 返回顶部 -->
    <BackTop :height="100" :bottom="100">
      <div class="top">返回顶端</div>
    </BackTop>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "detail",
  data: function() {
    return {
      showDiscuss: undefined,
      goodsid: undefined,
      hotgoodslist: undefined,
      goodsinfo: {},
      imglist: undefined,
      buyCount: 1,
      images: {
        // required
        normal_size: []
      },
      zoomerOptions: {
        zoomFactor: 3,
        pane: "container-round",
        hoverDelay: 150,
        namespace: "container-zoomer",
        move_by_click: true,
        scroll_items: 4,
        choosed_thumb_border_color: "#ff3d00"
      },
      commentspage: 1,
      commentssize: 10,
      commentcount: 0,
      comments: [],
      commentContent: ""
    };
  },
  created() {
    this.getGoodsinfo();
    this.getComments();
  },
  watch: {
    $route() {
      this.images.normal_size = [];
      this.getGoodsinfo();
      this.commentspage = 1;
      this.getComments();
      this.buyCount = 1;
    }
  },
  methods: {
    cartAdd() {
      if (this.buyCount == 0) {
        this.$Message.error("哥们,买点东西呗,不买怎么加入购物车");
        return;
      }
      let cartPosition = $(".add").offset();
      let targetPosition = $(".icon-cart").offset();
      $("#moveImg")
        .stop()
        .show()
        .addClass("rotate")
        .css(cartPosition)
        .animate(targetPosition, 1000, function() {
          $(this)
            .hide()
            .removeClass("rotate");
        });
      this.$store.commit("addCart", {
        goodsId: this.goodsid,
        goodsCount: this.buyCount
      });
    },
    submitComment() {
      if (this.commentContent == "") {
        this.$Message.error("哥们,写点东西呗");
        return;
      }
      this.$axios
        .post(`site/validate/comment/post/goods/${this.goodsid}`, {
          commenttxt: this.commentContent
        })
        .then(res => {
          // console.log(res)
          this.$Message.success(res.data.message);
          this.getComments();
          this.commentContent = "";
        });
    },
    pageChange(page) {
      this.commentspage = page;
      this.getComments();
    },
    sizeChange(size) {
      this.commentssize = size;
      if (this.commentspage == 1) {
        this.getComments();
      }
    },
    buyCountChange(value) {
      // eslint-disable-next-line
      console.log(value);
    },
    getGoodsinfo() {
      this.goodsid = this.$route.params.goodsid;
      this.$axios.get(`site/goods/getgoodsinfo/${this.goodsid}`).then(res => {
        this.hotgoodslist = res.data.message.hotgoodslist;
        this.goodsinfo = res.data.message.goodsinfo;
        this.imglist = res.data.message.imglist;

        let temArr = [];
        this.imglist.forEach(v => {
          temArr.push({
            id: v.id,
            url: v.original_path
          });
        });

        this.images.normal_size = temArr;
      });
    },
    getComments() {
      this.$axios
        .get(
          `site/comment/getbypage/goods/${this.goodsid}?pageIndex=${
            this.commentspage
          }&pageSize=${this.commentssize}`
        )
        .then(res => {
          this.comments = res.data.message;
          this.commentcount = res.data.totalcount;
        });
    }
  }
};
</script>

<style lang="less">
.top {
  padding: 10px;
  background: rgba(0, 153, 229, 0.7);
  color: #fff;
  text-align: center;
  border-radius: 2px;
}
.tab-content.entry img {
  width: 100%;
  display: block;
}
.pic-box {
  width: 390px;
  .thumb-list {
    img {
      width: 80px;
      height: 80px;
    }
  }
  .control {
    display: flex;
    justify-content: center;
  }
}
#moveImg {
  position: absolute;
  width: 50px;
  // left: 0;
  // top: 0;
  // display: none;
}
#moveImg.rotate {
  transition: transform 1s, opacity 0.5s;
  opacity: 0.5;
  transform: rotate(7200deg) scale(0.2);
}
</style>
