import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export const signupSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  fullName: z.string().trim().min(2, { message: "Name must be at least 2 characters" }).optional(),
});

export const equipmentSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }).max(200),
  category: z.string().trim().min(1, { message: "Category is required" }),
  serial_number: z.string().trim().min(1, { message: "Serial number is required" }).max(100),
  quantity: z.number().int().positive({ message: "Quantity must be positive" }),
  condition: z.enum(['Excellent', 'Good', 'Fair', 'Poor']),
  location: z.string().trim().min(1, { message: "Location is required" }),
  department: z.string().trim().min(1, { message: "Department is required" }),
  status: z.enum(['Available', 'In Use', 'Under Maintenance', 'Retired']),
  purchase_date: z.string().optional(),
  warranty_expiry: z.string().optional(),
  notes: z.string().max(1000).optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type EquipmentInput = z.infer<typeof equipmentSchema>;
