<template>
    <base-spinner></base-spinner>
    <router-view :key="$route.fullPath"></router-view>
</template>
<script setup lang="ts"></script>
