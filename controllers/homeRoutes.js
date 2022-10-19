const { Post, User, Comment } = require ('../models');
const { restore } = require('../models/User');
const router = require('express').Router();
const withAuth = require("../utils/auth");

// get all posts
router.get("/", async (req, res) => {
    try { 
        const postData = await Post.findAll({
        include: [
            {
                model: User,
        attributes: ["name"],
        },
        {
            model: Comment,
            attributes: ["id", "content", "post_id", "user_id", "date_created"],
            include: {
              model: User,
              attributes: ["name"],
            },
          },
        ],
      });
      
// Serialize post data
const posts = postData.map((post) => post.get({ plain: true }));
// Pass serialized data and session flag into home template
res.render("homepage", {
  posts,
  logged_in: req.session.logged_in,
});
} catch (err) {
res.status(500).json(err);
}
});

// get posts for dashboard
router.get("/dashboard", withAuth, async (req, res) => {
  try { 
      const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id
      } ,
      include: [
          {
              model: User,
      attributes: ["name"],
      },
      {
          model: Comment,
          attributes: ["id", "content", "post_id", "user_id", "date_created"],
          include: {
            model: User,
            attributes: ["name"],
          },
        },
      ],
    });
    
// Serialize post data
const posts = postData.map((post) => post.get({ plain: true }));
// Pass serialized data and session flag into home template
res.render("homepage", {
posts,
logged_in: req.session.logged_in,
});
} catch (err) {
res.status(500).json(err);
}
});


// get single post by id
router.get("/", async (req, res) => {
    try {
        const postData = await  Post.findByPk(req.params.id, {
            include :[
                {
                    model: User,
                    attributes: ["name", "id"],
                },
                {
                    model: Comment,
                    include: {
                        model: User,
                    },
                },
            ],
        });
        const post = postData.get({ plain: true});
        res.render("post", {
            ...post,
            logged_in: req.session.logged_in,
            userId: req.session.user_id,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Use withAuth to withhold routes
router.get("/profile", withAuth, async (req, res) => {
    try {
      // find user based on session id
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ["password"] },
        include: [{ model: Post }],
      });
  
      const user = userData.get({ plain: true });
  
      console.log("logged in successfully");
  
      res.render("profile", {
        ...user,
        logged_in: true,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.get("/login", (req, res) => {
    // if user islogged in, redirect to other route
    if (req.session.logged_in) {
      res.redirect("/profile");
      return;
    }
  
    res.render("login");
  });
  
router.get("/post/:id" , async (req, res) => {
  const postData = await Post.findOne({
    where: {id: req.params.id},
    include: [
        {
            model: User,
    attributes: ["name"],
    },
    {
        model: Comment,
        attributes: ["id", "content", "post_id", "user_id", "date_created"],
        include: {
          model: User,
          attributes: ["name"],
        },
      },
    ],
  });
  const post = postData.get({ plain: true});
  console.log(post)
  res.render("post", {...post, logged_in: req.session.logged_in})
})

  module.exports = router;