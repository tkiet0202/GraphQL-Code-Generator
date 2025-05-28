const db = {
  posts: [
    {
      id: 0,
      authorId: 1,
      title: "Hi",
      content: "Hi. How is this going",
      createAt: new Date(),
      publishAt: null,
    },
  ],
  author: [
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
      username: "John Jones",
      createAt: new Date(),
    },
  ],
};

export default db;
