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
      if (typeof replyToId !== "number") return null;
      const matchedComment = ctx.db.comments.filter(
        (comment: any) => comment.id === replyToId
      );
      return matchedComment.length > 0 ? matchedComment[0] : null;
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
      const matchedPosts = context.db.posts.filter((el: any) => el.id === id);
      return matchedPosts.length > 0 ? matchedPosts[0] : null;
    },
  },
  Mutation: {
    createPost: (_parent: any, { input }: any, ctx: any) => {
      console.log("parent", _parent);

      const id = ctx.db.posts.length;
      ctx.db.posts.push({
        id,
        ...input,
        createdAt: new Date(),
        publishedAt: null,
      });
      return ctx.db.posts[id];
    },
    publishPost: (_parent: any, { id }: { id: number }, ctx: any) => {
      const matchedPosts = ctx.db.posts.filter((post: any) => post.id === id);
      if (matchedPosts.length === 0) return null;

      matchedPosts[0].publishedAt = new Date();
      return matchedPosts[0];
    },
    createComment: (_parent: any, { input }: any, ctx: any) => {
      const id = ctx.db.comments.length;
      ctx.db.comments.push({
        id,
        ...input,
        createAt: new Date(),
      });
      return ctx.db.comments[id];
    },
  },
};

export default resolvers;
