<script setup>
import { motion } from 'motion-v'

const links = [
  { href: '#problem', label: 'The problem' },
  { href: '#how', label: 'How it works' },
  { href: '#sample', label: 'Sample call' },
  { href: '#faq', label: 'FAQ' },
]
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-md">
    <div class="mx-auto flex h-[68px] max-w-[1180px] items-center justify-between px-5 sm:px-7">
      <a href="#top" class="flex items-center gap-[9px] font-display text-[17px] font-extrabold tracking-[0.14em] text-ink no-underline" aria-label="AgenticOpz — home">
        <span class="inline-block h-[9px] w-[9px] rounded-full bg-accent"></span>AGENTIC&nbsp;OPZ
      </a>
      <nav class="hidden gap-[34px] min-[961px]:flex" aria-label="Main">
        <a
          v-for="l in links"
          :key="l.href"
          :href="l.href"
          class="text-[15px] font-medium text-ink-soft no-underline transition-colors hover:text-ink"
        >{{ l.label }}</a>
      </nav>
      <motion.a
        href="#audit"
        class="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-[10px] text-[14.5px] font-semibold text-cream no-underline transition-colors hover:bg-black"
        :whileHover="{ scale: 1.03 }"
        :whileTap="{ scale: 0.97 }"
        :transition="{ type: 'spring', stiffness: 400, damping: 22 }"
      >Get a free audit</motion.a>
    </div>
  </header>
</template>
