<template>
 
  <router-view/>
</template>
<script>

export default {
  
  created(){
    const storedAccount = sessionStorage.getItem('account');
    const account = JSON.parse(storedAccount);
    if(account){
      this.$store.state.account=account
    }
  }
}
</script>

<style >

</style>
