<template>
  <Editor
    :id="nativeId"
    :api-key="token"
    :value="value"
    :placeholder="placeholder"
    :init="{
      height,
      menubar: false,
      plugins: [
        'advlist autolink lists link image',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime table wordcount textcolor'
      ],
      toolbar:
        'formatselect | bold italic forecolor backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat'
    }"
    @input="$emit('input', $event)"
  />
</template>

<script>
import Editor from '@tinymce/tinymce-vue'

export default {
  name: 'TinyMceEditor',
  components: {
    Editor
  },

  props: {
    nativeId: {
      type: String,
      default: ''
    },

    value: {
      type: String,
      required: true
    },

    placeholder: {
      type: String,
      default: 'Введите текст'
    },

    height: {
      type: Number,
      default: 400
    }
  },

  computed: {
    token() {
      return this.$config.tinymceToken
    }
  }
}
</script>

<style lang="scss">
.tox-statusbar,
.tox-statusbar__text-container {
  display: none !important;
}

.tox-statusbar {
  border: 0 !important;
  height: auto !important;
  background: none !important;
}

.tox-tinymce {
  border-width: 2px !important;
  border-color: #cee4ed !important;
  border-radius: 4px !important;

  &-aux {
    z-index: 20000 !important;
  }
}
</style>
