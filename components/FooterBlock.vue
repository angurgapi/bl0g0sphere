<template>
  <div class="footer f-column">
    <Accordion title="contacts">
      <template #content>
        <ul class="footer__links">
          <li>
            <a
              class="footer__link"
              href="https://t.me/bl0g0sphere"
              target="_blank"
            >
              <svg-icon name="telegram" height="20" width="20" />
            </a>
          </li>
          <li>
            <a
              class="footer__link"
              href="mailto:bl0g0sphere@gmail.com"
              target="_blank"
            >
              <svg-icon name="envelope" height="20" width="20" />
            </a>
          </li>
        </ul>
      </template>
    </Accordion>
    <span class="footer__copyright">&#169; blogosphere {{ currentYear }}</span>
  </div>
</template>

<script>
export default {
  name: 'FooterBlock',
  computed: {
    currentYear() {
      return new Date().getFullYear()
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  align-items: center;
  padding: 24px;
  width: 100%;
  min-height: 100px;
  color: #f0f2f0;
  background-color: rgb(25, 28, 31);

  &::v-deep .accordion {
    width: fit-content;
  }

  &__links {
    display: grid;
    grid-gap: 18px;
    grid-template-columns: repeat(2, 1fr);
    margin: auto;
    width: fit-content;
  }

  &__link {
    display: flex;
    align-items: center;
    width: fit-content;

    svg {
      fill: #fff;
    }
  }

  &__copyright {
    margin-top: 22px;
  }
}
</style>
