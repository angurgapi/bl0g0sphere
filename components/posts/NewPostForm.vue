<template>
  <div class="post-form card">
    <span class="post-form__label">Заголовок</span>
    <input v-model="formData.title" type="text" class="post-form__input" />
    <span v-if="errors.title" class="post-form__warning"
      >Это обязательное поле</span
    >
    <span class="post-form__label">Содержание</span>
    <textarea
      v-model="formData.content"
      class="post-form__input post-form__input--textarea"
      rows="5"
    >
    </textarea>
    <span v-if="errors.content" class="post-form__warning"
      >Это обязательное поле</span
    >
    <span class="post-form__label">Автор</span>
    <input v-model="formData.author" type="text" class="post-form__input" />
    <span v-if="errors.author" class="post-form__warning"
      >Это обязательное поле</span
    >
    <span class="post-form__label">E-mail</span>
    <input
      v-model="formData.email"
      type="email"
      class="post-form__input"
      @blur="validateEmail"
    />
    <span v-if="errors.email" class="post-form__warning"
      >Пожалуйста, введите корректный e-mail</span
    >
    <button :disabled="isLoading" class="btn post-form__btn" @click="sendPost">
      Сохранить
    </button>
  </div>
</template>

<script>
export default {
  name: 'PostForm',
  data: () => ({
    isLoading: false,
    formData: {
      title: '',
      author: '',
      content: '',
      email: ''
    },
    errors: {
      email: false,
      title: false,
      content: false,
      author: false
    }
  }),

  methods: {
    validateForm() {
      for (let field in this.formData) {
        this.errors[field] = !this.formData[field].length
      }
      // console.log(this.errors)
      return Object.values(this.errors).every((v) => v === false)
    },
    async sendPost() {
      if (this.validateForm()) {
        try {
          this.isLoading = true
          await this.$firebase
            .firestore()
            .collection('posts')
            .add({
              ...this.formData,
              created_at: new Date()
            })
          this.$router.push('/')
        } catch (e) {
          console.log(e)
        }
        this.isLoading = false
      }
    },

    validateEmail() {
      const regex =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      this.errors.email = !regex.test(this.formData.email)
    }
  }
}
</script>

<style lang="scss" scoped>
.post-form {
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  padding: 18px;
  width: 100%;
  min-width: 300px;
  max-width: 600px;

  &__label {
    color: #000;

    &:not(:first-child) {
      margin-top: 16px;
    }
  }

  &__input {
    border: 1px solid rgba(0, 0, 0, 40%);
    border-radius: 8px;
    padding: 8px;
    width: 100%;
    height: 36px;

    &:focus,
    &:active,
    &:hover {
      outline: none;
    }

    &--textarea {
      border-radius: 8px;
      height: 100px;
    }
  }

  &__warning {
    font-size: 11px;
    color: #9c1c2d;
  }

  &__btn {
    margin-top: 20px;
    border-radius: 8px;
    width: 100%;
    background-color: rgb(25, 28, 31);

    &:hover {
      opacity: 0.8;
    }
  }
}
</style>
