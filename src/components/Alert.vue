<template>
  <div class="message-alert">
    <div
      class="alert alert-dismissible"
      :class="'alert-' + item.status"
      v-for="(item, i) in messages"
      :key="i"
    >
      {{ item.message }}
      <button
        type="button"
        class="close"
        @click="removeMessage(i)"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      messages: []
    };
  },
  methods: {
    updateMessage(message, status) {
      const timestamp = Math.floor(new Date() / 1000);
      console.log("Alert:", message, status);
      this.messages.push({
        message,
        status,
        timestamp
      });
      this.removeMessageWithTiming(timestamp);
      //執行定時清除訊息
    },
    removeMessage(num) {
      this.messages.splice(num, 1);
    },
    removeMessageWithTiming(timestamp) {
      //在updateMessage()執行時，將新建立訊息的timestamp帶入到這邊，並與messages陣列中的物件作比對，若符合的則執行setTimeout()並清除。
      const vm = this;
      setTimeout(() => {
        vm.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            vm.messages.splice(i, 1);
          }
        });
      }, 5000);
    }
  },
  created() {
    let vm = this;
    vm.$bus.$on("message:push", (message, status = "warning") => {
      vm.updateMessage(message, status);
    });
    // vm.$bus.$on('監聽的事件名稱', (事件帶入的data，可以預設帶入的data) => {
    // });
    // vm.$bus.$emit('message:push'); -> 外部可以利用 $emit() 來觸發事件並傳入data
  }
};
</script>

<style scope>
.message-alert {
  position: fixed;
  max-width: 50%;
  top: 56px;
  right: 20px;
  z-index: 1100;
}
</style>