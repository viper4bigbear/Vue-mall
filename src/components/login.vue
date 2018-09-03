<template>
  <div v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/login.html">会员登录</a>
      </div>
    </div>
    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <div class="nav-tit">
            <a class="selected" href="javascript:;">账户登录</a>
            <i>|</i>
            <a href="/register.html">免费注册</a>
          </div>

          <div id="loginform" name="loginform" class="login-box">
            <el-input v-model.trim="name" placeholder="请输入账号"></el-input>
            <br>
            <br>
            <el-input v-model="password" type="password" placeholder="请输入密码"></el-input>
            <br>
            <br>
            <div class="btn-box">
              <input id="btnSubmit" @click="loginIn" name="btnSubmit" type="submit" value="立即登录">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data: function() {
    return {
      name: "admin",
      password: "123",
      loading: false
    };
  },
  methods: {
    loginIn() {
      this.loading = true;
      this.$axios
        .post("site/account/login", {
          user_name: this.name,
          password: this.password
        })
        .then(res => {
          this.loading = false;
          if (res.data.status == 0) {
            this.$store.commit("changeLogin", true);
            this.$Notice.success({title:'登录成功'})
            this.$router.push(this.$store.state.fromData);
          } else {
            this.$Message.error("哎呀,账号或密码输错啦!");
          }
        });
    }
  }
};
</script>

