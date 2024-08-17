import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

 const getPosts = async () => {
  const posts = await prisma.post.findMany();
  return posts;
}
 
  const Action = async (formData:FormData) => {
  "use server";

    await prisma.post.create({
      data: {
        title: formData.get('title') as string,
        content: formData.get('content') as string,
        author: {
          connect: { email: 'abc@gmail.com' },
        },

      }
    })
    revalidatePath('/')
  }


export default async function Home() {
  const posts = await  getPosts();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center w-full flex-1 px-20 text-center">
    <div className="text-gray-900">
      <h1>hello world!</h1>
      <h1>All the posts</h1>
      <ul>
         {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
     <form action={Action} className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
      <input type="text" name="title" placeholder="Title" />
      <input type="text" name="content" placeholder="Content" />
      <button type="submit">Submit</button>
    </ form>
  </main>
  );
}
