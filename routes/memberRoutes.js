const express = require("express");
const {
  borrowBook,
  returnBook,
  addMember,
  getAllMember,
  getBorrowingDuration,
} = require("../controllers/memberController");
const router = express.Router();

/**
 * @swagger
 * /api/members:
 *   get:
 *     summary: Get all members
 *     description: Retrieve a list of all members.
 *     responses:
 *       200:
 *         description: List of all members
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   code:
 *                     type: string
 *                   name:
 *                     type: string
 *                   borrowedBooks:
 *                     type: array
 *                     items:
 *                       type: string
 *                   penaltyEndDate:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/members/borrow:
 *   post:
 *     summary: Borrow a book
 *     description: Allows a member to borrow a book.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberCode:
 *                 type: string
 *                 description: The code of the member borrowing the book.
 *               bookCode:
 *                 type: string
 *                 description: The code of the book being borrowed.
 *     responses:
 *       200:
 *         description: Book borrowed successfully
 *       400:
 *         description: Bad request (e.g., book already borrowed or member exceeds limit)
 *       404:
 *         description: Member or book not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/members/return:
 *   post:
 *     summary: Return a borrowed book
 *     description: Allows a member to return a borrowed book.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberCode:
 *                 type: string
 *                 description: The code of the member returning the book.
 *               bookCode:
 *                 type: string
 *                 description: The code of the book being returned.
 *     responses:
 *       200:
 *         description: Book returned successfully
 *       400:
 *         description: Bad request (e.g., book not borrowed by the member or penalties)
 *       404:
 *         description: Member or book not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/members:
 *   post:
 *     summary: Add a new member
 *     description: Adds a new member to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 description: The unique code for the new member.
 *               name:
 *                 type: string
 *                 description: The name of the new member.
 *     responses:
 *       201:
 *         description: Member added successfully
 *       400:
 *         description: Bad request (e.g., validation errors)
 *       500:
 *         description: Internal server error
 */

router.get("/", getAllMember);
router.post("/borrow", borrowBook);
router.post("/return", returnBook);
router.post("/", addMember);

module.exports = router;
