import React from "react";
import CarouselFile from "./CarouselFile";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export type GridFileProps = {
  files: Array<{
    id: number;
    filename: string;
    content: string;
    createdAt: string;
    image: string;
    isPublic: boolean;
  }>;
  title: string;
};

const GridFile = ({ title, files }: GridFileProps) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className="container-title-carousel">
      <div className="container-title">
        <h3>{title}</h3>
      </div>
      <div className="container-carousel">
        <Slider {...settings}>
          {files.map((file) => (
            <CarouselFile
              key={file.id}
              filename={file.filename}
              content={file.content}
              createdAt={file.createdAt}
              isPublic={file.isPublic}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default GridFile;
