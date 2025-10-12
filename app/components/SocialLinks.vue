<template>
  <div class="flex flex-row gap-5 mx-auto w-24 p-1">
    <NuxtLink
      to="https://github.com/anna-olivia"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open GitHub"
    >
      <Icon
        name="uil:github"
        class="text-5xl text-gray-800 hover:scale-125 transition"
      />
    </NuxtLink>
    <NuxtLink
      to="https://www.linkedin.com/in/annalebertwietholtz/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open LinkedIn"
    >
      <Icon
        name="uil:linkedin"
        class="text-5xl text-blue-800 hover:scale-125 transition"
      />
    </NuxtLink>
  </div>
</template>
