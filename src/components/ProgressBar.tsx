type ProgressProps = {
  steps: {
    id: number
    name: string
  }[]
  currentStep: number
}

const ProgressBar = (props: ProgressProps) => {
  const { steps, currentStep } = props
  return (
    <div className='relative w-full h-1'>
      <div className='absolute top-1/2 left-0 w-full h-full bg-gray-300 -translate-y-1/2 z-0' />
      <div
        className='absolute top-1/2 left-0 h-full bg-[#DA9920] -translate-y-1/2 z-10'
        style={{ width: `${(currentStep / steps.length) * 100}%` }}
      />
    </div>
  )
}

export default ProgressBar
