<template>
  <div class="min-h-screen flex flex-col justify-center bg-gray-1000">
    <Header />
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      <Nuxt />
    </div>
    <Footer />
  </div>
</template>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background-color: #18191c;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
