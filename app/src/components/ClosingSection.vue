<script setup>
import { motion } from 'motion-v'
import Reveal from './Reveal.vue'

const year = new Date().getFullYear()

const footerLinks = [
  { href: '#problem', label: 'The problem' },
  { href: '#how', label: 'How it works' },
  { href: '#sample', label: 'Sample call' },
  { href: '#audit', label: 'Free audit' },
]
</script>

<template>
  <section class="bg-dark py-[76px] text-center text-[#e9e7de] min-[961px]:py-[110px]">
    <div class="mx-auto max-w-[1180px] px-5 sm:px-7">
      <Reveal>
        <h2 class="mb-5 font-display text-[clamp(34px,4vw,52px)] font-extrabold leading-[1.04] tracking-[-0.015em] text-cream">Tonight, someone in your service area<br>will have no heat, no water, or no power.</h2>
        <p class="mb-[38px] text-[19px] text-[#b9bbb0]">They’re going to call somebody. Make sure somebody answers.</p>
        <motion.a
          href="#audit"
          class="inline-flex items-center gap-2 rounded-full bg-accent px-9 py-[18px] text-[17.5px] font-semibold text-cream no-underline shadow-[0_12px_26px_-12px_rgba(255,90,31,0.55)] transition-colors hover:bg-accent-dark"
          :whileHover="{ scale: 1.03 }"
          :whileTap="{ scale: 0.97 }"
          :transition="{ type: 'spring', stiffness: 400, damping: 22 }"
        >Get your free Missed-Call Audit</motion.a>
      </Reveal>
    </div>
  </section>

  <footer class="border-t border-line-dark bg-dark pb-[30px] pt-14 text-[#b9bbb0]">
    <div class="mx-auto max-w-[1180px] px-5 sm:px-7">
      <div class="flex flex-wrap justify-between gap-10 pb-11">
        <div>
          <p class="flex items-center gap-[9px] font-display text-[17px] font-extrabold tracking-[0.14em] text-cream">
            <span class="inline-block h-[9px] w-[9px] rounded-full bg-accent"></span>AGENTIC&nbsp;OPZ
          </p>
          <p class="mt-4 text-[15px] leading-[1.65]">AI front desks for home-service companies.<br>Every call answered. Every job captured.</p>
        </div>
        <nav class="flex flex-col gap-[10px]" aria-label="Footer">
          <a v-for="l in footerLinks" :key="l.href" :href="l.href" class="text-[15px] text-[#e9e7de] no-underline transition-colors hover:text-accent">{{ l.label }}</a>
        </nav>
        <p class="font-mono text-sm text-[#9a9d90]">agenticopz.com</p>
      </div>
      <div class="flex flex-wrap justify-between gap-[10px] border-t border-line-dark pt-6 text-[13.5px] text-[#7c7f74]">
        <p>&copy; {{ year }} AgenticOpz. All rights reserved.</p>
        <p>Built for the trades.</p>
      </div>
    </div>
  </footer>
</template>
