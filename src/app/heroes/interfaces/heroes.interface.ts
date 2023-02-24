export interface Heroe {
  id?: string; // Indicamos manualmente que es opcional
  superhero: string;
  publisher: Publisher;
  alter_ego: string;
  first_appearance: string;
  characters: string;
  alt_img?: string; // atributo añadido manualmente, indicamos que es opcional
}

export enum Publisher {
  DCComics = 'DC Comics',
  MarvelComics = 'Marvel Comics',
}
