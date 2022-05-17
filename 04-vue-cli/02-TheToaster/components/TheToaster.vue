<template>
  <div class="toasts">
    <UiToast v-for="toast in toasts" :key="toast.id" :type="toast.type" :message="toast.message" />
  </div>
</template>

<script>
import UiIcon from './UiIcon';
import UiToast from './UiToast';

const REMOVE_TOAST_TIMEOUT_MS = 5000;

export default {
  name: 'TheToaster',

  components: { UiIcon, UiToast },

  data() {
    return {
      toasts: [],
    };
  },

  methods: {
    addToast(type, message) {
      const newToast = { id: new Date(), type, message };

      this.toasts.push(newToast);
      this.scheduleToastRemoval(newToast.id);
    },

    success(message) {
      this.addToast('success', message);
    },

    error(message) {
      this.addToast('error', message);
    },

    scheduleToastRemoval(toastId) {
      setTimeout(() => {
        this.removeToast(toastId);
      }, REMOVE_TOAST_TIMEOUT_MS);
    },

    removeToast(toastId) {
      const toastToRemoveIndex = this.toasts.findIndex((item) => item.id === toastId);
      this.toasts.splice(toastToRemoveIndex, 1);
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
