
import MovieModel from "../model/movie.model";
import express, { Request ,Response} from "express";
import {UploadedFile} from "express-fileupload";



export const viewMovie = (req:Request,res:Response)=>{
    MovieModel.find()
    .then((movies) => res.json(movies))
    .catch((err: { message: any; }) => {
      res.status(500).send({ message: err.message });
    });
}

export const findId = (req:Request,res:Response)=>{
    const id = req.params.id;
  MovieModel.findById({ _id: id })
    .then((movies) => res.json(movies))
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}

export const getMovie = (req:Request,res:any)=>{
    const payload = req.body;
    const movie = new MovieModel(payload);
    console.log(payload);
    movie
      .save()
      .then(res.status(201).end())
      .catch((err: { message: any; }) => {
        res.status(500).send({ message: err.message });
  })
}

export const getPic =  (req: Request, res: any) => {
    const image = req?.files?.image as UploadedFile;

    const uploadPath = "./uploads/" + image.name;

    image.mv(uploadPath, (err: any) => {
        if (err)
            console.log(err);
    });
    const data = {
        ...req.body,
        price: req.body.price / 30,
        image: {
            url: `http://localhost:${process.env.port}/${image.name}`,
            size: image.size,
            name: image.name,
        },
    };
    const movie = MovieModel.create(data);
    movie
        .then(res.send(movie))
        .catch((err: { message: any; }) => {
            res.status(500).send({ message: err.message });
        });
};

export const updateMovie = (req:Request,res:Response)=>{
  const image = req?.files?.image as UploadedFile;
    const data = {
      ...req.body,
      price: req.body.price / 30,
      image: {
        url: `http://localhost:${process.env.port}/${image.name}`,
        size: image.size,
        name: image.name,}
    }
    const movie = MovieModel.findByIdAndUpdate(req.params.id,data)

    .then((data: any) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update movie`
        });
      } else {
        res.send({
          message: "Movie was update successfully!"
        });
      }
    })
    .catch((err: any) => {
      res.status(500).send({
        message: `Could not update movie with id=${req.params.id}`
      })
      });  
}

export const deleteMovie = (req:Request,res:Response)=>{
    const id =  req.params.id;
  MovieModel.findByIdAndRemove(id)
    .then((data: any) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      } else {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      }
    })
    .catch((err: any) => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
}

export default exports;