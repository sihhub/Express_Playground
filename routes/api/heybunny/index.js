require("dotenv").config();
const express = require("express");
const router = express.Router();

const UsersNewsletters = require("@root/models/heybunny/usersNewsletters");
const UsersInfo = require("@root/models/heybunny/usersInfo");

router.get("/insert-metagroupid", async (req, res) => {
  try {
    const subEmails = await UsersNewsletters.findSubscribeEmailsByMetadataId(
      "체크인레터<checkin@gorilladistrict.com>"
    );

    const usersInfo = await UsersInfo.find({
      subscribeEmail: { $in: subEmails },
    });

    console.log("subEmails.length:", subEmails.length);
    console.log("usersInfo.length:", usersInfo.length);

    if (subEmails.length !== usersInfo.length) {
      //안맞는 것 찾기
      const notMatchedEmails = subEmails.filter(
        (email) => !usersInfo.find((info) => info.subscribeEmail === email)
      );

      console.log("notMatchedEmails:", notMatchedEmails);
    }

    for (let i = 0; i < subEmails.length; i++) {
      const email = subEmails[i];
      console.log("email:", email);
      await UsersInfo.pushMetaGroupId(
        { subscribeEmail: email },
        "7155215f80f522034ccc472d"
      );
    }

    res.status(201).json({ message: "Success" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error", details: err });
  }
});

module.exports = router;
