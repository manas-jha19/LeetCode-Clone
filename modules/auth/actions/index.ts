"use server";
import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export const onBoardUser = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      return { success: false, error: "No authenticate user" };
    }
    const { id, firstName, lastName, emailAddresses, imageUrl } = user;

    const username =
      user.username?.trim() ||
      `${firstName?.toLowerCase() ?? "user"}_${id.slice(-6)}`;
    const newUser = await prisma.user.upsert({
      where: { clerkId: id },
      update: {
        clerkId: id,
        firstName: firstName || null,
        lastName: lastName || null,
        imageUrl: imageUrl || null,
        email: emailAddresses[0].emailAddress || "",
      },
      create: {
        clerkId: id,
        firstName: firstName || null,
        lastName: lastName || null,
        imageUrl: imageUrl || null,
        email: emailAddresses[0].emailAddress || "",
        username,
      },
    });
    return {
      success: true,
      user: newUser,
    };
  } catch (error) {
    console.log(error);
  }
};

export const currentRole = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      return { success: false, error: "No authenticate user" };
    }
    const { id } = user;

    const userRole = await prisma.user.findUnique({
      where: { clerkId: id },
      select: {
        role: true,
      },
    });
    return userRole?.role;
  } catch (error) {
    console.log(error);
  }
};
