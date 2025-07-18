import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const LazyImage = ({ image, rootRef }: { image: string, rootRef: React.RefObject<HTMLDivElement | null> }) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    }, {
      root: rootRef.current,
      rootMargin: "100px",
      threshold: 0.1,
    });

    if (imageRef.current) {
      observer.current.observe(imageRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [image]);

  return (
    isVisible ? (
      <Image
        ref={imageRef}
        src={image}
        alt="Dog"
        width={500}
        height={500}
        className={styles.image}
      />
    ) : (
      <div
        ref={imageRef as React.RefObject<HTMLDivElement>}
        style={{ width: 500, height: 500, background: "#eee" }}
        className={styles.image}
      />
    )
  );
};

export default function Home() {
  const [dogImages, setDogImages] = useState<string[]>([]);
  const mainRef = useRef<HTMLDivElement>(null);
  const getDogImages = async () => {
    const res = await fetch("https://dog.ceo/api/breeds/image/random/12");
    const data = await res.json();
    setDogImages(data.message);
  };

  useEffect(() => {
    getDogImages();
  }, []);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page}>
        <main
          className={styles.main}
          ref={mainRef}
        >
          {dogImages.map((image, index) => (
            <LazyImage image={image} key={index} rootRef={mainRef} />
          ))}
        </main>
      </div>
    </>
  );
}
