<script setup>
// AgenticOpz landing page — Vue 3 + Tailwind CSS + Motion (motion-v).
// MotionConfig reducedMotion="user" makes every transform animation
// respect the visitor's reduced-motion OS setting automatically.
import { MotionConfig } from 'motion-v'
import SiteHeader from './components/SiteHeader.vue'
import HeroSection from './components/HeroSection.vue'
import ProblemSection from './components/ProblemSection.vue'
import HowSection from './components/HowSection.vue'
import SampleSection from './components/SampleSection.vue'
import AuditSection from './components/AuditSection.vue'
import FaqSection from './components/FaqSection.vue'
import ClosingSection from './components/ClosingSection.vue'
</script>

<template>
  <MotionConfig reducedMotion="user">
    <div id="top">
      <SiteHeader />
      <main>
        <HeroSection />
        <ProblemSection />
        <HowSection />
        <SampleSection />
        <AuditSection />
        <FaqSection />
        <ClosingSection />
      </main>
    </div>
  </MotionConfig>
</template>
