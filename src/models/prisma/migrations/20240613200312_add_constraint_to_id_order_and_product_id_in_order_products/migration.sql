/*
  Warnings:

  - A unique constraint covering the columns `[orderId,productId]` on the table `OrderProduct` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "OrderProduct_orderId_productId_key" ON "OrderProduct"("orderId", "productId");
