<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal-container">
      <h3>{{ title }}</h3>
      <p>{{ message }}</p>
      <div class="modal-buttons">
        <button class="btn btn-outline-success" @click="generateDecision">Imprimer la Decision</button>
        <button class="btn btn-outline-danger" @click="generateED">Imprimer l'ED</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Confirmation"
    },
    message: {
      type: String,
      default: "Etes-vous sûr"
    },
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    generateDecision() {
      this.$emit('generate-decision');
      this.close();
    },
    generateED() {
      this.$emit('generate-ed');
      this.close();
    },
    close() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-container {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  text-align: center;
}

.modal-buttons {
  margin-top: 20px;
}

.btn {
  margin: 5px;
  padding: 10px 20px;
  font-size: 16px;
}
</style>
