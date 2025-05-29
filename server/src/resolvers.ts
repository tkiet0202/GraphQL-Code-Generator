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
  Comment: {
    replyTo: ({ replyToId }: { replyToId: number }, _args: any, ctx: any) => {
      const matchedComment = ctx.db.comments.filter(
        (comments: any) => comments.id === replyToId
      );
      return;
    },
  },
  Query: {
    author: (_parent: any, { id }: { id: number }, context: any) => {
      const matchedAuthors = context.db.authors.filter(
        (el: any) => el.id === id
      );
      return matchedAuthors.length > 0 ? matchedAuthors[0] : null;
    },
    post: (_parent: any, { id }: { id: number }, context: any) => {
      const matchedPosts = context.db.post.filter((el: any) => el.id === id);
      return matchedPosts.length > 0 ? matchedPosts[0] : null;
    },
  },
};

export default resolvers;
