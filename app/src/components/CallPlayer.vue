<script setup>
/*
  Interactive sample-call player.

  Layout-stability contract:
  - The stage area has a FIXED height at every breakpoint, and the
    idle/connecting panel and the live panel are absolutely stacked
    inside it. Panels crossfade with Motion (transform + opacity),
    so the card's outer box never changes size and nothing else on
    the page can move while the call plays.
  - Transcript lines, chips and controls animate with springs on
    transform/opacity only.
*/
import { ref, computed, onBeforeUnmount } from 'vue'
import { motion, AnimatePresence } from 'motion-v'

const LINES = [
  { who: 'ai', text: 'Thanks for calling Richmond’s Air, this is Ava. How can I help?' },
  { who: 'caller', text: 'Hi — our AC stopped cooling. It’s 91 in the house.' },
  { who: 'ai', text: 'Sorry to hear that. I can get a tech out today between 2 and 4 PM. Shall I book it?' },
  { who: 'caller', text: 'Yes please, that works.' },
  { who: 'ai', text: 'Done — you’re booked for 2 to 4 PM. A confirmation text is on its way.' },
]

const REDUCED =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
const T = (ms) => (REDUCED ? Math.min(ms, 160) : ms)

const LINE_DELAYS = [300, 2100, 4500, 6600, 8900]
const DIAL_MS = 950
const RING_MS = 1050

const state = ref('idle') // idle | connecting | live | ended
const dialPhase = ref('Dialing')
const visibleLines = ref(0)
const showOutcome = ref(false)
const seconds = ref(0)

let timers = []
let clock = null

const timerText = computed(() => {
  const s = seconds.value
  return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0')
})

const statusText = computed(() => {
  if (state.value === 'connecting') return 'CONNECTING'
  if (state.value === 'live') return 'LIVE CALL'
  if (state.value === 'ended') return 'CALL ENDED'
  return 'SAMPLE CALL'
})

const statusColor = computed(() => {
  if (state.value === 'connecting') return 'text-[#b97a12]'
  if (state.value === 'live') return 'text-accent-dark'
  return 'text-ink-faint'
})

function later(fn, ms) {
  timers.push(setTimeout(fn, T(ms)))
}
function clearTimers() {
  timers.forEach(clearTimeout)
  timers = []
  if (clock) {
    clearInterval(clock)
    clock = null
  }
}

function startCall() {
  if (state.value === 'connecting' || state.value === 'live') return
  clearTimers()
  visibleLines.value = 0
  showOutcome.value = false
  seconds.value = 0
  dialPhase.value = 'Dialing'
  state.value = 'connecting'
  later(() => { dialPhase.value = 'Ringing' }, DIAL_MS)
  later(goLive, DIAL_MS + RING_MS)
}

function goLive() {
  state.value = 'live'
  clock = setInterval(() => { seconds.value++ }, 1000)
  LINE_DELAYS.forEach((d, i) => {
    later(() => { visibleLines.value = i + 1 }, d)
  })
  const last = LINE_DELAYS[LINE_DELAYS.length - 1]
  later(() => { showOutcome.value = true }, last + 1500)
  later(() => { endCall() }, last + 1500 + 2200)
}

function endCall() {
  if (state.value === 'ended') return
  clearTimers()
  state.value = 'ended'
}

function replay() {
  state.value = 'idle'
  startCall()
}

onBeforeUnmount(clearTimers)

defineExpose({ play: startCall })

const springLine = { type: 'spring', stiffness: 210, damping: 24, mass: 0.85 }
const springPop = { type: 'spring', stiffness: 380, damping: 21 }
const panelTransition = { type: 'spring', stiffness: 170, damping: 24 }
</script>

