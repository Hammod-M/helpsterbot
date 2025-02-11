export const LazyImage = ({ src, alt }: { src: string; alt: string }) => {
   const [isLoaded, setIsLoaded] = useState(false);

   return (
      <div className="image-container">
         {!isLoaded && <div className="image-skeleton" />}
         <img
            src={src}
            alt={alt}
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            style={{ opacity: isLoaded ? 1 : 0 }}
         />
      </div>
   );
};
