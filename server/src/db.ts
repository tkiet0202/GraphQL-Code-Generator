const db = {
  posts: [
    {
      id: 0,
      authorId: 0,
      title: "Hi",
      content: "Hi. How is this going",
      createAt: new Date(),
      publishAt: null,
    },
  ],
  authors: [
    {
      id: 0,
      displayName: "Kief",
      picture: "https://thispersondoesnotexist.com",
      createAt: new Date(2022, 1, 1),
    },
  ],
  comments: [
    {
      id: 0,
      postId: 0,
      text: "Nice one!",
      userName: "John Jones",
      createAt: new Date(),
      replyToId: null,
    },
    {
      id: 1,
      postId: 0,
      text: "Appreciate you",
      userName: "January",
      createAt: new Date(),
      replyToId: 1,
    },
  ],
};

export default db;
