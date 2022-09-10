<template>
  <div ref="file" class="file">
    <div class="file__preview">
      <img v-if="previewSrc" class="file__image" :src="previewSrc" />
      <svg-image v-else class="file__image file__image--icon" name="xml" />

      <button type="button" class="btn file__delete" @click="deleteFile">
        <svg-icon name="close" />
      </button>

      <div class="file__cover">
        <!-- FILE IS UPLOADING -->
        <template v-if="isUploading">
          <div class="loader" />
        </template>
        <!-- FILE IS UPLOADED -->
        <template v-else-if="isSuccess">
          <!-- <svg-icon name="checked" class="file__icon" /> -->
          <span class="file__data">{{
            file.name || file.original_filename
          }}</span>
        </template>
        <!-- FILE IS REJECTED -->
        <template v-else-if="isFail">
          <Tooltip tipless text="Не удалось загрузить файл">
            <svg-icon name="times-circle" class="file__icon" />
          </Tooltip>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from 'firebase/storage'

export default {
  name: 'DropzoneFile',
  props: {
    file: {
      required: true
    }
  },

  data() {
    return {
      fileOnServer: {},
      controller: null,
      isUploading: false,
      isFail: false,
      isSuccess: false,
      deletePath: '',
      id: ''
    }
  },

  computed: {
    uploadPercentage() {
      return ~~((this.uploaded * 100) / parseInt(this.file.size))
    },

    previewSrc() {
      if (this.file instanceof File) {
        return this.file.type.split('/')[0] === 'image'
          ? URL.createObjectURL(this.file)
          : null
      } else if (typeof this.file === 'object') {
        return ['jpeg', 'jpg', 'png'].includes(
          this.file.publicPath.split('.').reverse()[0]
        )
          ? this.file.publicPath
          : null
      }
    }
  },

  methods: {
    async uploadFile() {
      this.isUploading = true
      const storage = getStorage()
      const storageRef = ref(storage, 'images/', this.file.name)
      const uploadTask = uploadBytesResumable(storageRef, this.file)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused')
              break
            case 'running':
              console.log('Upload is running')
              break
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break
            case 'storage/canceled':
              // User canceled the upload
              break

            // ...

            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          this.isUploading = false
          this.isSuccess = true
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL)
            this.$emit('upload', downloadURL)
          })
        }
      )

      // try {
      //   uploadBytes(storageRef, this.file).then((snapshot) => {
      //     console.log(snapshot)

      //     // getDownloadURL(ref).then((url) => this.$emit('upload', url))
      //   })
      //   this.isSuccess = true
      //   this.isUploading = false
      // } catch (e) {
      //   console.log(e)
      // }
    },

    async deleteFile() {
      if (this.isSuccess) {
        try {
          await this.$axios.delete(
            `/api/offers/own/file/${this.fileOnServer.id}`
          )
          this.$emit('deleteUploaded', this.fileOnServer, this.file)
        } catch (e) {
          this.$console.error(e)
        }
      } else if (this.isFail) {
        this.$emit('deleteRejected', this.file)
      } else {
        this.controller.abort()
        this.$emit('deleteRejected', this.file)
      }
    }
  },
  mounted() {
    if (this.file instanceof File) {
      this.uploadFile()
    } else if (typeof this.file === 'object') {
      this.fileOnServer = this.file
      this.$refs.file.setAttribute('data-id', this.fileOnServer.id)
      this.isSuccess = true
    }
  }
}
</script>

<style scoped lang="scss">
.file {
  width: 100%;
  height: 70px;
  font-size: 12px;

  &::v-deep .tooltip-trigger {
    padding-left: 0;
  }

  &::v-deep .tooltip {
    @media (max-width: 1000px) {
      left: 0;
      margin-left: -50px;
      width: 150px;
      font-size: 12px;
    }
  }

  &__preview {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    width: 100%;
    height: 100%;
    background-size: cover;
  }

  &__image {
    border-radius: 8px;
    width: 100%;
    height: 100%;
    object-fit: cover;

    &--icon {
      width: 50px;
      height: 50px;
    }
  }

  &__cover {
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  &__data {
    border-radius: 4px;
    padding: 4px;
    font-size: 12px;
    word-break: break-all;
    color: #fff;
    background: rgba(0, 0, 0, 30%);
    opacity: 0;

    &:hover {
      opacity: 1;
    }
  }

  &__icon {
    width: 28px;
    height: 28px;
    fill: #ff4040;
  }

  &__delete {
    position: absolute;
    right: -9px;
    top: -9px;
    z-index: 9;
    border-radius: 50%;
    padding: 0;
    width: 18px;
    height: 18px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 8%);
    background: #fff;

    svg {
      width: 12px;
      height: 12px;
      fill: #21365f;
    }
  }
}

.loader,
.loader::after {
  border-radius: 50%;
  width: 20px;
  height: 20px;
}

.loader {
  // margin: 25% auto;
  border-top: 3px solid rgba(255, 255, 255, 20%);
  border-right: 3px solid rgba(255, 255, 255, 20%);
  border-bottom: 3px solid rgba(255, 255, 255, 20%);
  border-left: 3px solid #fff;

  // text-indent: -9999em;
  transform: translateZ(0);
  animation: load8 1.1s infinite linear;
}

@keyframes load8 {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes load8 {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
