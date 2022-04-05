<template>
  <div class="modal">
    <div class="modal-content">
      <h4>Confirm your action</h4>
      <p>Do you want to delete employee #{{ userID }}?</p>
    </div>
    <div class="modal-footer">
      <button
        class="modal-close btn waves-effect waves-light red accent-4 white-text"
        @click.prevent="deleteItem(userID)"
      >
        Agree
      </button>
      <button
        @click="close"
        class="btn waves-effect waves-light blue darken-4 white-text"
      >
        Close
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'ConfirmationModal',
  data: () => ({
    userID: '',
  }),
  props: {
    id: {
      type: String,
      default: '',
    },
  },
  mounted() {
    this.userID = this.id;
  },
  destroyed() {
    this.userID = '';
  },
  methods: {
    ...mapActions(['deleteEmployee']),
    async deleteItem() {
      await this.deleteEmployee({ id: this.userID });
      this.$message('Employee was deleted!');
      this.close();
    },
    close() {
      this.$emit('closeModal', true);
      document.body.querySelector('.overlay').classList.add('d-none');
    },
  },
};
</script>

<style scoped>
.modal-close {
  margin-right: 15px !important;
}
</style>
