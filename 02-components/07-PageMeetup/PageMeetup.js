import { defineComponent } from './vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import MeetupView from './MeetupView.js';
import { fetchMeetupById } from './meetupService.js';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      meetup: null,
      isLoading: false,
      error: '',
    };
  },

  watch: {
    meetupId: {
      handler(newMeetupId) {
        this.meetup = null;
        this.error = '';
        this.loadMeetup(newMeetupId);
      },
      immediate: true,
    },
  },

  methods: {
    loadMeetup(meetupId) {
      this.isLoading = true;
      fetchMeetupById(meetupId)
        .then((meetup) => {
          this.meetup = meetup;
        })
        .catch((err) => {
          this.error = err.message;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },

  template: `
    <div class="page-meetup">
      <MeetupView v-if="meetup" :meetup="meetup" />

      <ui-container v-if="isLoading">
        <ui-alert>Загрузка...</ui-alert>
      </ui-container>

      <ui-container v-if="error">
        <ui-alert>{{ error }}</ui-alert>
      </ui-container>
    </div>`,
});
