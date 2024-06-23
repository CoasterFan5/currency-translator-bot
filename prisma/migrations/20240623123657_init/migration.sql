-- CreateTable
CREATE TABLE "serverSettings" (
    "id" TEXT NOT NULL,

    CONSTRAINT "serverSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "baseCurrency" (
    "id" SERIAL NOT NULL,
    "serverId" TEXT NOT NULL,
    "currencyName" TEXT NOT NULL,

    CONSTRAINT "baseCurrency_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "serverSettings_id_key" ON "serverSettings"("id");

-- AddForeignKey
ALTER TABLE "baseCurrency" ADD CONSTRAINT "baseCurrency_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "serverSettings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
