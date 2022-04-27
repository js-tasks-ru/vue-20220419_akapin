import { createApp } from './vendor/vue.esm-browser.js';

const vm = createApp({
  data() {
    return {
      number1: 0,
      number2: 0,
      operator: 'sum',
    };
  },

  computed: {
    result() {
      switch (this.operator) {
        case 'sum':
          return this.number1 + this.number2;
        case 'subtract':
          return this.number1 - this.number2;
        case 'multiply':
          return this.number1 * this.number2;
        case 'divide':
          return this.number1 / this.number2;
        default:
          return this.number1 + this.number2;
      }
    },
  },
}).mount('#app');
