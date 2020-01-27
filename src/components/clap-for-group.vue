<template>
  <div>
    <q-fab color="purple" icon="mdi-hand" direction="right">
      <q-fab-action color="primary" @click="onClick" icon="mail" />
      <q-fab-action color="secondary" @click="onClick" icon="alarm" />
    </q-fab>

  </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  data() {
    return {};
  }
};
</script>
