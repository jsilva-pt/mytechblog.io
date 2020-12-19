<template>
  <div class="flex flex-wrap justify-between mb-8 items-center">
    <div class="md:w-6/12 p-4 sm:p-0 order-2 md:order-1">
      <div
        class="xl:text-lg light:text-light-onSurfaceSecondary dark:text-dark-onSurfaceSecondary font-medium leading-relaxed"
      >
        <p class="mb-1">{{ $t('homepage.hi') }}</p>
        <p class="mb-1">{{ $t('homepage.name') }}</p>
        <p class="mb-1">{{ $t('homepage.about') }}</p>
        <p>{{ $t('homepage.blog') }}</p>
      </div>
    </div>

    <div
      class="md:w-6/12 text-light-elevatedSurface dark:text-dark-elevatedSurface order-1 md:order-2"
    >
      <img src="/avatar/welcome.png" class="w-2/3 float-right" alt="welcome image" />
    </div>
  </div>
</template>
