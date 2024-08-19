// import { Prisma, PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()

//        const initailPosts: Prisma.PostCreateInput[] = [
//         {
//           title: 'Post 1',
//           content: 'This is the content of post 1',
//           author: {
//             connectOrCreate: {
//                 where: { email: 'john@gmail.com' },
//                 create: { email: 'john@gmail.com', name: 'John Doe', password: 'password' },
//             },
//         },
//     },
//        ]

//   async function main(){
//     console.log('Start seeding ...')
//     for(const post of initailPosts){
//         const newPost = await prisma.post.create({
//             data: post,
//         })
//         console.log(`Created post with id: ${newPost.id}`);
//     }
//     console.log('Seeding finished.')

//   }
// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })