"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion, AnimatePresence } from "framer-motion"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
  ModalTrigger,
} from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useExpenseStore } from "@/store/expense-store"
import { useToast } from "@/components/ui/use-toast"
import { Plus } from "lucide-react"

const expenseSchema = z.object({
  date: z.string().min(1, "Date is required"),
  category: z.string().min(1, "Category is required"),
  amount: z.string().refine((val) => {
    const num = parseFloat(val)
    return !isNaN(num) && num > 0
  }, "Amount must be a positive number"),
  description: z.string().min(1, "Description is required"),
})

type ExpenseFormData = z.infer<typeof expenseSchema>

interface ExpenseFormProps {
  children?: React.ReactNode
}

export function ExpenseForm({ children }: ExpenseFormProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const addExpense = useExpenseStore((state) => state.addExpense)
  const categories = useExpenseStore((state) => state.categories)
  const { toast } = useToast()

  const form = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      category: "",
      amount: "",
      description: "",
    },
  })

  const onSubmit = async (data: ExpenseFormData) => {
    setIsSubmitting(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      
      addExpense({
        date: data.date,
        category: data.category,
        amount: parseFloat(data.amount),
        description: data.description,
      })
      
      toast({
        title: "Expense added successfully!",
        description: `${data.description} has been added to your expenses.`,
      })
      
      form.reset()
      setOpen(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add expense. Please try again.",
        variant: "destructive",
      })
      console.error('Error adding expense:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.15,
        ease: [0.4, 0, 1, 1] as const,
      },
    },
  }

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger asChild>
        {children || (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Expense
          </Button>
        )}
      </ModalTrigger>
      
      <AnimatePresence>
        {open && (
          <ModalContent asChild>
            <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit">
              <ModalHeader>
                <ModalTitle>Add New Expense</ModalTitle>
                <ModalDescription>
                  Enter the details of your expense to track it.
                </ModalDescription>
              </ModalHeader>
              
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="date" className="text-sm font-medium">
                      Date
                    </label>
                    <Input
                      id="date"
                      type="date"
                      {...form.register("date")}
                      className={form.formState.errors.date ? "border-destructive" : ""}
                    />
                    {form.formState.errors.date && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.date.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="category" className="text-sm font-medium">
                      Category
                    </label>
                    <Select
                      value={form.watch("category")}
                      onValueChange={(value) => form.setValue("category", value)}
                    >
                      <SelectTrigger className={form.formState.errors.category ? "border-destructive" : ""}>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.name}>
                            <div className="flex items-center space-x-2">
                              <span>{category.icon}</span>
                              <span>{category.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {form.formState.errors.category && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.category.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="amount" className="text-sm font-medium">
                      Amount ($)
                    </label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...form.register("amount")}
                      className={form.formState.errors.amount ? "border-destructive" : ""}
                    />
                    {form.formState.errors.amount && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.amount.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium">
                      Description
                    </label>
                    <Input
                      id="description"
                      placeholder="What was this expense for?"
                      {...form.register("description")}
                      className={form.formState.errors.description ? "border-destructive" : ""}
                    />
                    {form.formState.errors.description && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.description.message}
                      </p>
                    )}
                  </div>
                </div>

                <ModalFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpen(false)}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Adding..." : "Add Expense"}
                  </Button>
                </ModalFooter>
              </form>
            </motion.div>
          </ModalContent>
        )}
      </AnimatePresence>
    </Modal>
  )
}
