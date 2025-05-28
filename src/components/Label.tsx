const Label = (props: { name: string; variant: string }) => {
  const { name, variant } = props

  return (
    <span className={`inline-block w-fit rounded-full ${variant}`}>{name}</span>
  )
}

export default Label
