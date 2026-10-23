<script setup>
/*
  Audit request form.
  NOTE: front-end acknowledgement only for now — wire the submit
  handler to the real inbox/CRM endpoint before launch.
*/
import { ref } from 'vue'
import { motion, AnimatePresence } from 'motion-v'
import Reveal from './Reveal.vue'

const submitted = ref(false)
const form = ref({ name: '', business: '', phone: '', email: '' })

const bullets = [
  'Test calls placed to your real business line',
  'A one-page written report within 2 business days',
  'No pitch deck, no obligation, no lock-in contract afterwards',
]

const inputCls =
  'mt-[7px] block w-full rounded-[10px] border border-line bg-paper px-[15px] py-[13px] font-sans text-base text-ink outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-ink-faint/70 focus:border-accent focus:shadow-[0_0_0_3px_rgba(255,90,31,0.16)]'
const labelCls = 'mb-4 block text-sm font-semibold text-ink-soft'

function onSubmit() {
  submitted.value = true
}
</script>

<template>
  <section id="audit" class="border-y border-line bg-paper-2 py-[76px] min-[961px]:py-[110px]">
    <div class="mx-auto max-w-[1180px] px-5 sm:px-7">
      <div class="grid grid-cols-1 items-start gap-12 min-[961px]:grid-cols-2 min-[961px]:gap-[70px]">
        <Reveal>
          <div>
            <p class="flex items-center gap-3 font-mono text-[12.5px] font-medium uppercase tracking-[0.18em] text-ink-faint">04 — Start here</p>
            <h2 class="my-6 font-display text-[clamp(34px,4vw,52px)] font-extrabold leading-[1.04] tracking-[-0.015em] text-ink">The free<br>Missed-Call Audit.</h2>
            <p class="mb-7 max-w-[480px] text-lg text-ink-soft">Before you spend a dollar: we test-call your business the way a customer would — after hours, at lunch, during a busy spell — and document what actually happens. You get a one-page report: where calls are being lost, and what it’s likely costing you. Yours to keep, whether we work together or not.</p>
            <ul class="list-none">
              <li v-for="b in bullets" :key="b" class="relative border-t border-line py-[13px] pl-[30px] text-[16.5px]">
                <span class="absolute left-[2px] font-bold text-accent-dark">&#10003;</span>{{ b }}
              </li>
            </ul>
          </div>
        </Reveal>

        <Reveal :delay="0.1">
          <!-- fixed min-height: the form/success swap never resizes the card -->
          <div class="relative min-h-[560px] rounded-[18px] border border-line bg-cream p-6 shadow-[0_24px_60px_-30px_rgba(20,21,15,0.22)] sm:p-8">
            <AnimatePresence mode="wait" :initial="false">
              <motion.form
                v-if="!submitted"
                key="form"
                @submit.prevent="onSubmit"
                :initial="{ opacity: 0 }"
                :animate="{ opacity: 1 }"
                :exit="{ opacity: 0, y: -10, transition: { duration: 0.2 } }"
                :transition="{ duration: 0.3 }"
              >
                <p class="mb-[22px] font-display text-[21px] font-bold text-ink">Request your audit</p>
                <label :class="labelCls">Your name
                  <input v-model="form.name" type="text" required autocomplete="name" placeholder="Mike Richmond" :class="inputCls">
                </label>
                <label :class="labelCls">Business name
                  <input v-model="form.business" type="text" required autocomplete="organization" placeholder="Richmond’s Air" :class="inputCls">
                </label>
                <label :class="labelCls">Business phone (the line we should test)
                  <input v-model="form.phone" type="tel" required autocomplete="tel" placeholder="(214) 555-0147" :class="inputCls">
                </label>
                <label :class="labelCls">Work email
                  <input v-model="form.email" type="email" required autocomplete="email" placeholder="mike@richmondsair.com" :class="inputCls">
                </label>
                <motion.button
                  type="submit"
                  class="mt-2 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-transparent bg-accent px-7 py-[15px] text-base font-semibold text-cream shadow-[0_12px_26px_-12px_rgba(255,90,31,0.55)] transition-colors hover:bg-accent-dark"
                  :whileHover="{ scale: 1.015 }"
                  :whileTap="{ scale: 0.98 }"
                  :transition="{ type: 'spring', stiffness: 400, damping: 22 }"
                >Send my free audit request</motion.button>
                <p class="mt-[14px] text-center text-[13.5px] text-ink-faint">We reply from a real person within one business day.</p>
              </motion.form>

              <motion.div
                v-else
                key="success"
                class="absolute inset-0 flex flex-col items-center justify-center px-8 text-center"
                :initial="{ opacity: 0, y: 14, scale: 0.99 }"
                :animate="{ opacity: 1, y: 0, scale: 1 }"
                :transition="{ type: 'spring', stiffness: 160, damping: 22 }"
              >
                <span class="mb-5 grid h-14 w-14 place-items-center rounded-full bg-chip-green-bg text-[26px] font-bold text-chip-green-text">&#10003;</span>
                <h3 class="mb-[10px] font-display text-[22px] font-bold text-ink">Request received.</h3>
                <p class="max-w-[340px] text-base text-ink-soft">Thanks — a real person will reply within one business day to arrange your test calls.</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
</template>
