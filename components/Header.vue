<template>
  <nav class="bg-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline">
              <a
                href="#"
                class="
                  px-3
                  py-2
                  rounded-md
                  text-sm
                  font-medium
                  text-white
                  bg-gray-900
                  focus:outline-none focus:text-white focus:bg-gray-700
                "
                >Etusivu</a
              >
              <a
                href="#"
                class="
                  ml-4
                  px-3
                  py-2
                  rounded-md
                  text-sm
                  font-medium
                  text-gray-300
                  hover:text-white hover:bg-gray-700
                  focus:outline-none focus:text-white focus:bg-gray-700
                "
                >Asetukset</a
              >
            </div>
          </div>
        </div>

        <div class="-mr-2 flex md:hidden">
          <!-- Mobile menu button -->
          <button
            class="
              inline-flex
              items-center
              justify-center
              p-2
              rounded-md
              text-gray-400
              hover:text-white hover:bg-gray-700
              focus:outline-none focus:bg-gray-700 focus:text-white
            "
            @click="isOpen = !isOpen"
          >
            <svg
              :class="[isOpen ? 'hidden' : 'block', 'h-6 w-6']"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
            <svg
              :class="[isOpen ? 'block' : 'hidden', 'h-6 w-6']"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div :class="[isOpen ? '' : 'hidden', 'md:hidden']">
      <div class="px-2 pt-2 pb-3 sm:px-3">
        <a
          href="#"
          class="
            block
            px-3
            py-2
            rounded-md
            text-base
            font-medium
            text-white
            bg-gray-900
            focus:outline-none focus:text-white focus:bg-gray-700
          "
          >Etusivu</a
        >
        <a
          href="#"
          class="
            mt-1
            block
            px-3
            py-2
            rounded-md
            text-base
            font-medium
            text-gray-300
            hover:text-white hover:bg-gray-700
            focus:outline-none focus:text-white focus:bg-gray-700
          "
          >Asetukset</a
        >
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  data: () => ({
    isOpen: false,
  }),
}
</script>
