<script setup>
// Gentle scroll-into-view reveal. Animates transform + opacity only,
// so the element's box never changes size — zero layout shift.
import { motion } from 'motion-v'

defineProps({
  delay: { type: Number, default: 0 },
})
</script>

<template>
  <motion.div
    :initial="{ opacity: 0, y: 26 }"
    :whileInView="{ opacity: 1, y: 0 }"
    :viewport="{ once: true, margin: '-70px' }"
    :transition="{ type: 'spring', stiffness: 90, damping: 20, mass: 0.9, delay }"
  >
    <slot />
  </motion.div>
</template>
