import { Moon } from 'lunarphase-js'

export function getMoonPhase() {
  const phase = Moon.lunarPhase()
  const emoji = Moon.lunarPhaseEmoji()
  
  const descriptions: Record<string, string> = {
    'New': 'Set powerful intentions. Plant seeds for what you wish to manifest.',
    'Waxing Crescent': 'Take inspired action. Your dreams are beginning to take form.',
    'First Quarter': 'Push through challenges. Your commitment is being tested.',
    'Waxing Gibbous': 'Refine and adjust. You are close to manifestation.',
    'Full': 'Release and celebrate. Your energy is at its peak tonight.',
    'Waning Gibbous': 'Express gratitude. Share your gifts with the world.',
    'Last Quarter': 'Let go and forgive. Release what no longer serves you.',
    'Waning Crescent': 'Rest and surrender. Prepare for a new cycle of growth.',
  }

  const frequencies: Record<string, string> = {
    'New': '396 Hz',
    'Waxing Crescent': '417 Hz',
    'First Quarter': '528 Hz',
    'Waxing Gibbous': '639 Hz',
    'Full': '963 Hz',
    'Waning Gibbous': '741 Hz',
    'Last Quarter': '852 Hz',
    'Waning Crescent': '396 Hz',
  }

  return {
    phase,
    emoji,
    description: descriptions[phase] || 'A sacred moment in the lunar cycle.',
    frequency: frequencies[phase] || '528 Hz',
  }
}