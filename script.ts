import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

  let allAuthor = await prisma.author.findMany()
  console.log(allAuthor)

  allAuthor.forEach(async (p) => {
      const deletedPosts = await prisma.author.delete({
        where: {
          id: p.id,
        }
      })
    })

    let allUser = await prisma.user.findMany()
    console.log(allUser)

  allUser.forEach(async (p) => {
      const deletedPosts = await prisma.user.delete({
        where: {
          id: p.id,
        }
      })
    })
    
    const user = await prisma.user.create({
        data: {
          name: 'Andre',
          email: 'andre@teste.prisma.io',
          authors: {
            create: {
              tags: '',
              surname: 'Pires',
              completeName: 'de Figueiredo',
            },
          },
            posts: {
              create: [
                {title: 'Teste'},
                {text: 'Exercicio Prisma'},
              ],
            },
          comments: {
            create: [
              {text: ''},
            ],
          },     
        },
    })
 
   console.log(user)

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
