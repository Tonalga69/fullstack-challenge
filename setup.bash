#!/bin/bash


cd /backend

npm install
npx prisma migrate dev --name init
npm run start:dev 

cd ../frontend

npm install
npm run start