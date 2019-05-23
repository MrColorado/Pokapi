import {
  Entity,
  PrimaryColumn,
  OneToMany,
} from 'typeorm';
import { PokemonSpecies } from './PokemonSpecies';

@Entity()
export class Type {
  @PrimaryColumn()
  name: string;

  @OneToMany(type => PokemonSpecies, species => species.primaryType)
  primaryUsers: PokemonSpecies[];

  @OneToMany(type => PokemonSpecies, species => species.secondaryType)
  secondaryUsers: PokemonSpecies[];
}
