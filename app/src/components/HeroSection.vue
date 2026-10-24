<script setup>
import { ref } from 'vue'
import { motion } from 'motion-v'
import CallPlayer from './CallPlayer.vue'

const player = ref(null)

function hearSample() {
  // The anchor scrolls to the card; start playback just after.
  setTimeout(() => player.value && player.value.play(), 500)
}

const trades = ['HVAC', 'Plumbing', 'Roofing', 'Electrical', 'Garage Doors', 'Appliance Repair']

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { type: 'spring', stiffness: 80, damping: 19, mass: 0.9, delay },
})
</script>

<template>
  <section class="dot-grid border-b border-line">
    <div class="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-12 px-5 pb-16 pt-14 sm:px-7 min-[961px]:grid-cols-[1.08fr_0.92fr] min-[961px]:gap-16">
      <div>
        <motion.p v-bind="fadeUp(0)" class="mb-[26px]">
          <span class="inline-flex items-center gap-2.5 rounded-full border border-ink/10 bg-cream/80 py-1.5 pl-3 pr-4 font-mono text-[11.5px] font-medium uppercase tracking-[0.18em] text-ink-soft shadow-[0_1px_2px_rgba(20,21,15,0.05)]">
            <span class="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"></span>AI Front Desk
          </span>
        </motion.p>
        <motion.h1 v-bind="fadeUp(0.08)" class="font-display text-[clamp(34px,3.4vw,50px)] font-extrabold leading-[1.04] tracking-[-0.015em] text-ink">
          Your phone rings once.<br><em class="not-italic text-accent">The job gets booked.</em>
        </motion.h1>
        <motion.p v-bind="fadeUp(0.16)" class="mt-6 max-w-[520px] text-[17.5px] leading-[1.6] text-ink-soft">
          An AI receptionist for HVAC, plumbing, roofing and electrical shops. It answers on the first ring — nights, weekends, mid-job — books the work into your calendar, and texts you the details.
        </motion.p>
        <motion.div v-bind="fadeUp(0.24)" class="mt-[38px] flex flex-wrap gap-[14px]">
          <motion.a
            href="#audit"
            class="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-[15px] text-base font-semibold text-cream no-underline shadow-[0_12px_26px_-12px_rgba(255,90,31,0.55)] transition-colors hover:bg-accent-dark"
            :whileHover="{ scale: 1.03 }"
            :whileTap="{ scale: 0.97 }"
            :transition="{ type: 'spring', stiffness: 400, damping: 22 }"
          >Get your free Missed-Call Audit</motion.a>
          <motion.a
            href="#demo"
            class="inline-flex items-center gap-2 rounded-full border border-ink bg-transparent px-7 py-[15px] text-base font-semibold text-ink no-underline transition-colors hover:bg-ink hover:text-cream"
            :whileHover="{ scale: 1.03 }"
            :whileTap="{ scale: 0.97 }"
            :transition="{ type: 'spring', stiffness: 400, damping: 22 }"
            @click="hearSample"
          >Hear a sample call</motion.a>
        </motion.div>
        <motion.p v-bind="fadeUp(0.32)" class="mt-5 max-w-[460px] text-[14.5px] text-ink-faint">
          Free audit: we test-call your business and show you exactly what your callers experience today.
        </motion.p>
      </div>

      <motion.div
        class="relative"
        :initial="{ opacity: 0, y: 30, scale: 0.985 }"
        :animate="{ opacity: 1, y: 0, scale: 1 }"
        :transition="{ type: 'spring', stiffness: 70, damping: 19, mass: 1, delay: 0.18 }"
      >
        <!-- warm light field behind the glass card (decorative) -->
        <div class="pointer-events-none absolute right-0 -top-10 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(255,90,31,0.30),rgba(255,150,60,0.10),transparent)] blur-2xl" aria-hidden="true"></div>
        <div class="pointer-events-none absolute -bottom-10 left-0 h-64 w-64 rounded-full bg-[radial-gradient(closest-side,rgba(20,21,15,0.13),transparent)] blur-2xl" aria-hidden="true"></div>
        <div class="relative">
          <CallPlayer ref="player" />
        </div>
      </motion.div>
    </div>

    <div class="mx-auto max-w-[1180px] px-5 sm:px-7">
      <div class="flex flex-wrap items-center gap-[22px] border-t border-line py-[22px] pb-[26px] font-mono text-[12.5px] tracking-[0.16em] text-ink-faint" aria-label="Trades we serve">
        <template v-for="(t, i) in trades" :key="t">
          <span>{{ t.toUpperCase() }}</span>
          <i v-if="i < trades.length - 1" class="inline-block h-1 w-1 rounded-full bg-accent"></i>
        </template>
      </div>
    </div>
  </section>
</template>
