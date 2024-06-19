import Image from 'next/image';

const Home = () => {
  return (
    <main className="grid h-full grid-cols-[8fr_7fr] bg-zinc-900 p-10">
      <div className="flex h-full flex-col justify-center gap-8">
        <h1 className="text-7xl font-bold text-white">
          Simplify Your Financial Reporting
        </h1>
        <p className="text-4xl text-white">
          Create GDSC-formatted files and manage on financial reports for
          purchases and program mobilizations.
        </p>
      </div>
      <div className="flex items-center justify-center">
        <Image
          src="/home-hero-image.png"
          alt="hero image"
          objectFit="contain"
          width={600}
          height={450}
        />
      </div>
    </main>
  );
};

export default Home;
