import { PrismaClient, User, Tag, Post, Comment, Like } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding...')

  // ANCHOR 1:  Clean up existing data
  await prisma.like.deleteMany()
  await prisma.comment.deleteMany()
  await prisma.post.deleteMany()
  await prisma.tag.deleteMany()
  await prisma.user.deleteMany()
  console.log('Cleaned up existing data.')

  // Create Users
  
  // 方法一
  const users: User[] = []
  for (let i = 0; i < 5; i++) {
    // 使用一个一个创建
    const user = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        bio: faker.lorem.paragraph(),
        avatar: faker.image.avatar(),
      },
    })
    users.push(user)
  }

/*
************
 * 方法二 *
 ************
 */
// const user = Array.from({ length: 5 }, () => ({
//   name: faker.person.fullName(),
//   email: faker.internet.email(),
//   password: faker.internet.password(),
//   bio: faker.lorem.paragraph(),
//   avatar: faker.image.avatar(),
// }))

//   await prisma.user.createMany({
//     data: user,
//   })


  console.log(`${users.length} users created.`)

  // Create Tags
  const tags: Tag[] = []
  for (let i = 0; i < 10; i++) {
    const tag = await prisma.tag.create({
      data: {
        name: faker.lorem.word(),
      },
    })
    tags.push(tag)
  }
  console.log(`${tags.length} tags created.`)

  // Create Posts
  const posts: Post[] = []
  for (let i = 0; i < 20; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)]
    // Get 1 to 3 random tags
    const randomTags = tags
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 3) + 1)

    const title = faker.lorem.sentence()
    const post = await prisma.post.create({
      data: {
        title: title,
        slug: faker.helpers.slugify(title).toLowerCase(),
        content: faker.lorem.paragraphs(3),
        thumbnail: faker.image.urlLoremFlickr({ category: 'abstract' }),
        published: faker.datatype.boolean(),
        authorId: randomUser.id,
        tags: {
          connect: randomTags.map((tag) => ({ id: tag.id })),
        },
      },
    })
    posts.push(post)
  }
  console.log(`${posts.length} posts created.`)

  // Create Comments
  const comments: Comment[] = []
  for (let i = 0; i < 50; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)]
    const randomPost = posts[Math.floor(Math.random() * posts.length)]
    const comment = await prisma.comment.create({
      data: {
        content: faker.lorem.sentence(),
        authorId: randomUser.id,
        postId: randomPost.id,
      },
    })
    comments.push(comment)
  }
  console.log(`${comments.length} comments created.`)

  // Create Likes
  const likes: Like[] = []
  for (let i = 0; i < 100; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)]
    const randomPost = posts[Math.floor(Math.random() * posts.length)]
    
    // Prevent duplicate likes
    const existingLike = await prisma.like.findFirst({
        where: {
            authorId: randomUser.id,
            postId: randomPost.id,
        }
    })

    if (!existingLike) {
        const like = await prisma.like.create({
          data: {
            authorId: randomUser.id,
            postId: randomPost.id,
          },
        })
        likes.push(like)
    }
  }
  console.log(`${likes.length} likes created.`)

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

