import React from "react";
import CarouselFile from "./CarouselFile";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { handleDate } from "utils/DateFormat";
export type GridFileProps = {
  filesCarousel: Array<{
    id: number;
    filename: string;
    content: string;
    createdAt: string;
    isPublic: boolean;
  }>;
  title: string;
};

const GridFile = ({ title, filesCarousel }: GridFileProps) => {
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
      {filesCarousel.length > 4 ? (
        <div className="container-carousel">
          <Slider {...settings}>
            {filesCarousel.map((file) => (
              <CarouselFile
                key={file.id}
                filename={file.filename}
                content={file.content}
                createdAt={handleDate(file.createdAt)}
                isPublic={file.isPublic}
              />
            ))}
          </Slider>
        </div>
      ) : (
        <div className="container-carousel-no-slider">
          {filesCarousel.map((file) => (
            <CarouselFile
              key={file.id}
              filename={file.filename}
              content={file.content}
              createdAt={handleDate(file.createdAt)}
              isPublic={file.isPublic}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GridFile;
