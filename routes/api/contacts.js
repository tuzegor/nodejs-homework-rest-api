const express = require("express");
const {
  listContacts,
  getContactById,
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
  const { contactId } = req.params;
  console.log(contactId);
  const contact = await getContactById(contactId);
  console.table(contact);

  if (!contact) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: `Contact with ${contactId} not found`,
    });
  }

  res.json({
    status: "success",
    code: 200,
    message: "success get request",
    data: { result: contact },
  });
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
