### Setup prisma

Push the database for development
```sh
npx prisma db push
```

Generate PrismaClient for orm use
```sh
npx prisma generate
```

Migrate the database for production
```sh
npx prisma migrate dev
```