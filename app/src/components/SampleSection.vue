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
  <section id="sample" class="py-[76px] min-[961px]:py-[110px]">
    <div class="mx-auto max-w-[1180px] px-5 sm:px-7">
      <div class="grid grid-cols-1 items-start gap-12 min-[961px]:grid-cols-2 min-[961px]:gap-[70px]">
        <Reveal>
          <div>
            <div class="mb-[54px]">
              <p class="mb-5 flex items-center gap-3 font-mono text-[12.5px] font-medium uppercase tracking-[0.18em] text-ink-faint">03 — Sample call</p>
              <h2 class="font-display text-[clamp(34px,4vw,52px)] font-extrabold leading-[1.04] tracking-[-0.015em] text-ink">It doesn’t sound like a robot.<br>It sounds like your best CSR.</h2>
            </div>
            <p class="mb-[30px] text-lg text-ink-soft">Callers want one thing: to feel heard and get booked. The AI listens, asks the questions your team would ask, and never puts anyone on hold. If a caller asks for a human, or the situation is sensitive, the call is transferred to you or your on-call — instantly.</p>
            <ul class="list-none">
              <li v-for="p in points" :key="p.strong" class="border-t border-line py-[18px] text-[16.5px] text-ink-soft last:border-b">
                <strong class="text-ink">{{ p.strong }}</strong>{{ p.text }}
              </li>
            </ul>
          </div>
        </Reveal>
        <Reveal :delay="0.1">
          <div class="rounded-[18px] border border-line bg-cream p-5 shadow-[0_24px_60px_-30px_rgba(20,21,15,0.25)] sm:p-[26px]">
            <p class="border-b border-line pb-4 font-mono text-[12.5px] uppercase tracking-[0.12em] text-ink-faint">Sample call — water heater, Saturday 9:41 PM</p>
            <div class="flex flex-col gap-[14px] pb-[6px] pt-[18px]">
              <div v-for="(line, i) in lines" :key="i" class="flex gap-3 text-[15px] leading-[1.55]">
                <span
                  class="mt-[2px] h-fit shrink-0 rounded-[5px] px-[7px] py-[3px] font-mono text-[10.5px] font-medium tracking-[0.1em]"
                  :class="line.who === 'ai' ? 'bg-ink text-cream' : 'border border-line bg-paper-2 text-ink-soft'"
                >{{ line.who === 'ai' ? 'AI' : 'CALLER' }}</span>
                <p :class="line.who === 'caller' ? 'text-ink-soft' : ''">{{ line.text }}</p>
              </div>
            </div>
            <p class="pt-3 text-[12.5px] text-ink-faint">Sample conversation, written from real call patterns in the trades.</p>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
</template>
