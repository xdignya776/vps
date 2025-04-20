import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatMemory(memoryMB: number): string {
  // If memory is less than 1 GB, show as MB
  if (memoryMB < 1024) {
    return `${memoryMB} MB`;
  }
  
  // Otherwise, convert to GB and format
  const memoryGB = memoryMB / 1024;
  return `${memoryGB} GB`;
}

export function formatStorage(storageSizeGB: number): string {
  // If storage is less than 1 TB (1024 GB), show as GB
  if (storageSizeGB < 1024) {
    return `${storageSizeGB} GB`;
  }
  
  // Otherwise, convert to TB and format with one decimal place
  const storageTB = storageSizeGB / 1024;
  return `${storageTB.toFixed(1)} TB`;
}

export function formatBandwidth(transferTB: number): string {
  // Handle empty or zero bandwidth
  if (!transferTB) {
    return 'Unlimited';
  }
  
  // If bandwidth is less than 1 TB, show as GB
  if (transferTB < 1) {
    return `${(transferTB * 1024).toFixed(0)} GB`;
  }
  
  // Otherwise, show as TB
  return `${transferTB} TB`;
}
