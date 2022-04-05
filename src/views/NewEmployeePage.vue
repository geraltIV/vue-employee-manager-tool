<template>
  <div class="container">
    <div class="col s12 m6 l8">
      <div class="card">
        <div class="card-content black-text">
          <Form />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Form from '@/components/Form';

export default {
  name: 'NewEmployeePage',
  components: { Form },
};
</script>

<style scoped></style>
