<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': isLoading }"
      :style="{ '--bg-url': currentPreview ? `url(${currentPreview})` : null }"
      @click="removeImage"
    >
      <span class="image-uploader__text">{{ imageText }}</span>
      <input
        ref="input"
        v-bind="$attrs"
        type="file"
        accept="image/*"
        class="image-uploader__input"
        @change="onInputChange"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',

  inheritAttrs: false,

  props: {
    preview: String,
    uploader: Function,
  },

  emits: ['remove', 'upload', 'error', 'select'],

  data() {
    return {
      isLoading: false,
      currentPreview: this.preview,
    };
  },

  computed: {
    imageText() {
      if (!this.currentPreview && !this.isLoading) {
        return 'Загрузить изображение';
      } else if (this.isLoading) {
        return 'Загрузка...';
      }
      return 'Удалить изображение';
    },
  },

  watch: {
    preview(newValue) {
      this.currentPreview = newValue;
    },
  },

  methods: {
    onInputChange(event) {
      const file = event.target.files[0];
      this.$emit('select', file);

      if (this.uploader) {
        this.isLoading = true;
        this.uploader(file)
          .then((response) => this.$emit('upload', response))
          .catch((error) => {
            this.$emit('error', error);
            event.target.value = '';
          })
          .finally(() => {
            this.isLoading = false;
          });
      } else {
        this.currentPreview = URL.createObjectURL(file);
      }
    },

    removeImage(event) {
      this.$refs.input.value = '';

      if (this.currentPreview && !this.isLoading) {
        event.preventDefault();
        this.currentPreview = null;
        this.$emit('remove');
      }
    },
  },
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
