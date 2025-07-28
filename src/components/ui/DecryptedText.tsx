import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'hover',
  ...props
}) {
  const [displayText, setDisplayText] = useState(text)
  const [isHovering, setIsHovering] = useState(false)
  const [isScrambling, setIsScrambling] = useState(false)
  const [revealedIndices, setRevealedIndices] = useState(new Set())
  const [hasAnimated, setHasAnimated] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    let interval
    let currentIteration = 0

    const getNextIndex = (revealedSet) => {
      const textLength = text.length
      switch (revealDirection) {
        case 'start': return revealedSet.size
        case 'end': return textLength - 1 - revealedSet.size
        case 'center': {
          const middle = Math.floor(textLength / 2)
          const offset = Math.floor(revealedSet.size / 2)
          const nextIndex = revealedSet.size % 2 === 0 ? middle + offset : middle - offset - 1
          if (nextIndex >= 0 && nextIndex < textLength && !revealedSet.has(nextIndex)) return nextIndex
          for (let i = 0; i < textLength; i++) if (!revealedSet.has(i)) return i
          return 0
        }
        default: return revealedSet.size
      }
    }

    const availableChars = useOriginalCharsOnly
      ? Array.from(new Set(text.split(''))).filter((c) => c !== ' ')
      : characters.split('')

    const shuffleText = (original, revealed) =>
      original.split('').map((c, i) =>
        c === ' ' ? ' ' : revealed.has(i) ? original[i] : availableChars[Math.floor(Math.random() * availableChars.length)]
      ).join('')

    if (isHovering) {
      setIsScrambling(true)
      interval = setInterval(() => {
        setRevealedIndices((prev) => {
          if (sequential) {
            if (prev.size < text.length) {
              const nextIndex = getNextIndex(prev)
              const newSet = new Set(prev).add(nextIndex)
              setDisplayText(shuffleText(text, newSet))
              return newSet
            } else {
              clearInterval(interval)
              setIsScrambling(false)
              return prev
            }
          } else {
            setDisplayText(shuffleText(text, prev))
            currentIteration++
            if (currentIteration >= maxIterations) {
              clearInterval(interval)
              setIsScrambling(false)
              setDisplayText(text)
            }
            return prev
          }
        })
      }, speed)
    } else {
      setDisplayText(text)
      setRevealedIndices(new Set())
      setIsScrambling(false)
    }
    return () => { if (interval) clearInterval(interval) }
  }, [isHovering, text, speed, maxIterations, sequential, revealDirection, characters, useOriginalCharsOnly])

  useEffect(() => {
    if (animateOn !== 'view') return
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting && !hasAnimated) { setIsHovering(true); setHasAnimated(true) } })
    }, { threshold: 0.1 })
    if (containerRef.current) observer.observe(containerRef.current)
    return () => { if (containerRef.current) observer.unobserve(containerRef.current) }
  }, [animateOn, hasAnimated])

  const hoverProps = animateOn === 'hover' ? { onMouseEnter: () => setIsHovering(true), onMouseLeave: () => setIsHovering(false) } : {}

  return (
    <motion.span ref={containerRef} className={`inline-block whitespace-pre-wrap ${parentClassName}`} {...hoverProps} {...props}>
      <span className="sr-only">{displayText}</span>
      <span aria-hidden="true">
        {displayText.split('').map((char, i) => {
          const revealed = revealedIndices.has(i) || !isScrambling || !isHovering
          return <span key={i} className={revealed ? className : encryptedClassName}>{char}</span>
        })}
      </span>
    </motion.span>
  )
} 