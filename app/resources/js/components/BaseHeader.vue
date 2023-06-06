<template>
  <header class="header header--bg">
    <div class="header__shape">
      <div class="header__shape-inner"></div>
    </div>
    <div class="container">
      <div class="navbar">
        <div class="navbar__row">
          <div class="header__logo">
            <router-link :to="{ name: 'home' }" class="header__logo-img"></router-link>
          </div>
          <div class="navbar__items" :class="{ 'navbar__items--is-active': showSideBar }">
            <ul class="navbar__ul">
              <li class="navbar__item">
                <router-link :to="{ name: 'home' }" class="navbar__link navbar__link--is-active">Главная</router-link>
              </li>
              <li class="navbar__item navbar__item--has-sub">
                <a @click.prevent href="" class="navbar__link">Категории</a>
                <ul class="navbar__subset">
                  <li class="navbar__item">
                    <router-link :to="{ name: 'category' }" class="navbar__link">Menu 1</router-link>
                  </li>
                  <li class="navbar__item">
                    <router-link :to="{ name: 'category' }" class="navbar__link">Menu 2</router-link>
                  </li>
                  <li class="navbar__item navbar__item--has-sub">
                    <router-link :to="{ name: 'category' }" class="navbar__link">Menu 3</router-link>
                    <ul class="navbar__subset">
                      <li class="navbar__item">
                        <router-link :to="{ name: 'category' }" class="navbar__link">Menu 1</router-link>
                      </li>
                      <li class="navbar__item">
                        <router-link :to="{ name: 'category' }" class="navbar__link">Menu 2</router-link>
                      </li>
                      <li class="navbar__item navbar__item--has-sub">
                        <a href="" class="navbar__link">Menu 3</a>
                        <ul class="navbar__subset">
                          <li class="navbar__item">
                            <router-link :to="{ name: 'category' }" class="navbar__link">Menu 1</router-link>
                          </li>
                          <li class="navbar__item">
                            <router-link :to="{ name: 'category' }" class="navbar__link">Menu 2</router-link>
                          </li>
                          <li class="navbar__item">
                            <router-link :to="{ name: 'category' }" class="navbar__link">Menu 3</router-link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li class="navbar__item">
                <router-link :to="{ name: 'about' }" class="navbar__link">О компании</router-link>
              </li>
              <li class="navbar__item">
                <!-- <router-link :to="{ name: 'Contacts' }" class="navbar__link">Контакты</router-link> -->
              </li>
            </ul>
          </div>
          <div class="navbar__action">
            <div class="header__basket">
              <span class="header__basket-icon" @click="showDropDownBasket"></span>
              <span class="header__basket-count">{{ count }}</span>
              <div class="header__dropdown" :class="{ 'header__dropdown--is-active': isBasketDropDown }">
                <div class="header__dropdown-content header__dropdown-content--overflow">
                  <div class="header__basket-item" v-for="item in items" :key="item.id">
                    <a href="" class="header__basket-link">
                      <img :src="'../assets/img/slider/${item.id}.jpg'" class="header__basket-img" />
                    </a>
                    <div class="header__basket-details">
                      <h5>
                        <a class="header__basket-title" href="">{{ item.name }} ({{ item.quantity }})</a>
                      </h5>
                      <div class="header__basket-price">
                        {{ formattedPrice(item.price) }}
                      </div>
                      <button @click="removeItem(item)" type="button" class="header__basket-remove">
                        remove
                      </button>
                    </div>
                  </div>
                  <div class="header__basket-btn">
                    <router-link :to="{ name: 'cart' }" class="btn btn--boxshadow btn--brand w--100">complete order</router-link>
                  </div>
                </div>
              </div>
            </div>
            <div class="header__account">
              <span class="header__account-icon" @click="showDropDownAccount"></span>
              <div class="header__dropdown header__dropdown--w200" :class="{ 'header__dropdown--is-active': isAccountDropDown }" v-if="!authenticated">
                <div class="header__dropdown-content">
                  <router-link :to="{ name: 'login' }" class="header__account-link">Вход</router-link>
                  <router-link :to="{ name: 'register' }" class="header__account-link">Регистрация</router-link>
                </div>
              </div>
              <div class="header__dropdown header__dropdown--w200" :class="{ 'header__dropdown--is-active': isAccountDropDown }" v-if="authenticated">
                <div class="header__dropdown-content">
                  <span style="font-size: 18px; width: 100%; text-align: right; padding: 8px 20px;">
                    {{ user.name }} ({{ user.email }})
                  </span>
                  <hr />
                  <router-link :to="{ name: 'profile' }" class="header__account-link">Профиль</router-link>
                  <hr />
                  <a href="javascript:void(0)" class="header__account-link" @click="logout">Выход</a>
                </div>
              </div>
            </div>
            <div class="header__menu" :class="{ 'header__menu--is-active': showSideBar }" @click="toggleSidebar"></div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'BaseHeader',

  data: () => ({
    isBasketDropDown: false,
    isAccountDropDown: false,
    showSideBar: false,
  }),

  computed: {
    ...mapState('cart', ['items']),
    ...mapGetters('cart', ['count']),
    ...mapGetters('auth', ['authenticated', 'user'])
  },

  methods: {
    showDropDownBasket() {
      this.isAccountDropDown = false
      this.isBasketDropDown = !this.isBasketDropDown
    },
    showDropDownAccount() {
      this.isBasketDropDown = false
      this.isAccountDropDown = !this.isAccountDropDown
    },
    eventListener(event) {
      if (!event.target.closest('.header__basket,.header__account')) {
        this.isBasketDropDown = false
        this.isAccountDropDown = false
      }
      if (!event.target.closest('.navbar')) {
        this.showSideBar = false

        this.$emit('show-sidebar', false)
      }
    },
    toggleSidebar() {
      this.showSideBar = !this.showSideBar

      this.$emit('show-sidebar', this.showSideBar)
    },
    formattedPrice(price) {
      return new Intl.NumberFormat('ru', {
        style: 'currency',
        currency: 'RUB'
      }).format(price)
    },
    ...mapActions('cart', ['removeItem']),
    ...mapActions({signOut:"auth/logout"}),
    async logout(){
        await axios.post('/logout').then(({data})=>{
            this.signOut()
        })
    }
  },

  mounted() {
    document.addEventListener('click', this.eventListener)
  },

  unmounted() {
    document.removeEventListener('click', this.eventListener)
  }
}
</script>
