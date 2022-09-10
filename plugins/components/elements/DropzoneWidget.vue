<template>
  <div class="droparea" @drop.prevent="dropFiles">
    <div
      @dragenter.prevent="active = !active"
      @dragleave.prevent="active = !active"
      @dragover.prevent
      @drop.prevent="active = true"
    >
      <input
        id="dropzone-photos-input"
        ref="input"
        type="file"
        multiple
        accept=".png, .jpg, .jpeg"
        @input="selectFiles"
      />

      <div
        id="droparea-inner-photos"
        class="droparea__inner"
        :class="{
          'droparea__inner--filled': selectedFiles.length,
          'droparea__inner--active': active
        }"
        @click.self="openInput"
      >
        <template v-if="!selectedFiles.length">
          <svg-image class="droparea__logo" name="cam" @click="openInput" />

          <span class="droparea__legend" @click="openInput"
            >Загрузите файлы или перетащите в эту область</span
          >
        </template>
        <template v-else>
          <DropzoneFile
            v-for="(file, index) in selectedFiles"
            :key="index"
            :file="file"
            @click.stop.prevent="openInput"
            @upload="fileUploaded"
            @deleteUploaded="deleteUploaded"
            @deleteRejected="deleteRejected"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import DropzoneFile from './DropzoneFile'

export default {
  name: 'DropzoneWidget',
  components: { DropzoneFile },
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    selectedFiles: [],
    filesOnServer: [],
    active: false
  }),

  methods: {
    selectFiles(e) {
      this.selectedFiles.push(...e.target.files)
    },
    dropFiles(e) {
      this.selectedFiles.push(...e.dataTransfer.files)
    },
    fileUploaded(file) {
      this.filesOnServer.push(file)
      this.$emit('input', this.filesOnServer)
    },
    deleteUploaded(fileToRemove, previewToRemove) {
      this.filesOnServer = this.filesOnServer.filter(
        (file) => file !== fileToRemove
      )
      this.selectedFiles = this.selectedFiles.filter(
        (file) => file !== previewToRemove
      )
      this.$emit('input', this.filesOnServer)
    },
    deleteRejected(fileToRemove) {
      this.selectedFiles = this.selectedFiles.filter(
        (file) => file !== fileToRemove
      )
    },
    reorderImages(reorderedFiles) {
      this.filesOnServer.sort(
        (a, b) => reorderedFiles.indexOf(a.id) - reorderedFiles.indexOf(b.id)
      )
      this.$emit('input', this.filesOnServer)
    },
    initSortable() {
      const wrapper = document.getElementById('droparea-inner-photos')
      console.log(typeof Sortable)
      if (wrapper && typeof Sortable !== 'undefined') {
        const sortable = Sortable.create(wrapper, {
          animation: 150,
          draggable: '.file',
          onEnd: () => {
            this.reorderImages(sortable.toArray())
          }
        })
      }
    },
    openInput() {
      this.$refs.input.click()
    }
  },
  mounted() {
    if (this.value.length) {
      this.filesOnServer = [...this.value]
      this.selectedFiles = [...this.value]
    }
    this.initSortable()
  }
}
</script>

<style lang="scss" scoped>
input {
  position: absolute;
  height: 1px;
  opacity: 0;
  visibility: hidden;
}

.droparea {
  width: 100%;
  min-width: 320px;
  max-width: 600px;

  &__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px dotted #8b62ff;
    border-radius: 8px;
    padding: 21px;
    width: 100%;
    height: 100%;
    font-family: 'Rubik';
    font-size: 13px;
    line-height: 18px;
    letter-spacing: -0.5px;
    text-align: center;
    background: #eae6ff;
    cursor: pointer;

    span {
      max-width: 200px;
    }

    img {
      width: 32px;
      height: 32px;
    }

    &--filled {
      display: grid;
      grid-gap: 20px;
      grid-template-columns: repeat(auto-fit, minmax(106px, 150px));
      grid-template-rows: auto;
      border: 1px solid #e8eaed;
      background: #fff;

      @media (max-width: 400px) {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    &--active {
      opacity: 0.4;
    }
  }

  &__legend {
    margin-top: 10px;
    color: #21365f;
    cursor: pointer;
    user-select: none;
  }

  &__hint {
    margin-top: 8px;
    color: #8b62ff;
    cursor: pointer;
    user-select: none;
  }
}
</style>
