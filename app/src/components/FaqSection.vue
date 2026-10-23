<script setup>
import Reveal from './Reveal.vue'

const faqs = [
  {
    q: 'Will my customers know it’s an AI?',
    a: 'Yes — and that’s deliberate. Your receptionist introduces itself as your virtual assistant. Callers don’t mind who answers; they mind whether someone answers, understands the problem, and books the job. Honesty also keeps you on the right side of disclosure rules in the US and EU.',
  },
  {
    q: 'What happens when a caller needs a human?',
    a: 'The call transfers to you, your office, or your on-call technician — based on rules you set. Emergencies, upset callers, and anything outside the script are escalated immediately, with a summary texted to you either way.',
  },
  {
    q: 'Do I need to change my phone number?',
    a: 'No. We connect to your existing business line and carrier. Your number, your Google listing, your trucks — nothing changes for your customers except that the phone always gets answered.',
  },
  {
    q: 'How long does setup take?',
    a: 'Most shops are live within a week of the kickoff call. We train the AI on your services and rules, test it against real call scenarios with you, and only go live when you approve how it sounds.',
  },
  {
    q: 'Is there a long-term contract?',
    a: 'No lock-in. The service runs month to month after setup. If it isn’t booking you jobs, you shouldn’t be paying for it — and you won’t be trapped into it.',
  },
]
</script>

<template>
  <section id="faq" class="py-[76px] min-[961px]:py-[110px]">
    <div class="mx-auto max-w-[820px] px-5 sm:px-7">
      <Reveal>
        <div class="mb-[54px]">
          <p class="mb-5 flex items-center gap-3 font-mono text-[12.5px] font-medium uppercase tracking-[0.18em] text-ink-faint">05 — Questions</p>
          <h2 class="font-display text-[clamp(34px,4vw,52px)] font-extrabold leading-[1.04] tracking-[-0.015em] text-ink">Asked by owners like you.</h2>
        </div>
      </Reveal>
      <Reveal :delay="0.08">
        <div>
          <details v-for="f in faqs" :key="f.q" class="group border-t border-line last:border-b">
            <summary class="relative cursor-pointer list-none py-6 pr-10 font-display text-[19px] font-bold text-ink [&::-webkit-details-marker]:hidden">
              {{ f.q }}
              <span class="absolute right-1 top-[22px] text-2xl font-medium text-accent-dark transition-transform duration-200 group-open:rotate-45">+</span>
            </summary>
            <p class="max-w-[680px] pb-[26px] pr-10 text-[16.5px] text-ink-soft">{{ f.a }}</p>
          </details>
        </div>
      </Reveal>
    </div>
  </section>
</template>
