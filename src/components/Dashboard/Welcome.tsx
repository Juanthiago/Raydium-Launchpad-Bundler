import React from "react";

const Welcome = () => (
  <section className="flex flex-col items-center justify-center h-full text-center">
    <h1 className="text-3xl sm:text-4xl font-bold mb-4">
      Bem-vindo ao Zuppo seu chat digital!
    </h1>
    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl">
      Esta é sua área inicial. Use o menu lateral para navegar entre as
      funcionalidades da plataforma.
    </p>
  </section>
);

export default Welcome;
