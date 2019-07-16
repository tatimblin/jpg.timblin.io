<template>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'default',
  mounted () {
    // Redirect
    this.$router.push(this.getFirstPage)

    // Netlify CMS
    const netlifyIdentityWidget = document.createElement('script')
    netlifyIdentityWidget.setAttribute('src', 'https://identity.netlify.com/v1/netlify-identity-widget.js')
    document.head.appendChild(netlifyIdentityWidget);
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on('init', (user) => {
        if (!user) {
          window.netlifyIdentity.on('login', () => {
            document.location.href = '/admin/'
          });
        }
      });
    }
  },
  computed: {
    ...mapGetters(['getFirstPage'])
  },
};
</script>

<style lang="scss">

</style>
