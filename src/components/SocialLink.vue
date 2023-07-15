<template>
  <div class="footer-right px-5 px-sm-0 px-0 d-flex flex-column justify-content-center align-items-center text-center">
    <ul class="social-links m-3">
      <li><a href="#" class="social-link" :class="{ 'active-hover': showName && networkName === 'Instagram' }" @mouseover="showNetworkName('Instagram')" @mouseleave="hideNetworkName()"><i class='bx bxl-instagram-alt'></i></a></li>
      <li><a href="#" class="social-link" :class="{ 'active-hover': showName && networkName === 'Facebook' }" @mouseover="showNetworkName('Facebook')" @mouseleave="hideNetworkName()"><i class='bx bxl-facebook-square'></i></a></li>
      <li><a href="#" class="social-link" :class="{ 'active-hover': showName && networkName === 'Twitter' }" @mouseover="showNetworkName('Twitter')" @mouseleave="hideNetworkName()"><i class='bx bxl-twitter'></i></a></li>
    </ul>
    <span class="network-name" :class="{ 'show-network-name': showName }">{{ networkName }}</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showName: false,
      networkName: '',
    };
  },
  methods: {
    showNetworkName(name) {
      this.networkName = name;
      this.showName = true;
    },
    hideNetworkName() {
      this.showName = false;
    },
  },
};
</script>
<style scoped>
.bx.bxl-instagram-alt,
.bx.bxl-facebook-square,
.bx.bxl-twitter {
  font-size: 30px;
}

.social-links {
  list-style: none;
  display: flex;
  gap: 10px;
  padding: 0;
}

.social-links li a {
  color: white;
  font-size: 20px;
}

.social-links li:nth-child(1) a:hover i {
  background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  box-shadow: 0px 3px 10px rgba(0,0,0,.25);
}

.social-links li:nth-child(2) a:hover i {
  color: #1B74E4;
}

.social-links li:nth-child(3) a:hover i {
  color: #00ACEE;
}

.network-name {
  font-size: 14px;
  font-weight: bold;
  color: white;
  margin-top: 5px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.show-network-name {
  opacity: 1;
}

@media screen and (max-width: 991px) {
  .social-links li:nth-child(1) a i {
    background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, .25);
  }

  .social-links li:nth-child(2) a i {
    color: #0d46be;
  }

  .social-links li:nth-child(3) a i {
    color: #00ACEE;
  }
}


</style>