<template>
  <div
    id="demo"
    class="rounded-[22px] border border-white/60 bg-[linear-gradient(140deg,rgba(255,253,249,0.82),rgba(255,253,249,0.45)_55%,rgba(255,246,238,0.55))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-1px_0_rgba(20,21,15,0.04),0_30px_70px_-24px_rgba(20,21,15,0.38)] ring-1 ring-ink/[0.05] backdrop-blur-[18px] backdrop-saturate-150 sm:p-5 sm:pb-4"
  >
    <!-- header: status + timer (fixed height, never shifts) -->
    <div class="flex items-center justify-between border-b border-ink/[0.08] pb-3">
      <span
        class="inline-flex items-center gap-[9px] font-mono text-xs font-medium tracking-[0.14em] transition-colors duration-300"
        :class="statusColor"
        aria-live="polite"
      >
        <span
          class="h-2 w-2 shrink-0 rounded-full transition-colors duration-300"
          :class="{
            'bg-ink-faint': state === 'idle' || state === 'ended',
            'bg-amber-dot animate-blink': state === 'connecting',
            'bg-accent animate-pulse-ring': state === 'live',
          }"
        ></span>
        {{ statusText }}
        <!-- equalizer: fixed-size slot, fades in only while live -->
        <span class="inline-flex h-[13px] w-[22px] items-end gap-[2.5px] transition-opacity duration-300" :class="state === 'live' ? 'opacity-100' : 'opacity-0'" aria-hidden="true">
          <i class="eq-bar block w-[3px] rounded-sm bg-accent h-full" style="animation-duration:0.9s"></i>
          <i class="eq-bar block w-[3px] rounded-sm bg-accent h-full" style="animation-duration:0.7s; animation-delay:0.12s"></i>
          <i class="eq-bar block w-[3px] rounded-sm bg-accent h-full" style="animation-duration:1.1s; animation-delay:0.24s"></i>
          <i class="eq-bar block w-[3px] rounded-sm bg-accent h-full" style="animation-duration:0.8s; animation-delay:0.36s"></i>
        </span>
      </span>
      <span class="font-mono text-[13px] text-ink-faint tabular-nums">{{ timerText }}</span>
    </div>

    <!-- Stage height: an invisible in-flow sizer mirrors the tallest
         state (the finished call) at the current viewport width, so the
         card is always exactly tall enough — the animated panels stack
         absolutely on top of it and can never overflow or overlap,
         on any screen size. -->
    <div class="relative">
      <div class="invisible" aria-hidden="true">
        <div class="pt-3">
          <div class="flex items-center gap-3 rounded-2xl px-4 py-[10px]">
            <span class="grid h-9 w-9 shrink-0 place-items-center rounded-full"></span>
            <div class="min-w-0">
              <p class="truncate text-[15.5px] font-semibold leading-[1.3]"><span class="hidden min-[480px]:inline">Incoming call — </span>(214) 555-0147</p>
              <p class="mt-[1px] text-[12.5px] leading-[1.35]">Richmond’s Air · Dallas, TX</p>
            </div>
            <span class="ml-auto hidden shrink-0 px-[10px] py-[5px] font-mono text-[10px] font-medium tracking-[0.14em] min-[420px]:inline-block">INCOMING</span>
          </div>
        </div>
        <div class="flex flex-col gap-[10px] pt-3">
          <div v-for="(line, i) in LINES" :key="'sizer-' + i" class="flex gap-3 text-[14.5px] leading-[1.5]">
            <span class="mt-[2px] h-fit shrink-0 rounded-[5px] px-[7px] py-[3px] font-mono text-[10.5px] font-medium tracking-[0.1em]">{{ line.who === 'ai' ? 'AI' : 'CALLER' }}</span>
            <p>{{ line.text }}</p>
          </div>
        </div>
        <div>
          <div class="min-h-[34px] border-t border-dashed pt-3">
            <div class="flex flex-wrap gap-2">
              <span class="rounded-full border px-3 py-[5px] text-[13px] font-semibold">&#10003; Appointment booked — Today, 2:00–4:00 PM</span>
              <span class="rounded-full border px-3 py-[5px] text-[13px] font-semibold">&#10003; Summary texted to owner</span>
            </div>
          </div>
          <div class="flex h-[38px] items-center gap-[10px] pt-1.5">
            <span class="inline-flex items-center px-[18px] py-[9px] text-sm font-semibold">End call</span>
          </div>
        </div>
        <div class="h-[6px]"></div>
      </div>

      <AnimatePresence mode="wait" :initial="false">
        <!-- ===== idle / connecting panel ===== -->
        <motion.div
          v-if="state === 'idle' || state === 'connecting'"
          key="stage"
          class="absolute inset-0 flex flex-col items-center justify-center text-center"
          :initial="{ opacity: 0, y: 14 }"
          :animate="{ opacity: 1, y: 0 }"
          :exit="{ opacity: 0, y: -12, transition: { duration: 0.22, ease: 'easeIn' } }"
          :transition="panelTransition"
        >
          <motion.button
            id="playBtn"
            type="button"
            class="relative grid h-[72px] w-[72px] place-items-center rounded-full border-none text-cream shadow-[0_18px_36px_-12px_rgba(255,90,31,0.55)] transition-colors duration-300"
            :class="state === 'connecting' ? 'bg-ink shadow-[0_18px_36px_-14px_rgba(20,21,15,0.5)]' : 'bg-accent cursor-pointer'"
            :whileHover="state === 'idle' ? { scale: 1.06 } : {}"
            :whileTap="state === 'idle' ? { scale: 0.96 } : {}"
            :transition="{ type: 'spring', stiffness: 320, damping: 19 }"
            :aria-label="state === 'connecting' ? 'Connecting' : 'Play sample call'"
            @click="startCall"
          >
            <span class="pointer-events-none absolute inset-0" aria-hidden="true">
              <i class="absolute inset-0 rounded-full border-[1.5px] not-italic"
                 :class="state === 'connecting' ? 'border-ink/35 play-ring-fast' : 'border-accent/50 play-ring'"></i>
              <i class="absolute inset-0 rounded-full border-[1.5px] not-italic"
                 :class="state === 'connecting' ? 'border-ink/35 play-ring-fast' : 'border-accent/50 play-ring'"
                 :style="{ animationDelay: state === 'connecting' ? '0.55s' : '1.3s' }"></i>
            </span>
            <svg v-if="state === 'idle'" class="relative z-[2] ml-1 h-[34px] w-[34px]" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.5 5.75v12.5c0 .8.9 1.3 1.6.9l10-6.25c.6-.4.6-1.4 0-1.8l-10-6.25c-.7-.4-1.6.1-1.6.9z" fill="currentColor"/></svg>
            <svg v-else class="animate-ring-shake relative z-[2] h-[32px] w-[32px]" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 11.4 11.4 0 0 0 3.57.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.4 21 3 13.6 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z" fill="currentColor"/></svg>
          </motion.button>

          <!-- fixed-height text slot: title/sub crossfade with the dialing label -->
          <div class="relative mt-5 h-[74px] w-full">
            <AnimatePresence mode="wait" :initial="false">
              <motion.div
                v-if="state === 'idle'"
                key="idle-text"
                class="absolute inset-0"
                :initial="{ opacity: 0, y: 8 }"
                :animate="{ opacity: 1, y: 0 }"
                :exit="{ opacity: 0, y: -6, transition: { duration: 0.18 } }"
                :transition="{ duration: 0.3 }"
              >
                <p class="font-display text-lg font-bold">Hear it work a real call</p>
                <p class="mt-1.5 text-sm leading-[1.5] text-ink-faint">Richmond’s Air · Dallas, TX<br>AC stopped cooling · weeknight, 9:41 PM</p>
              </motion.div>
              <motion.p
                v-else
                key="dial-text"
                class="absolute inset-0 pt-2 font-mono text-sm uppercase tracking-[0.12em] text-ink-soft"
                :initial="{ opacity: 0, y: 8 }"
                :animate="{ opacity: 1, y: 0 }"
                :exit="{ opacity: 0, transition: { duration: 0.15 } }"
                :transition="{ duration: 0.3 }"
                aria-live="polite"
              >
                {{ dialPhase }}<span aria-hidden="true"><i class="dial-dot not-italic">.</i><i class="dial-dot not-italic" style="animation-delay:0.2s">.</i><i class="dial-dot not-italic" style="animation-delay:0.4s">.</i></span>
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>

        <!-- ===== live / ended panel ===== -->
        <motion.div
          v-else
          key="live"
          class="absolute inset-0 flex flex-col"
          :initial="{ opacity: 0, y: 16 }"
          :animate="{ opacity: 1, y: 0 }"
          :exit="{ opacity: 0, transition: { duration: 0.2 } }"
          :transition="panelTransition"
        >
          <div class="pt-3">
            <div class="flex items-center gap-3 rounded-2xl bg-[linear-gradient(120deg,#171812,#26281d)] px-4 py-[10px] text-cream shadow-[inset_0_1px_0_rgba(255,255,255,0.09),0_14px_28px_-14px_rgba(20,21,15,0.55)] ring-1 ring-white/10">
              <span class="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 ring-1 ring-white/15" aria-hidden="true">
                <svg class="h-5 w-5 text-accent" viewBox="0 0 24 24"><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 11.4 11.4 0 0 0 3.57.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.4 21 3 13.6 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z" fill="currentColor"/></svg>
              </span>
              <div class="min-w-0">
                <p class="truncate text-[15.5px] font-semibold leading-[1.3]"><span class="hidden min-[480px]:inline">Incoming call — </span>(214) 555-0147</p>
                <p class="mt-[1px] text-[12.5px] leading-[1.35] text-white/55">Richmond’s Air · Dallas, TX</p>
              </div>
              <span class="ml-auto hidden shrink-0 rounded-full bg-white/10 px-[10px] py-[5px] font-mono text-[10px] font-medium tracking-[0.14em] text-white/75 ring-1 ring-white/10 min-[420px]:inline-block">INCOMING</span>
            </div>
          </div>

          <div class="flex flex-col gap-[10px] pt-3">
            <AnimatePresence :initial="false">
              <motion.div
                v-for="(line, i) in LINES.slice(0, visibleLines)"
                :key="i"
                class="flex gap-3 text-[14.5px] leading-[1.5]"
                :initial="{ opacity: 0, y: 16, scale: 0.985 }"
                :animate="{ opacity: 1, y: 0, scale: 1 }"
                :transition="springLine"
              >
                <span
                  class="mt-[2px] h-fit shrink-0 rounded-[5px] px-[7px] py-[3px] font-mono text-[10.5px] font-medium tracking-[0.1em]"
                  :class="line.who === 'ai' ? 'bg-ink text-cream' : 'border border-line bg-paper-2 text-ink-soft'"
                >{{ line.who === 'ai' ? 'AI' : 'CALLER' }}</span>
                <p :class="line.who === 'caller' ? 'text-ink-soft' : ''">{{ line.text }}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <!-- outcome + controls pinned to the bottom of the fixed stage -->
          <div class="mt-auto">
            <div class="min-h-[34px] border-t border-dashed border-ink/[0.12] pt-3">
              <AnimatePresence :initial="false">
                <div v-if="showOutcome" key="outcome" class="flex flex-wrap gap-2">
                  <motion.span
                    class="rounded-full border border-chip-green-line bg-chip-green-bg px-3 py-[5px] text-[13px] font-semibold text-chip-green-text"
                    :initial="{ opacity: 0, y: 10, scale: 0.9 }"
                    :animate="{ opacity: 1, y: 0, scale: 1 }"
                    :transition="springPop"
                  >&#10003; Appointment booked — Today, 2:00–4:00 PM</motion.span>
                  <motion.span
                    class="rounded-full border border-line bg-paper-2 px-3 py-[5px] text-[13px] font-semibold text-ink-soft"
                    :initial="{ opacity: 0, y: 10, scale: 0.9 }"
                    :animate="{ opacity: 1, y: 0, scale: 1 }"
                    :transition="{ ...springPop, delay: 0.14 }"
                  >&#10003; Summary texted to owner</motion.span>
                </div>
              </AnimatePresence>
            </div>

            <div class="flex h-[38px] items-center gap-[10px] pt-1.5">
              <AnimatePresence mode="wait" :initial="false">
                <motion.button
                  v-if="state === 'live'"
                  key="end"
                  type="button"
                  class="inline-flex cursor-pointer items-center gap-2 rounded-full border-none bg-end px-[18px] py-[9px] text-sm font-semibold text-white transition-colors hover:bg-end-dark"
                  :initial="{ opacity: 0, scale: 0.9 }"
                  :animate="{ opacity: 1, scale: 1 }"
                  :exit="{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }"
                  :whileTap="{ scale: 0.96 }"
                  :transition="springPop"
                  @click="endCall"
                >
                  <svg class="h-[15px] w-[15px]" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 13.2c-3 0-6.1.8-8.6 2.3-.5.3-.7.9-.5 1.4l.9 2c.2.5.8.8 1.3.6 1.2-.4 2.3-1 3.3-1.7.4-.3.6-.8.5-1.3l-.4-1.7c1.3.3 2.8.5 4.5.5s3.2-.2 4.5-.5l-.4 1.7c-.1.5.1 1 .5 1.3 1 .7 2.1 1.3 3.3 1.7.5.2 1.1-.1 1.3-.6l.9-2c.2-.5 0-1.1-.5-1.4C18.1 14 15 13.2 12 13.2zM12 3C7.5 3 3.4 5.1 1 8.6c-.3.5-.2 1.1.2 1.5l1.6 1.4c.4.4 1 .4 1.5.1C6.6 10 9.2 9.2 12 9.2s5.4.8 7.7 2.4c.5.3 1.1.3 1.5-.1l1.6-1.4c.4-.4.5-1 .2-1.5C20.6 5.1 16.5 3 12 3z" fill="currentColor" transform="rotate(135 12 12)"/></svg>
                  End call
                </motion.button>
                <motion.button
                  v-else-if="state === 'ended'"
                  key="replay"
                  type="button"
                  class="inline-flex cursor-pointer items-center gap-[7px] rounded-full border border-ink bg-transparent px-[18px] py-[9px] text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-cream"
                  :initial="{ opacity: 0, scale: 0.9 }"
                  :animate="{ opacity: 1, scale: 1 }"
                  :exit="{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }"
                  :whileTap="{ scale: 0.96 }"
                  :transition="springPop"
                  @click="replay"
                >&#8635; Play again</motion.button>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>

    <p class="pt-2.5 text-[12.5px] text-ink-faint">Sample conversation. Yours is trained on your business, your services, your service area.</p>
  </div>
</template>
