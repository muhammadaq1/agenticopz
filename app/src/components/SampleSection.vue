<script setup>
import Reveal from './Reveal.vue'

const points = [
  { strong: 'Answers in under a second.', text: ' No phone tree, no “press 1.”' },
  { strong: 'Knows your rules.', text: ' Service area, booking windows, emergency definitions — yours.' },
  { strong: 'Honest by design.', text: ' It introduces itself as your virtual receptionist. No deception, ever.' },
]

const lines = [
  { who: 'ai', text: 'Thanks for calling Manzo Plumbing, this is Ava. How can I help?' },
  { who: 'caller', text: 'There’s water all over my garage floor. I think the water heater burst.' },
  { who: 'ai', text: 'Let’s stop the water first — the shut-off valve is on the wall above the heater. Turn it clockwise. I’ll stay on the line.' },
  { who: 'caller', text: 'Okay… got it. Water’s stopping.' },
  { who: 'ai', text: 'Good. I’ve flagged this as an emergency and alerted our on-call plumber — he’ll call you back within 15 minutes to arrange tonight’s visit.' },
]
</script>

<template>
  <section id="sample" class="relative overflow-hidden border-t border-line py-[76px] min-[961px]:py-[110px]">
    <span aria-hidden="true" class="pointer-events-none absolute -top-8 right-2 select-none font-display text-[200px] font-extrabold leading-none text-ink/[0.05] min-[961px]:text-[260px]">03</span>
    <div class="relative mx-auto max-w-[1180px] px-5 sm:px-7">
      <div class="grid grid-cols-1 items-start gap-12 min-[961px]:grid-cols-2 min-[961px]:gap-[70px]">
        <Reveal>
          <div>
            <div class="mb-[54px]">
              <p class="mb-5 flex items-center gap-3 font-mono text-[12.5px] font-medium uppercase tracking-[0.18em] text-ink-faint">03 — Sample call</p>
              <h2 class="font-display text-[clamp(34px,4vw,52px)] font-extrabold leading-[1.04] tracking-[-0.015em] text-ink">It doesn’t sound like a robot.<br>It sounds like your <em class="not-italic text-accent">best CSR.</em></h2>
            </div>
            <p class="mb-[30px] text-lg text-ink-soft">Callers want one thing: to feel heard and get booked. The AI listens, asks the questions your team would ask, and never puts anyone on hold. If a caller asks for a human, or the situation is sensitive, the call is transferred to you or your on-call — instantly.</p>
            <ul class="list-none">
              <li v-for="p in points" :key="p.strong" class="flex gap-3 border-t border-line py-[18px] text-[16.5px] text-ink-soft last:border-b">
                <span class="shrink-0 font-bold text-accent-dark">&#10003;</span>
                <span><strong class="text-ink">{{ p.strong }}</strong>{{ p.text }}</span>
              </li>
            </ul>
          </div>
        </Reveal>
        <Reveal :delay="0.1">
          <div class="rounded-[20px] bg-[linear-gradient(140deg,#171812,#23241a)] p-5 text-cream shadow-[0_30px_70px_-28px_rgba(20,21,15,0.55)] ring-1 ring-white/10 sm:p-6">
            <div class="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
              <span class="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.14em] text-white/75">
                <span class="h-2 w-2 rounded-full bg-accent"></span>Live transcript
              </span>
              <span class="font-mono text-[12px] text-white/45">Saturday · 9:41 PM</span>
            </div>
            <div class="flex flex-col gap-[14px] pb-[6px] pt-[18px]">
              <div v-for="(line, i) in lines" :key="i" class="flex gap-3 text-[15px] leading-[1.55]">
                <span
                  class="mt-[2px] h-fit shrink-0 rounded-[5px] px-[7px] py-[3px] font-mono text-[10.5px] font-medium tracking-[0.1em]"
                  :class="line.who === 'ai' ? 'bg-accent text-cream' : 'border border-white/20 text-white/70'"
                >{{ line.who === 'ai' ? 'AI' : 'CALLER' }}</span>
                <p :class="line.who === 'caller' ? 'text-white/65' : ''">{{ line.text }}</p>
              </div>
            </div>
            <div class="mt-2 flex flex-wrap gap-2 border-t border-white/10 pt-4">
              <span class="rounded-full border border-white/15 bg-white/5 px-3 py-[5px] text-[13px] font-semibold text-white/85">&#10003; Emergency flagged</span>
              <span class="rounded-full border border-white/15 bg-white/5 px-3 py-[5px] text-[13px] font-semibold text-white/85">&#10003; On-call plumber alerted</span>
            </div>
            <p class="pt-3 text-[12.5px] text-white/45">Sample conversation, written from real call patterns in the trades.</p>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
</template>
