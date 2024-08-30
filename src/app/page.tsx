import Image from "next/image";

const imageURl = [
  "https://utfs.io/f/ca691885-9636-40a2-a083-27fbd1764917-1v7wuv.png",
  "https://utfs.io/f/c215f3ac-afd2-4bd5-a220-ca90833048a5-d5hhcu.jpeg",
  "https://utfs.io/f/5f8c8b04-a99c-4679-9423-605c0e0e1c66-26273.jpeg",
  "https://utfs.io/f/c46fe6f9-c28a-4434-879f-d11ecb3c38e9-ob30i.png",
  "https://utfs.io/f/f064c159-001d-482d-ace5-be30f38ab0fc-d5hhcu.png",
  "https://utfs.io/f/ca691885-9636-40a2-a083-27fbd1764917-1v7wuv.png",
  "https://utfs.io/f/c215f3ac-afd2-4bd5-a220-ca90833048a5-d5hhcu.jpeg",
  "https://utfs.io/f/5f8c8b04-a99c-4679-9423-605c0e0e1c66-26273.jpeg",
  "https://utfs.io/f/c46fe6f9-c28a-4434-879f-d11ecb3c38e9-ob30i.png",
  "https://utfs.io/f/f064c159-001d-482d-ace5-be30f38ab0fc-d5hhcu.png",
  "https://utfs.io/f/ca691885-9636-40a2-a083-27fbd1764917-1v7wuv.png",
  "https://utfs.io/f/c215f3ac-afd2-4bd5-a220-ca90833048a5-d5hhcu.jpeg",
  "https://utfs.io/f/5f8c8b04-a99c-4679-9423-605c0e0e1c66-26273.jpeg",
  "https://utfs.io/f/c46fe6f9-c28a-4434-879f-d11ecb3c38e9-ob30i.png",
  "https://utfs.io/f/f064c159-001d-482d-ace5-be30f38ab0fc-d5hhcu.png",
];

const images = imageURl.map((url, index) => ({
  id: index + 1,
  url,
}));

export default function HomePage() {
  return (
    <main className="min-h-screen p-4">
      <div className="flex flex-wrap gap-4 p-4 py-1">
        {images.map((image) => (
          <div
            key={image.id}
            className="flex items-center justify-center gap-4 rounded-lg border border-[#ffd900d4] shadow-2xl"
          >
            <Image
              src={image.url}
              alt={`Image ${image.id}`}
              className="rounded-lg shadow-2xl"
              width={300}
              height={300}
              content="cover"
              priority={true}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
