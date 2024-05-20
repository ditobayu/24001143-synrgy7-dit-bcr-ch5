import { Request, Response } from "express";
import { CarsModel } from "../model/car";

const getCars = async (req: Request, res: Response) => {
  try {
    const { category, search } = req.query;

    if (category) {
      let query = CarsModel.query().where("category", category as string);

      // Check if there's a search term
      if (search) {
        query = query.where("name", "like", `%${search}%`);
      }

      const cars = await query;
      res.json(cars);
    } else {
      let query = CarsModel.query();

      // Check if there's a search term
      if (search) {
        query = query.where("name", "like", `%${search}%`);
      }

      const cars = await query;
      res.json(cars);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCarById = async (req: Request, res: Response) => {
  try {
    const car = await CarsModel.query().findById(req.params.id);
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// filter by category (small, medium, large)
const getCarsByCategory = async (req: Request, res: Response) => {
  console.log("req.params.category");
  console.log(req.params.category);
  try {
    const cars = await CarsModel.query().where("category", req.params.category);
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const createCar = async (req: Request, res: Response) => {
  try {
    const { body, file } = req;

    if (!file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${
      file.filename
    }`;
    const carData = {
      ...body,
      image: fileUrl, // Simpan path gambar
    };

    const car = await CarsModel.query().insert(carData);
    res.json(car);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// const updateCar = async (req: Request, res: Response) => {
//   try {
//     const { body, file } = req;

//     if (!file) {
//       return res.status(400).json({ message: "Image is required" });
//     }

//     const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${
//       file.filename
//     }`;
//     const carData = {
//       ...body,
//       image: fileUrl, // Simpan path gambar
//     };
//     const car = await CarsModel.query().findById(req.params.id);
//     if (car) {
//       await CarsModel.query().findById(req.params.id).patch(carData);
//       res.json({ message: "Car updated" });
//     } else {
//       res.status(404).json({ message: "Car not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

const updateCar = async (req: Request, res: Response) => {
  try {
    const { body, file } = req;

    // Mengecek apakah mobil ditemukan berdasarkan ID
    const car = await CarsModel.query().findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    // Menggabungkan data mobil yang ada dengan data baru dari request
    const updatedCarData = {
      ...car,
      ...body,
    };

    // Jika ada file gambar yang diunggah, tambahkan URL gambar baru ke data mobil yang diperbarui
    if (file) {
      const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${
        file.filename
      }`;
      updatedCarData.image = fileUrl;
    }

    // Melakukan update hanya untuk bidang-bidang yang diperbarui
    await CarsModel.query().findById(req.params.id).patch(updatedCarData);

    res.json({ message: "Car updated" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteCar = async (req: Request, res: Response) => {
  try {
    const car = await CarsModel.query().findById(req.params.id);
    console.log(req.params.id);
    if (car) {
      await CarsModel.query().deleteById(req.params.id);
      res.json({ message: "Car deleted" });
    } else {
      res.status(404).json({ message: "Car not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCarOrders = async (req: Request, res: Response) => {
  try {
    const car = await CarsModel.query()
      .findById(req.params.id)
      .withGraphFetched("orders");
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCarOrderById = async (req: Request, res: Response) => {
  try {
    const car = await CarsModel.query()
      .findById(req.params.id)
      .withGraphFetched("orders")
      .modifyGraph("orders", (builder) => {
        builder.findById(req.params.orderId);
      });
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  getCars,
  getCarById,
  getCarsByCategory,
  createCar,
  updateCar,
  deleteCar,
  getCarOrders,
  getCarOrderById,
};
