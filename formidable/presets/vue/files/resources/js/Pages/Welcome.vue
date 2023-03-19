<script lang="ts" setup>
import { ref } from "vue";

defineProps({
  formidableVersion: String,
  nodeVersion: String,
});

const counter = ref(0);

const setCounter = (value: number): void => {
  counter.value = value;
};
</script>

<template>
  <div class="container">
    <div class="content">
      <div class="logo">
        <img src="/formidable.png" />
        <p>+</p>
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg"
        />
      </div>

      <div class="welcome">
        <h4>Yey! You have successfully created a new Formidable project.</h4>
      </div>

      <div class="counter">
        <button @click="setCounter(counter + 1)">
          Clicked {{ counter }} times
        </button>
      </div>

      <ul className="links">
        <li>
          <a href="https://formidablejs.org/" target="_blank" rel="noopener"> Formidable </a>
        </li>

        <li>
          <a href="https://vuejs.org/" target="_blank" rel="noopener"> Vue </a>
        </li>

        <li>
          <a href="https://github.com/formidablejs" target="_blank" rel="noopener"> Github </a>
        </li>

        <li>
          <a href="https://twitter.com/formidablejs" target="_blank" rel="noopener"> Twitter </a>
        </li>
      </ul>

      <div class="information">
        Formidable v{{ formidableVersion ?? "undefined" }} (Node {{ nodeVersion ?? "undefined" }})
      </div>
    </div>
  </div>
</template>
