<template lang="jade">
  div#table
    table#example.display(cellspacing='0', width='100%')
      thead
        tr
          th(v-for="head in tableHead") {{head}}
      tbody
        tr(v-for="item in dataList")
          td(v-for="key in keys") {{item[key]}}
</template>
<<script>
  export default {
    name: 'dataTable',
    props: ['tableHead', 'dataList', 'keys'],
    mounted() {
      $('#example').dataTable();
      $('.dataTables_empty').hide();
    }
  }
</script>
<style lang="sass">
  td
    text-align: center
</style>