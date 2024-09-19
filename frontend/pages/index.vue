<template>
  <div>
    <NuxtWelcome />
  </div>
</template>

<script setup lang="ts">
const { $apiTest } = useNuxtApp();

onMounted(async () => {
  const test = await $apiTest.apiTest({ latitude: "35.6785", longitude: "139.6823" });
  if (test.status === "error") {
    console.log("test", test);
  }
  console.log("success", test);
  if (test.status !== "error") {
    console.log("su", test.elevation);
  }

});
</script>
