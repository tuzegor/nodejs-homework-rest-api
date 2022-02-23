const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const {
  schemaCreateContact,
  schemaUpdateContact,
  validateBody,
} = require("./validation");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();

  return res.json({
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
    return res.status(404).json({
      status: "error",
      code: 404,
      message: `Contact with id:${contactId} not found`,
    });
  }

  return res.json({
    status: "success",
    code: 200,
    message: "success get by id request",
    data: { result: contact },
  });
});

router.post("/", validateBody(schemaCreateContact), async (req, res, next) => {
  console.log(req.body);
  const contact = await addContact(req.body);

  if (!req.body.name && !req.body.email && !req.body.phone) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "missing fields",
    });
  }

  return res.status(201).json({
    status: "success",
    code: 201,
    message: "success, contact added",
    data: { result: contact },
  });
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await removeContact(contactId);

  if (!contact) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: `Contact with id:${contactId} not found`,
    });
  }

  return res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: { result: contact },
  });
});

router.put(
  "/:contactId",
  validateBody(schemaUpdateContact),
  async (req, res, next) => {
    const { contactId } = req.params;

    if (!req.body.name && !req.body.email && !req.body.phone) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "missing fields",
      });
    }

    const contact = await updateContact(contactId, req.body);

    if (!contact) {
      return res.json({
        status: "success",
        code: 200,
        message: `Not found contact with id: ${contactId}`,
      });
    }

    return res.json({
      status: "success",
      code: 200,
      message: "success, contact update",
      data: { result: contact },
    });
  }
);

module.exports = router;
