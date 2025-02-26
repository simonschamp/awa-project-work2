import { Request, Response, Router } from "express";
import { compile } from "morgan";
import { Image, IImage } from "../models/Image";
import upload from "../middleware/multer-config";
import { validateToken } from "../middleware/validateToken";

const router: Router = Router();

interface IPoem {
  id: number;
  poem: string;
  vip: boolean;
}

router.patch("/api/images/:id", async (req: Request, res: Response) => {
  try {
    const image: IImage | null = await Image.findById(req.params.id);

    if (!image) {
      res.status(404).json({ message: "Image not found" });
    }

    if (image) {
      image.description = req.body.description;
      await image.save();

      res.status(200).json({ message: "Image updated" });
      console.log("Image updated");
    }
  } catch (error: any) {
    console.error(`Error while updating a file ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/api/images/:id", async (req: Request, res: Response) => {
  try {
    const image: IImage | null = await Image.findById(req.params.id);
    if (!image) {
      res.status(404).json({ message: "Image not found" });
    }
    res.status(200).json(image);
    console.log("Image fetched successfully from database");
  } catch (error: any) {
    console.error(`Error while fetching a file ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/api/images", async (req: Request, res: Response) => {
  try {
    const images: IImage[] | null = await Image.find();

    if (!images) {
      res.status(404).json({ message: "No images found" });
    }
    res.status(200).json(images);
    console.log("Images fetched successfully from database");
  } catch (error: any) {
    console.error(`Error while fetching a file: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post(
  "/api/upload",
  upload.single("image"),
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        res.status(400).json({ message: "No file uploaded" });
      }
      if (req.file) {
        const imgPath: string = req.file.path.replace("public", "");

        const image: IImage = new Image({
          filename: req.file.filename,
          description: req.body.description,
          path: imgPath,
        });
        await image.save();
        console.log("File uploaded and saved in the database");
        res
          .status(201)
          .json({ message: "File uploaded and saved in the database" });
      }
    } catch (error: any) {
      console.error(`Error while uploading file: ${error}`);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.get("/api/poems", validateToken, async (req: Request, res: Response) => {
  try {
    const poems: IPoem[] = [
      {
        id: 1,
        poem: "Nunc tempus eros id venenatis sagittis. Nam ac sagittis elit. Aenean ac eleifend metus, eget tincidunt odio.",
        vip: true,
      },
      {
        id: 2,
        poem: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce blandit libero sed mi euismod dapibus. Nullam eu molestie libero, eget interdum massa.",
        vip: false,
      },
      {
        id: 3,
        poem: "Suspendisse efficitur tellus id blandit vestibulum. Etiam condimentum dolor velit, in fermentum ligula ultricies et.",
        vip: false,
      },
    ];

    res.status(200).json(poems);
  } catch (error: any) {
    console.error(`Error during poem retrieval: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
