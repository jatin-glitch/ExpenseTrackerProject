export default function Button({ children, variant = 'primary', ...props }){
  const base = 'px-4 py-2 rounded-lg text-sm inline-flex items-center gap-2'
  const styles = variant === 'primary' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
  return (
    <button className={`${base} ${styles}`} {...props}>{children}</button>
  )
}
