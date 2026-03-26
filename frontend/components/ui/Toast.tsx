'use client'
import { AnimatePresence, motion } from 'framer-motion'

type ToastProps = {
  messages: { id: string; type: 'success' | 'error' | 'info'; text: string }[]
  onClose: (id: string) => void
}

export default function Toast({ messages, onClose }: ToastProps) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <AnimatePresence>
        {messages.map(message => (
          <motion.div key={message.id}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 60 }}
            className={`rounded-xl p-4 shadow-lg text-sm border ${message.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : message.type === 'error' ? 'bg-red-50 border-red-200 text-red-700' : 'bg-blue-50 border-blue-200 text-blue-700'}`}
          >
            <div className="flex items-start justify-between gap-3">
              <p>{message.text}</p>
              <button onClick={() => onClose(message.id)} className="font-bold">×</button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
