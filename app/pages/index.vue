<template>
  <section class="container mx-auto grid gap-10 px-4 py-20">
    <div class="grid gap-6">
      <h1 class="text-4xl font-bold tracking-tight">Default Template</h1>
      <h2 class="text-3xl text-gray-600">Boilerplate for:</h2>
      <ul class="list-disc bg-slate-100 px-5">
        <li>nuxt 3.29.3 with nuxt/eslint module</li>
        <li>Eslint</li>
        <li>Typescript</li>
        <li>Tailwind</li>
      </ul>
      <p class="text-lg text-gray-600">
        Use splitted Terminal:
        <code class="bg-orange-100">$npm run lint</code> and
        <code class="bg-orange-100">$npm run typecheck </code> next to
        <code class="bg-orange-100">$npm run dev</code>
      </p>
      <AppSetup />
    </div>
  </section>
</template>
