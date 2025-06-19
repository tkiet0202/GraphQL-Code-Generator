const db = {
  posts: [
    {
      id: 0,
      authorId: 0,
      title: "Hi",
      content: "Hi. How is this going",
      createAt: new Date(),
      picture: "https://thispersondoesnotexist.com",
      publishAt: null,
    },
    {
      id: 1,
      authorId: 0,
      title: "Hello",
      content: "Hi. How is this going",
      createAt: new Date(),
      picture:
        "https://images.unsplash.com/photo-1459802071246-377c0346da93?q=80&w=1795&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      publishAt: null,
    },
    {
      id: 2,
      authorId: 1,
      title: "Available for hiring",
      content: "Hi. How is this going",
      createAt: new Date(),
      picture:
        "https://images.unsplash.com/photo-1507072757289-c7de1a8c075e?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      publishAt: null,
    },
    // {
    //   id: 3,
    //   authorId: 0,
    //   title: "33333333333",
    //   content: "Hi. How is this going",
    //   createAt: new Date(),
    //   picture:
    //     "https://media.istockphoto.com/id/2054735363/vi/anh/milk-splash-isolated-on-brown-background-yogurt-or-milk-cream-3d-illustration.jpg?s=1024x1024&w=is&k=20&c=0-y97IJjewulouNcZc5iKKJajX7HOPfBWhtQ9l0U-Og=",
    //   publishAt: null,
    // },
  ],
  authors: [
    {
      id: 0,
      displayName: "KieT",
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
