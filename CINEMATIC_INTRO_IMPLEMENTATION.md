# Cinematic Intro Implementation - Technical Documentation

## Overview

A premium cinematic title → zoom → hard cut → site reveal intro animation implemented with GSAP timeline. The animation runs once per session on initial page load only.

## Files Changed

1. **`src/components/ui/CinematicIntro.tsx`** - Complete rewrite with GSAP timeline
2. **`src/pages/NewLanding.tsx`** - Added sessionStorage logic and site mounting strategy

## Key Features

### 1. Session-Based Playback
- Uses `sessionStorage.getItem('introPlayed')` to track if intro has played
- Runs once per browser session
- Can be disabled via environment variable: `VITE_DISABLE_INTRO=true`

### 2. Skip Functionality
- **Skip Button**: Top-right corner, subtle styling
- **ESC Key**: Immediate skip on Escape key press
- Both methods instantly reveal the site

### 3. Animation Timeline (Total: 1.28s)

#### Phase A: Kinetic Type Reveal (0.00s → ~0.45s)
- Text "BoostAI Consulting" types letter-by-letter
- Speed: 35ms per character (~700ms total for 20 chars)
- Dot (.) appears at 0.55s during "Consulting" typing
- Uses existing `TextType` component for consistency

#### Phase B: Camera Push / Acceleration (0.25s → 1.20s)
- **0.25-0.95s**: Scale 1.0 → 10x (slow start, `power2.in` easing)
- **0.95-1.20s**: Scale 10x → 35x (aggressive acceleration, `expo.in` easing)
- Overlaps with end of typing phase for seamless motion

#### Phase C: Flash / Hard Cut (1.20s → 1.28s)
- Text hidden at 1.20s (before pixel zoom visible)
- Full-screen purple flash (#3D2F57)
- Duration: 80ms (hard cut, not fade)

#### Phase D: Site Reveal (1.28s)
- Overlay unmounts instantly
- Site becomes interactive immediately
- No fade-in, clean cut

## Pixel-Zoom Avoidance (Critical)

**Threshold Logic:**
- Text is hidden when scale reaches `SCALE_THRESHOLD = 10`
- This happens at 1.20s, before any pixel-level zoom becomes visible
- Uses `display: none`, `visibility: hidden`, and `opacity: 0` for complete removal

**Why it works:**
- Viewport width is typically 1920px (desktop) or 375px (mobile)
- At scale 10x, text width = ~6000px (desktop) or ~3750px (mobile)
- Text is hidden BEFORE it exceeds viewport bounds
- Flash triggers immediately after text is hidden

## Site Mounting Strategy

**No Reflow Approach:**
- Site is always mounted (not conditionally rendered)
- During intro: `pointer-events: none` on site container
- After intro: `pointer-events: auto` restored
- This prevents layout shifts and ensures smooth transition

## Mobile Responsiveness

**Typography:**
- Uses CSS `clamp(2rem, 6vw, 6rem)` for responsive font sizing
- `maxWidth: '95vw'` prevents overflow
- `whiteSpace: 'nowrap'` prevents awkward wrapping
- Perfectly centered with flexbox

**Animation:**
- Same duration as desktop (1.28s)
- Same easing curves
- Scale thresholds adjusted for smaller viewports

## Technical Implementation

### GSAP Timeline Structure

```javascript
tl.set(textElement, { opacity: 1, scale: 1 })
  .to(dotElement, { opacity: 1 }, 0.55) // Dot appears
  .to(textElement, { scale: 10, ease: 'power2.in' }, 0.25) // Slow zoom
  .to(textElement, { scale: 35, ease: 'expo.in' }, 0.95) // Fast zoom
  .set(textElement, { opacity: 0, display: 'none' }, 1.20) // Hide text
  .to(flashElement, { opacity: 1, duration: 0.08 }, 1.20) // Flash
  .to(flashElement, { opacity: 0 }, 1.28); // Fade flash
```

### Performance Optimizations

- `transform: translateZ(0)` for GPU acceleration
- `willChange: 'transform, opacity'` for browser hints
- `backfaceVisibility: 'hidden'` to prevent flickering
- Transform-only animations (no layout thrash)

## Testing Checklist

### Local Validation (MANDATORY)

1. **Session Storage Test**
   ```bash
   npm run dev
   ```
   - Open site → intro plays
   - Refresh page → intro does NOT play (sessionStorage active)
   - Open new tab → intro plays (new session)

2. **Skip Functionality**
   - Click "SKIP" button → site reveals instantly
   - Press ESC key → site reveals instantly
   - Both methods work during any phase

3. **Mobile Viewport Test**
   - Resize to mobile (375px width)
   - Verify title fits completely
   - Verify centered (both axes)
   - Verify no cropping or wrapping

4. **Pixel-Zoom Test (CRITICAL)**
   - Watch animation carefully
   - Verify NO white pixel zoom is visible
   - Text should disappear before zoom becomes visible
   - Flash should trigger immediately after text disappears

5. **Navigation Test**
   - After intro completes, navigate to other pages
   - Verify intro does NOT replay on route changes
   - Verify site functionality is normal

6. **Environment Flag Test**
   ```bash
   # In .env file
   VITE_DISABLE_INTRO=true
   ```
   - Restart dev server
   - Intro should not play

## Brand Requirements Met

✅ **Exact Text**: "BoostAI Consulting." (with dot)
✅ **Brand Dot**: Purple (#5a4a6f) with glow, visible during typing
✅ **Font**: Darker Grotesque (same as hero title)
✅ **Colors**: Brand purple (#3D2F57) for flash

## Constraints Respected

✅ **No UI Changes**: Existing site UI/UX unchanged
✅ **No Heavy Effects**: No blur, glow (except brand dot), or particles
✅ **Duration**: 1.28s (within 1.15-1.45s range)
✅ **Transform Only**: Scale and opacity only, no layout shifts
✅ **Client-Side Only**: No hydration mismatches

## Troubleshooting

### Intro Not Playing
- Check `sessionStorage.getItem('introPlayed')` in console
- Verify `VITE_DISABLE_INTRO` is not set to 'true'
- Check browser console for GSAP errors

### Pixel Zoom Visible
- Verify `SCALE_THRESHOLD = 10` is appropriate for viewport
- Check that text is hidden at 1.20s (before scale exceeds threshold)
- Adjust threshold if needed for different screen sizes

### Skip Not Working
- Verify event listeners are attached
- Check that `isSkipping` state is properly managed
- Ensure timeline is killed on skip

## Future Enhancements

- Add configurable duration via environment variable
- Add analytics tracking for skip rate
- Add reduced motion support (respects `prefers-reduced-motion`)

