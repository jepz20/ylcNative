// @flow
type Func = () => void

type CounterParams = {
  finalValue: number,
  initialValue: number,
  duration?: number,
  framesPerSecond?: number,
  setValue: (value: number) => void,
  onStart?: Func,
  onEnd?: Func
}

type Counter = {
  onCancelAnimation: Func => void
}

export function calculateSkip (
  finalValue: number,
  initialValue: number,
  duration: number = 1,
  framesPerSecond: number = 60
) {
  const delta = Math.abs(finalValue - initialValue)
  const totalFrames = duration * framesPerSecond
  const skip = Math.ceil(delta / totalFrames)
  return finalValue > initialValue ? skip : skip * -1
}

export default ({
  finalValue,
  initialValue,
  setValue,
  duration = 1,
  framesPerSecond = 60,
  onStart = () => {},
  onEnd = () => {}
}: CounterParams): Counter => {
  if (typeof finalValue !== 'number' || typeof initialValue !== 'number') {
    throw new Error('Invalid values')
  }

  let lastFrame
  const skip = calculateSkip(finalValue,
    initialValue,
    duration,
    framesPerSecond)

  const hasEnded = (frameVal) => {
    if (finalValue >= initialValue && frameVal >= finalValue) return true
    if (finalValue <= initialValue && frameVal <= finalValue) return true
    return false
  }

  const count = frameVal => {
    if (hasEnded(frameVal)) {
      setValue(finalValue)
      onEnd()
      return
    }
    setValue(frameVal)
    lastFrame = global.requestAnimationFrame(() => count(frameVal + skip))
  }

  const onCancelAnimation = cancelAnimation => {
    cancelAnimation()
    global.cancelAnimationFrame(lastFrame)
  }

  try {
    onStart()
    count(initialValue)
  } catch (error) {
    if (error instanceof RangeError || error.name === 'RangeError') {
      console.warn('too many recursive animations', initialValue, finalValue)
      global.requestAnimationFrame(() => setValue(finalValue))
      onEnd()
    } else {
      throw error
    }
  }

  return {
    onCancelAnimation
  }
}
