<template>
  <ui-input :model-value="value" :type="type" @input="onInput">
    <template v-for="slot in Object.keys($slots)" #[slot]>
      <slot :name="slot" />
    </template>
  </ui-input>
</template>

<script>
import UiInput from './UiInput';

export default {
  name: 'UiInputDate',

  components: { UiInput },

  props: {
    type: {
      type: String,
      default: 'date',
      validator: (type) => ['date', 'datetime-local', 'time'].includes(type),
    },

    modelValue: {
      type: Number,
      default: null,
    },
  },

  emits: ['update:modelValue'],

  computed: {
    value() {
      if (typeof this.modelValue === 'undefined' || this.modelValue === null) {
        return '';
      }
      const date = new Date(this.modelValue).toISOString();
      if (this.type === 'date') {
        return date.substring(0, 10);
      } else if (this.type === 'datetime-local') {
        return date.substring(0, 16);
      } else if (this.type === 'time') {
        return this.$attrs['step'] && this.$attrs['step'] % 60 !== 0 ? date.substring(11, 19) : date.substring(11, 16);
      }
      return '';
    },
  },

  methods: {
    onInput(event) {
      if (event.target.value === '') {
        this.$emit('update:modelValue', null);
        return;
      }
      this.$emit('update:modelValue', event.target.valueAsNumber);
    },
  },
};
</script>
