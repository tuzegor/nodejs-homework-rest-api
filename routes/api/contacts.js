const express = require("express");
const {
  listContacts,
  // getContactById,
  // removeContact,
  // addContact,
  // updateContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  console.table(contacts);

  res.json({
    status: "success",
    code: 200,
    message: "success get request",
    data: { result: contacts },
  });
});

router.get("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
