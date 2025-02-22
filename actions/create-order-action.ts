"use server"

import { prisma } from "@/src/lib/prisma";
import { OrderSchema } from "@/src/schema";


export async function createOrder(data: unknown) {
  console.log("DESDE CREATE ORDER ACTION");
  const result = OrderSchema.safeParse(data)

  if(!result.success) {
    return {
      errors: result.error.issues
    }
  }

  try {
    console.log("{ success: true, data: { name: 'pesas' } }", data);
    await prisma.order.create({
      data: {
        name: result.data.name,
        total: result.data.total,
        orderProducts: {
          create: result.data.order.map( product => ({
            productId: product.id,
            quantity: product.quantity
          })) 
        }
      }
    })
  } catch (error) {
   console.log(error);
    
  }
}