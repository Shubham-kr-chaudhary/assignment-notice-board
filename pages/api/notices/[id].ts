import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (typeof id !== "string") {
    return res.status(400).json({
      error: "Invalid notice id",
    });
  }

  try {

    if (req.method === "GET") {
  const notice = await prisma.notice.findUnique({
    where: { id },
  });

  if (!notice) {
    return res.status(404).json({
      error: "Notice not found",
    });
  }

  return res.status(200).json(notice);
}

    if (req.method === "PUT") {
      const {
        title,
        body,
        category,
        priority,
        publishDate,
      } = req.body;

      if (
        !title ||
        !body ||
        !category ||
        !priority ||
        !publishDate
      ) {
        return res.status(400).json({
          error: "All fields are required",
        });
      }

      const updatedNotice =
        await prisma.notice.update({
          where: { id },
          data: {
            title,
            body,
            category,
            priority,
            publishDate: new Date(
              publishDate
            ),
          },
        });

      return res.status(200).json(
        updatedNotice
      );
    }

    if (req.method === "DELETE") {
      await prisma.notice.delete({
        where: { id },
      });

      return res.status(200).json({
        message:
          "Notice deleted successfully",
      });
    }

    return res.status(405).json({
      error: "Method not allowed",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}