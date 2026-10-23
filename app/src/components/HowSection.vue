<script setup>
import Reveal from './Reveal.vue'

const steps = [
  {
    n: 'Step 1',
    title: 'We learn your business',
    text: 'Services, pricing ranges, service area, scheduling rules, the questions you always ask. Your AI is trained on your shop — not a generic script.',
  },
  {
    n: 'Step 2',
    title: 'Your number, answered',
    text: 'We connect to your existing business line. Your AI answers on the first ring, in a natural voice, and identifies itself honestly as your virtual receptionist.',
  },
  {
    n: 'Step 3',
    title: 'Jobs land on your calendar',
    text: 'Appointments booked, emergencies triaged and escalated to your on-call tech, and a plain-English summary of every call texted straight to you.',
  },
]

const handles = [
  'New service bookings',
  'Emergency call triage',
  'After-hours & weekend coverage',
  'Overflow when lines are busy',
  'Quote & estimate requests',
  'Missed-call text-back',
  'Appointment confirmations',
  'Call summaries to your phone',
]
</script>

<template>
  <section id="how" class="bg-dark py-[76px] text-[#e9e7de] min-[961px]:py-[110px]">
    <div class="mx-auto max-w-[1180px] px-5 sm:px-7">
      <Reveal>
        <div class="mb-[54px]">
          <p class="mb-5 flex items-center gap-3 font-mono text-[12.5px] font-medium uppercase tracking-[0.18em] text-[#9a9d90]">02 — How it works</p>
          <h2 class="font-display text-[clamp(34px,4vw,52px)] font-extrabold leading-[1.04] tracking-[-0.015em] text-cream">Live in days.<br>Not a software project.</h2>
        </div>
      </Reveal>
      <Reveal :delay="0.08">
        <div class="grid grid-cols-1 border-t border-line-dark min-[961px]:grid-cols-3">
          <article
            v-for="(s, i) in steps"
            :key="s.n"
            class="border-b border-line-dark py-10 pr-[34px]"
            :class="i > 0 ? 'min-[961px]:border-l min-[961px]:pl-[34px]' : ''"
          >
            <p class="mb-[18px] font-mono text-[12.5px] uppercase tracking-[0.16em] text-accent">{{ s.n }}</p>
            <h3 class="mb-3 font-display text-xl font-bold text-cream">{{ s.title }}</h3>
            <p class="text-base text-[#b9bbb0]">{{ s.text }}</p>
          </article>
        </div>
      </Reveal>
      <Reveal :delay="0.12">
        <div class="mt-16">
          <p class="mb-[22px] font-mono text-[12.5px] uppercase tracking-[0.16em] text-[#9a9d90]">What your front desk handles</p>
          <ul class="flex list-none flex-wrap gap-[10px]">
            <li v-for="h in handles" :key="h" class="rounded-full border border-line-dark bg-dark-2 px-[18px] py-[9px] text-[15px] text-[#e9e7de]">{{ h }}</li>
          </ul>
        </div>
      </Reveal>
    </div>
  </section>
</template>
