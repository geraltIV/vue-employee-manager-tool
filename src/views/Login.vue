<template>
  <div class="grey darken-1 login-layout">
    <form class="card auth-card" @submit.prevent="onFormSubmit">
      <div class="card-content">
        <span class="card-title">Welcome to <b>Employees Manager</b></span>

        <div class="input-field">
          <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{
              invalid:
                ($v.email.$dirty && !$v.email.required) ||
                ($v.email.$dirty && !$v.email.email),
            }"
          />
          <label for="email">Email</label>
          <small
            class="helper-text invalid"
            v-if="$v.email.$dirty && !$v.email.required"
            >Email is required!</small
          >
          <small
            class="helper-text invalid"
            v-else-if="$v.email.$dirty && !$v.email.email"
            >Please enter a valid Email</small
          >
        </div>

        <div class="input-field">
          <input
            id="password"
            type="password"
            v-model="password"
            :class="{
              invalid:
                ($v.password.$dirty && !$v.password.required) ||
                ($v.password.$dirty && !$v.password.minLength),
            }"
          />
          <label for="password">Password</label>
          <small
            class="helper-text invalid"
            v-if="$v.password.$dirty && !$v.password.required"
            >Please enter a password</small
          >
          <small
            class="helper-text invalid"
            v-else-if="$v.password.$dirty && !$v.password.minLength"
            >Password must be
            {{ this.$v.password.$params.minLength.min }} characters. He is
            {{ password.length }} now</small
          >
        </div>
      </div>

      <div class="card-action">
        <div>
          <button
            class="btn waves-effect blue darken-4 auth-submit"
            type="submit"
          >
            Log in
            <i class="material-icons right">send</i>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { email, required, minLength } from 'vuelidate/lib/validators';
import messages from '@/utils/messages';

export default {
  name: 'LoginPage',
  data: () => ({
    email: 'test@test.com',
    password: 'qwerty123',
  }),
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(6) },
  },
  mounted() {
    if (messages[this.$route.query.message])
      this.$message(messages[this.$route.query.message]);
  },
  methods: {
    ...mapActions(['login']),
    async onFormSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const formData = {
        email: this.email,
        password: this.password,
      };

      await this.login(formData);
      await this.$router.push('/dashboard');
    },
  },
};
</script>

<style></style>
