import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error']
})

async function main() {

  let allAuthor = await prisma.author.findMany()
  console.log(allAuthor)

  allAuthor.forEach(async (p) => {
    let deletedAuthors = await prisma.author.delete({
      where: {
        id: p.id,
      }
    })
    console.log(deletedAuthors)
  })

  let allUser = await prisma.user.findMany()
  console.log(allUser)

  allUser.forEach(async (p) => {
    const deletedUsers = await prisma.user.delete({
      where: {
        id: p.id,
      }
    })
    console.log(deletedUsers)
  })
      
  const newUser = await prisma.user.create({
    data: {
      name: 'Andre',
      email: 'andre@teste.prisma.io',
        author: {
          create: {
            tags: '',
            surname: 'Pires',
            completeName: 'de Figueiredo',
          },
        },
        // posts: {
        //   create: [
        //     {title: 'Teste'},
        //     {text: 'Exercicio Prisma'},
        //   ],
        // },
        // comments: {
        //   connect: {
        //     text: '',
        //   },
        // },     
    },
  })

 console.log(newUser)

      
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
