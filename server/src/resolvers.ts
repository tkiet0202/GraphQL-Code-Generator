const { GraphQLDateTime } = require("graphql-iso-date") as any;

const resolvers = {
  DateTime: GraphQLDateTime,
  Author: {
    posts: ({ id }: { id: number }, _args: any, ctx: any) => {
      return ctx.db.posts.filter((p: any) => p.authorId === id);
    },
  },
  Post: {
    author: ({ authorId }: { authorId: number }, _args: any, ctx: any) => {
      return ctx.db.authors.filter((author: any) => author.id === authorId);
    },
    comments: ({ id }: { id: number }, _args: any, ctx: any) => {
      return ctx.db.comments.filter((comment: any) => comment.postId === id);
    },
  },
  Query: {
    author: (_parent: any, { id }: { id: number }, context: any) => {
      const matchedAuthor = context.db.authors.filter(
        (el: any) => el.id === id
      );
      return matchedAuthor.length > 0 ? matchedAuthor[0] : null;
    },
    post: (_parent: any, { id }: { id: number }, context: any) => {
      const matchedPost = context.db.post.filter((el: any) => el.id === id);
      return matchedPost.length > 0 ? matchedPost[0] : null;
    },
  },
};

export default resolvers;
