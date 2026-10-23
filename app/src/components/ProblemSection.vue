<script setup>
import Reveal from './Reveal.vue'

const items = [
  {
    title: 'After hours',
    text: 'Evenings, weekends and holidays are when breakdowns happen — and when most shops are dark. Every one of those calls currently ends at a recording.',
  },
  {
    title: 'Mid-job',
    text: 'Peak season means every tech is on a roof or under a house. The office line rolls to voicemail precisely when call volume is highest.',
  },
  {
    title: 'Overflow',
    text: 'Two calls at once means one caller hears a busy signal or a ring that never ends. They don’t call back. They call your competitor.',
  },
]
</script>

<template>
  <section id="problem" class="py-[76px] min-[961px]:py-[110px]">
    <div class="mx-auto max-w-[1180px] px-5 sm:px-7">
      <Reveal>
        <div class="mb-[54px]">
          <p class="mb-5 flex items-center gap-3 font-mono text-[12.5px] font-medium uppercase tracking-[0.18em] text-ink-faint">01 — The problem</p>
          <h2 class="font-display text-[clamp(34px,4vw,52px)] font-extrabold leading-[1.04] tracking-[-0.015em] text-ink">Voicemail is where<br>jobs go to die.</h2>
        </div>
      </Reveal>
      <Reveal :delay="0.08">
        <div class="grid grid-cols-1 gap-12 min-[961px]:grid-cols-2 min-[961px]:gap-[70px]">
          <div class="text-[19px] text-ink-soft">
            <p class="mb-[22px] max-w-[480px] font-medium text-ink">When a homeowner’s AC dies at 8 PM, they don’t leave a message and wait. They call the next company on Google. The job is gone in the ninety seconds your phone rings out.</p>
            <p class="max-w-[480px]">It isn’t an effort problem — your office can’t be staffed at midnight, and your techs can’t answer from a crawlspace. It’s a coverage problem. And coverage is exactly what software is good at.</p>
          </div>
          <ul class="list-none">
            <li v-for="item in items" :key="item.title" class="border-t border-line py-[26px] last:border-b">
              <h3 class="mb-2 font-display text-xl font-bold text-ink">{{ item.title }}</h3>
              <p class="text-base text-ink-soft">{{ item.text }}</p>
            </li>
          </ul>
        </div>
      </Reveal>
    </div>
  </section>
</template>
