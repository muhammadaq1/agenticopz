<script setup>
import Reveal from './Reveal.vue'

const items = [
  {
    title: 'After hours',
    text: 'Evenings, weekends and holidays are when breakdowns happen — and when most shops are dark. Every one of those calls currently ends at a recording.',
    icon: 'moon',
  },
  {
    title: 'Mid-job',
    text: 'Peak season means every tech is on a roof or under a house. The office line rolls to voicemail precisely when call volume is highest.',
    icon: 'tool',
  },
  {
    title: 'Overflow',
    text: 'Two calls at once means one caller hears a busy signal or a ring that never ends. They don’t call back. They call your competitor.',
    icon: 'phoneoff',
  },
]

const log = [
  { time: '8:04 PM', note: 'AC out, 94° in the house', outcome: 'Voicemail' },
  { time: '8:41 PM', note: 'Water heater leaking', outcome: 'Hung up' },
  { time: '9:17 PM', note: 'Furnace won’t start', outcome: 'Called a competitor' },
]
</script>

<template>
  <section id="problem" class="relative overflow-hidden border-t border-line bg-paper-2 py-[76px] min-[961px]:py-[110px]">
    <span aria-hidden="true" class="pointer-events-none absolute -top-8 right-2 select-none font-display text-[200px] font-extrabold leading-none text-ink/[0.05] min-[961px]:text-[260px]">01</span>
    <div class="relative mx-auto max-w-[1180px] px-5 sm:px-7">
      <Reveal>
        <div class="mb-[54px]">
          <p class="mb-5 flex items-center gap-3 font-mono text-[12.5px] font-medium uppercase tracking-[0.18em] text-ink-faint">01 — The problem</p>
          <h2 class="font-display text-[clamp(34px,4vw,52px)] font-extrabold leading-[1.04] tracking-[-0.015em] text-ink">Voicemail is where<br>jobs go to <em class="not-italic text-accent">die.</em></h2>
        </div>
      </Reveal>
      <Reveal :delay="0.08">
        <div class="grid grid-cols-1 gap-12 min-[961px]:grid-cols-2 min-[961px]:gap-[70px]">
          <div>
            <div class="text-[19px] text-ink-soft">
              <p class="mb-[22px] max-w-[480px] font-medium text-ink">When a homeowner’s AC dies at 8 PM, they don’t leave a message and wait. They call the next company on Google. The job is gone in the ninety seconds your phone rings out.</p>
              <p class="max-w-[480px]">It isn’t an effort problem — your office can’t be staffed at midnight, and your techs can’t answer from a crawlspace. It’s a coverage problem. And coverage is exactly what software is good at.</p>
            </div>
            <!-- illustrative missed-call log -->
            <div class="mt-9 max-w-[480px] rounded-[18px] bg-[linear-gradient(120deg,#171812,#26281d)] p-5 text-cream shadow-[0_24px_50px_-28px_rgba(20,21,15,0.55)] ring-1 ring-white/10">
              <p class="font-mono text-[11px] uppercase tracking-[0.16em] text-white/50">Illustrative — one Saturday evening</p>
              <ul class="mt-4 list-none">
                <li v-for="row in log" :key="row.time" class="flex items-baseline gap-3 border-t border-white/10 py-3 text-[14.5px] first:border-t-0 first:pt-0 last:pb-0">
                  <span class="shrink-0 font-mono text-[12.5px] text-white/55">{{ row.time }}</span>
                  <span class="min-w-0 flex-1">{{ row.note }}</span>
                  <span class="shrink-0 font-semibold text-accent">{{ row.outcome }}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="flex flex-col gap-4">
            <article v-for="item in items" :key="item.title" class="rounded-[18px] border border-line bg-cream p-6 shadow-[0_18px_40px_-28px_rgba(20,21,15,0.3)]">
              <span class="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent-dark ring-1 ring-accent/20">
                <svg v-if="item.icon === 'moon'" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" /></svg>
                <svg v-else-if="item.icon === 'tool'" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.7 6.3a4.5 4.5 0 0 0-6.4 6.4L3 18l3 3 5.3-5.3a4.5 4.5 0 0 0 6.4-6.4l-2.6 2.6-2.4-.7-.7-2.4 2.7-2.5z" /></svg>
                <svg v-else class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.68 13.31a16 16 0 0 0 3.41 2.64l2.24-2.24a1 1 0 0 1 1.01-.24c1.1.36 2.3.57 3.55.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.4 21 3 13.6 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.55a1 1 0 0 1-.25 1.01l-2.24 2.24z" /><line x1="22" y1="2" x2="2" y2="22" /></svg>
              </span>
              <h3 class="mb-2 font-display text-xl font-bold text-ink">{{ item.title }}</h3>
              <p class="text-base leading-[1.6] text-ink-soft">{{ item.text }}</p>
            </article>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
</template>
