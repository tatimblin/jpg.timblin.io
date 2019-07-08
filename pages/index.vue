<template>
</template>

<script>
export default {
  layout: 'default',
  data() {
    // Using webpacks context to gather all files from a folder
    const context = require.context('~/content/collections/', false, /\.json$/);
    const posts = context.keys().map(key => ({
      ...context(key),
      _path: `/${key.replace('.json', '').replace('./', '')}`
    })).sort(function(a, b) {
      var dateA = new Date(a.date), dateB = new Date(b.date);
      return dateA - dateB;
    });
    return { posts };
  },
  mounted () {
    const netlifyIdentityWidget = document.createElement('script');
    netlifyIdentityWidget.setAttribute('src', 'https://identity.netlify.com/v1/netlify-identity-widget.js');
    document.head.appendChild(netlifyIdentityWidget);
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on('init', (user) => {
        if (!user) {
          window.netlifyIdentity.on('login', () => {
            document.location.href = '/admin/';
          });
        }
      });
    }
  },
};
</script>

<style lang="scss">

</style>
