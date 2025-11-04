const asyncHandler = require("express-async-handler");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//@desc Get all contacts
//@route GET /api/contacts
//@access private -> will make it private when we'll do authentication - done
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await prisma.contact.findMany({
    where: { userId: req.user.userId }
  });

  res.status(200).json(contacts);
});


// CREATE NEW CONTACT - POST /api/contacts
const createContact = asyncHandler(async (req, res) => {
  console.log("Request body:", req.body);
  console.log("User from token:", req.user);
  const { name, email, phone, location } = req.body;

  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  const newContact = await prisma.contact.create({
    data: {
      name,
      email,
      phone,
      location,
      userId: req.user.userId 
    },
  });

  res.status(201).json({
    success: true,
    message: "Contact created successfully",
    contact: newContact,
  });
});


//@desc Get contact
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch contact from DB using Prisma
    const contact = await prisma.contact.findUnique({
      where: { id: parseInt(id) }, // Prisma expects a number
    });

    // If no contact found
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }

    if (contact.userId !== req.user.userId) {
      res.status(403);
      throw new Error("Not authorized to access this contact");
    }

    // Return the found contact
    res.status(200).json({
      success: true,
      message: "Contact fetched successfully",
      contact,
    });
  } catch (error) {
    console.error("Error fetching contact:", error);
    res.status(500);
    throw new Error("Failed to fetch contact");
  }
});


//@desc Update new contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, location } = req.body;

  // Check if contact exists
  const contact = await prisma.contact.findUnique({
    where: { id: parseInt(id) },
  });

  if (!contact || contact.userId !== req.user.userId) {
    res.status(404);
    throw new Error("Contact not found");
  }

  // Update contact
  const updatedContact = await prisma.contact.update({
    where: { id: parseInt(id) },
    data: {
      name,
      email,
      phone,
      location,
    },
  });

  // Send updated contact in response
  res.status(200).json({
    success: true,
    message: "Contact updated successfully",
    contact: updatedContact,
  });
});


//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Check if the contact exists
  const contact = await prisma.contact.findUnique({
    where: { id: parseInt(id) },
  });

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
    // Check if logged-in user owns the contact
  if (contact.userId !== req.user.userId) {
    res.status(403);
    throw new Error("Not authorized to delete this contact");
  }
  // Delete the contact
  await prisma.contact.delete({
    where: { id: parseInt(id) },
  });

  // Send confirmation response
  res.status(200).json({
    success: true,
    message: "Contact deleted successfully",
  });
});


module.exports = {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact
};