type ButtonProps = {
  children: React.ReactNode
  variant?: string
  onClick?: () => void
  onSubmit?: () => void
  type: 'button' | 'submit' | 'reset'
}

const Button = (props: ButtonProps) => {
  const { children, variant, type, onClick, onSubmit } = props
  return (
    <button
      type={type}
      className={`${variant} cursor-pointer`}
      onClick={onClick}
      onSubmit={onSubmit}
    >
      {children}
    </button>
  )
}

export default Button
