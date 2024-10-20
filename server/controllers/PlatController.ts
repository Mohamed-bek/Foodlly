import { Request, Response } from "express";
import { FilterQuery } from "mongoose";
import Plat from "../models/Plate";
import { UploadedFile } from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";

export const AddPlat = async (req: Request, res: Response) => {
  try {
    const {
      name,
      subName,
      description,
      chef,
      price,
      type,
      isMain,
      isBestSelles,
    } = req.body;

    if (!req.file) {
      console.log("No file present");
      return res.status(400).json({ error: "No image file uploaded" });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "foodly",
        public_id: `plat_${Date.now()}`,
        overwrite: true,
        quality: "auto", // Automatically adjust quality
        fetch_format: "auto", // Automatically select format
      },
      async (error, result) => {
        if (error) {
          console.error("Error uploading to Cloudinary:", error);
          return res
            .status(500)
            .json({ error: "Error uploading image to Cloudinary" });
        }

        console.log("Cloudinary upload result: ", result);

        // Create the plate info object
        const plateInfo = {
          name,
          subName,
          image: {
            public_id: result?.public_id,
            url: result?.secure_url,
          },
          description,
          chef,
          price,
          type,
          isMain,
          isBestSelles,
        };

        // Save the plate to the database
        const plat = await Plat.create(plateInfo);
        console.log("Plate created: ", plat);

        res.status(200).json({ plat });
      }
    );

    // Start the upload stream with the file buffer
    uploadStream.end(req.file.buffer);
  } catch (error) {
    console.error("Error adding plate:", error);
    res.status(500).json({ error: error });
  }
};

export const BestSellesPlat = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const plat = await Plat.findById(id);
    if (!plat) {
      throw Error(`Could not create a Plat`);
    }
    plat.isBestSelles = true;
    await plat.save();
    res.status(200).json({ plat });
  } catch (error) {
    res.status(400).json({ err: error });
  }
};

export const DeletePlat = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const plat = await Plat.findById(id);
    if (!plat) {
      throw Error(`Could not create a Plat`);
    }
    await plat.deleteOne();
    await plat.save();
    res.status(200).json({ plat });
  } catch (error) {
    res.status(400).json({ err: error });
  }
};

export const UpdatePlat = async (req: Request, res: Response) => {
  try {
    const { ...updateData } = req.body;

    const plat = await Plat.findById(req.params.id);
    if (!plat) {
      throw Error(`Could not create a Plat`);
    }
    Object.assign(plat, updateData);
    await plat.save();
    res.status(200).json({ plat });
  } catch (error) {
    res.status(400).json({ err: error });
  }
};

export const GetPlat = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const plat = await Plat.findById(id);
    if (!plat) {
      throw Error(`Could not create a Plat`);
    }
    res.status(200).json({ plat });
  } catch (error) {
    res.status(400).json({ err: error });
  }
};

export const GetMainPlats = async (req: Request, res: Response) => {
  try {
    const mainPlats = await Plat.find({ isMain: true }).limit(4);
    if (!mainPlats) {
      throw Error(`Could not create a Plat`);
    }
    res.status(200).json({ mainPlats });
  } catch (error) {
    res.status(400).json({ err: error });
  }
};

export const GetBestSellesPlats = async (req: Request, res: Response) => {
  try {
    const bestSellesPlats = await Plat.find({ isBestSelles: true }).limit(10);
    if (!bestSellesPlats) {
      throw Error(`Could not create a Plat`);
    }
    res.status(200).json({ bestSellesPlats });
  } catch (error) {
    res.status(400).json({ err: error });
  }
};

export const GetFilterPlats = async (req: Request, res: Response) => {
  const { minPrice, maxPrice, sections, rating } = req.query;
  const filter: FilterQuery<typeof Plat> = {};
  if (minPrice) filter.price = { ...filter.price, $gte: Number(minPrice) };
  if (maxPrice) filter.price = { ...filter.price, $lte: Number(maxPrice) };
  if (rating) filter.rating = { $gte: Number(rating) };
  if (typeof sections === "string") {
    filter.type = { $in: sections.split(",") };
  } else if (Array.isArray(sections)) {
    filter.type = { $in: sections };
  }
  try {
    const plats = await Plat.find(filter);
    res.status(200).json({ plats });
  } catch (error) {
    res.status(500).json({ err: error });
  }
};

const getOldImagePublicId = async (platId: string): Promise<string | null> => {
  return "portfolio/old_image";
};

export const UploadImagePlat = async (req: Request, res: Response) => {
  try {
    const platId = req.body.platId;
    const file = req.files?.image as UploadedFile;

    if (!file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    // Step 1: Get the old image's public_id (if it exists)
    const oldImagePublicId = await getOldImagePublicId(platId);

    // Step 2: Delete the old image from Cloudinary if it exists
    if (oldImagePublicId) {
      await cloudinary.uploader.destroy(oldImagePublicId);
      console.log(`Deleted old image: ${oldImagePublicId}`);
    }

    // Step 3: Upload the new image to Cloudinary
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "portfolio", // Optional: Store images in a folder
      public_id: `plat_${platId}`, // Use a consistent public_id for replacement
      overwrite: true, // Ensure the new upload replaces any existing image
    });

    res.json({ url: result.secure_url, public_id: result.public_id });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Upload failed" });
  }
};
