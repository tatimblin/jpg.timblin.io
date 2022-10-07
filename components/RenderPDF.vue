<template>
  <div v-if="asset && asset.fields.file.url">
    <object
      :data="`${asset.fields.file.url}#toolbar=0`"
      type="application/pdf"
      frameBorder="0"
      width="100%"
      ref="pdf"
    >
    </object>
  </div>
</template>

<script>
export default {
  name: 'RenderPDF',
  props: {
    asset: {
      type: Object,
      default: () => {
        return {
          fields: {
            file: {
              url: '',
            },
          }
        };
      }
    }
  },
  mounted() {
    const pdfObject = this.$refs.pdf;

    if (!pdfObject) return;

    const width = pdfObject.offsetWidth;
    pdfObject.style.height = `${width * 1.2241}px`;
  }
};
</script>

