import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  
  const user = await prisma.user.create({
      data: {
        name: 'Andre',
        email: 'andre@teste.prisma.i0',
        authors: {
          create: {
            tags: 'Teste',
            surname: 'Pires',
            completeName: 'de Figueiredo',
            posts: {
              create: {
                text: 'Primeiro texto',
                title: 'Titulo do primeiro texto',
              },
            },
          },
        },
      },
  })
    console.log(user)
  

    const allUsers = await prisma.user.findMany({
      include :{
        authors: true,
        comments: true,
      },
    })
    console.dir(allUsers, {depth: null})


    // Delete Author and User
/*    const deleteAuthor = prisma.author.deleteMany({
      where: {
        userId : 1,
      },
    })
    const deleteUser = prisma.user.delete({
      where: {
        id: 1,
      },
    }) 

    const transaction = await prisma.$transaction([deleteAuthor, deleteUser])*/
      
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
