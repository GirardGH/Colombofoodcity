import Navbar from "../components/Navbar/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center items-center mt-16 px-4 break-words text-center text-xs">
        <p className="font-semibold laptop:text-2xl text-xl">
          -10% sur votre première commande !
        </p>
        <p>
          Créez votre compte sur notre site internet et bénéficiez de 10% de
          réduction sur votre première
        </p>
        <p>
          commande, à valoir sur tout le site, hors Cave, cartes cadeaux &
          services
        </p>
      </div>
    </div>
  );
}
