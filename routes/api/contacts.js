const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  // addContact,
  // updateContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();

  res.json({
    status: "success",
    code: 200,
    message: "success get request",
    data: { result: contacts },
  });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: `Contact with id:${contactId} not found`,
    });
  }

  res.json({
    status: "success",
    code: 200,
    message: "success get by id request",
    data: { result: contact },
  });
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await removeContact(contactId);

  if (!contact) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: `Contact with id:${contactId} not found`,
    });
  }

  res.json({
    status: "success",
    code: 200,
    message: "success delete by id request",
    data: { result: contact },
  });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
